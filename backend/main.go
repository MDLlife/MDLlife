package main

import (
	"time"

	"github.com/kataras/iris"

	"github.com/go-xorm/xorm"
	_ "github.com/mattn/go-sqlite3"
)

/*
	go get -u github.com/mattn/go-sqlite3
	go get -u github.com/go-xorm/xorm

	If you're on win64 and you can't install go-sqlite3:
		1. Download: https://sourceforge.net/projects/mingw-w64/files/latest/download
		2. Select "x86_x64" and "posix"
		3. Add C:\Program Files\mingw-w64\x86_64-7.1.0-posix-seh-rt_v5-rev1\mingw64\bin
		to your PATH env variable.

	Docs: http://xorm.io/docs/
*/

// User is our user table structure.
type User struct {
	ID        int64 // auto-increment by-default by xorm
	Name      string    `json:"name"`
	Email     string    `xorm:"unique" json:"email"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	Birthday  string    `json:"birthday"`
	Country   string    `json:"country"`
	CreatedAt time.Time `xorm:"created"`
}

func main() {
	app := iris.New()

	orm, err := xorm.NewEngine("sqlite3", "./database.db")
	if err != nil {
		app.Logger().Fatalf("orm failed to initialized: %v", err)
	}

	iris.RegisterOnInterrupt(func() {
		orm.Close()
	})

	err = orm.Sync2(new(User))

	if err != nil {
		app.Logger().Fatalf("orm failed to initialized User table: %v", err)
	}

	app.Post("/whitelist/request", func(ctx iris.Context) {
		user := &User{}

		err := ctx.ReadJSON(user)
		if err != nil {
			ctx.StatusCode(iris.StatusBadRequest)
			return
		}

		_, err = orm.Insert(user)
		if err != nil {
			ctx.StatusCode(iris.StatusCreated)
			return
		}


		ctx.JSON(map[string]bool {"status": true})
	})

	app.Run(iris.Addr(":8321"), iris.WithoutServerError(iris.ErrServerClosed))
}
