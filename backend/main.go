package main

import (
	"os"
	"io"
	"io/ioutil"
	"time"
	"regexp"
	"math/rand"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v2"

	"github.com/kataras/iris"

	"github.com/srajelli/ses-go"

	"github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"

	"github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

/*
	go get ./...

	go get -u github.com/mattn/go-sqlite3
	go get -u github.com/go-xorm/xorm
	go install github.com/mattn/go-sqlite3

	Gcc is required for go-light3
	If you're on win64 and you can't install go-sqlite3:
		1. Download: https://sourceforge.net/projects/mingw-w64/files/latest/download
		2. Select "x86_x64" and "posix"
		3. Add C:\Program Files\mingw-w64\x86_64-7.1.0-posix-seh-rt_v5-rev1\mingw64\bin
		to your PATH env variable.

	Docs: http://xorm.io/docs/
*/

// Whitelist is whitelist table structure.
type Whitelist struct {
	Id int64 `gorm:"primary_key"`
	Photo     Photo
	PhotoId   int64     `gorm:"not null;unique"`
	Name      string
	Email     string    `gorm:"not null;unique"`
	Birthday  string    `json:"birthday"`
	Country   string    `json:"country"`
	CreatedAt time.Time `xorm:"created"`
}

// Photo is photo table structure.
type Photo struct {
	ID        int64 // auto-increment by-default by xorm
	Path      string    `xorm:"not null unique"`
	Extension string    `xorm:"varchar(5) not null"`
	CreatedAt time.Time `xorm:"created"`
}

// Config file structure
type Config struct {
	AwsKey    string `yaml:"AwsKey"`
	AwsSecret string `yaml:"AwsSecret"`
	AwsRegion string `yaml:"AwsRegion"`

	NoReplyEmail string `yaml:"NoReplyEmail"`
	ReplyEmail   string `yaml:"ReplyEmail"`

	DatabaseDriver string `yaml:"DatabaseDriver"`
	DatabaseDSN    string `yaml:"DatabaseDSN"`

	MaxFileUploadSizeMb int64 `yaml:"MaxFileUploadSizeMb"`

	Port string `yaml:"Port"`
}

var (
	config = &Config{}

	nameValidatorRegex = regexp.MustCompile("(?:(\\pL|[-])+((?:\\s)+)?)")
	// YYYY-MM-DD // YYYY >= 1000 matches correct dates in months
	dateValidatorRegex = regexp.MustCompile("^(?:[1-9]\\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\\d|2[0-9])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31))$")
)

func init() {
	loadConfig()

	// Amazon SES setup
	ses.SetConfiguration(config.AwsKey, config.AwsSecret, config.AwsRegion)
}

func main() {
	app := iris.New()

	db, err := gorm.Open(config.DatabaseDriver, config.DatabaseDSN)
	if err != nil {
		app.Logger().Fatalf("db failed to initialized: %v", err)
	}

	iris.RegisterOnInterrupt(func() {
		db.Close()
	})

	db.AutoMigrate(&Whitelist{}, &Photo{})

	routes(app, db)

	app.Run(iris.Addr(config.Port),
		iris.WithoutServerError(iris.ErrServerClosed),
		iris.WithPostMaxMemory(config.MaxFileUploadSizeMb<<20))
}

func routes(app *iris.Application, db *gorm.DB) {

	app.Post("/whitelist/request", func(ctx iris.Context) {
		whitelist := &Whitelist{
			Name:     ctx.FormValue("name"),
			Email:    ctx.FormValue("email"),
			Country:  ctx.FormValue("country"),
			Birthday: combineDatetime(ctx.FormValue("year"), ctx.FormValue("month"), ctx.FormValue("day")),
		}

		if err := whitelist.Validate(); err != nil {
			ctx.StatusCode(iris.StatusUnprocessableEntity)
			ctx.JSON(map[string]interface{}{"errors": err})
			return
		}

		if !db.Where("email = ?", whitelist.Email).First(&Whitelist{}).RecordNotFound() {
			ctx.StatusCode(iris.StatusUnprocessableEntity)
			ctx.JSON(map[string]interface{}{"errors": map[string]string{"email": "This email already registered."}})
			return
		}

		// Get the file from the request.
		file, info, err := ctx.FormFile("passport")

		if err != nil {
			ctx.StatusCode(iris.StatusUnprocessableEntity)
			ctx.JSON(map[string]interface{}{"errors": map[string]string{"passport": "Add image of your passport"}})
			return
		}

		defer file.Close()
		ext := filepath.Ext(info.Filename)
		ext = strings.ToLower(ext[1:]) // remove dot and cast to lower case
		var (
			filename string
			imgPath  string
		)

		// generate a new name if file exists
		for {
			filename = RandString(48)
			imgPath = filename[0:3] + "/" + filename[3:6]

			// create path / bug with 0644
			if err = os.MkdirAll("./uploads/"+imgPath, 0744); err != nil {
				ctx.StatusCode(iris.StatusInternalServerError)
				println("Can't create passport path: " + err.Error())
				return
			}

			if _, err := os.Stat("./uploads/" + imgPath + "/" + filename + "." + ext); os.IsNotExist(err) {
				break
			}
		}

		// Create a file
		out, err := os.OpenFile("./uploads/"+imgPath+"/"+filename+"."+ext,
			os.O_WRONLY|os.O_CREATE, 0744)

		if err != nil {
			ctx.StatusCode(iris.StatusInternalServerError)
			println("Can't save passport img: " + err.Error())
			return
		}
		defer out.Close()

		io.Copy(out, file)

		photo := &Photo{
			Path:      imgPath + "/" + filename + "." + ext,
			Extension: ext,
		}

		db.NewRecord(photo)
		if err := db.Create(photo).Error; err != nil {
			ctx.StatusCode(iris.StatusInternalServerError)
			println("Can't insert photo " + err.Error())
			return
		}

		whitelist.PhotoId = photo.ID

		db.NewRecord(whitelist)
		if err := db.Create(whitelist).Error; err != nil {
			ctx.StatusCode(iris.StatusInternalServerError)
			println("Can't insert whitelist " + err.Error())
			return
		}

		sendEmail(whitelist.Email)

		ctx.JSON(map[string]bool{"success": true})
	})
}

func sendEmail(to string) {
	emailData := ses.Email{
		To:      to,
		From:    config.NoReplyEmail,
		Text:    "Your whitelist submission is well received.\n\nFor inquiries and support please contact support@mdl.life",
		Subject: "MDL Talent Hub: Whitelist application received",
		ReplyTo: config.ReplyEmail,
	}

	println(ses.SendEmail(emailData))
}

func combineDatetime(y string, m string, d string) string {
	str := y + "-"

	if len(m) == 1 {
		str += "0"
	}

	str += m + "-"

	if len(d) == 1 {
		str += "0"
	}

	str += d

	return str
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

var src = rand.NewSource(time.Now().UnixNano())

func RandString(n int) string { // speed 303 ns/op
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}

func loadConfig() {
	// which will try to find the 'filename' from current working dir too.
	yamlAbsPath, err := filepath.Abs("config.yml")
	if err != nil {
		println("Can't find example.config.yml " + err.Error())
	}

	// read the raw contents of the file
	data, err := ioutil.ReadFile(yamlAbsPath)
	if err != nil {
		println("Can't read example.config.yml " + err.Error())
	}

	err = yaml.Unmarshal(data, &config)
	if err != nil {
		panic(err)
	}
}

func (w Whitelist) Validate() error {
	return validation.ValidateStruct(&w,
		validation.Field(&w.Name, validation.Required, validation.Match(nameValidatorRegex)),
		validation.Field(&w.Email, validation.Required, is.Email),
		validation.Field(&w.Birthday, validation.Required, validation.Match(dateValidatorRegex)),
		validation.Field(&w.Country, validation.Required, validation.Match(nameValidatorRegex)),
	)
}
