var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	rev          = require('gulp-rev-append');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/assets/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/assets/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: './' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('rev', function() {
	gulp.src('app/index.html')
	.pipe(rev())
	.pipe(gulp.dest('.'));

	gulp.src('app/**/*.html')
	.pipe(rev())
	.pipe(gulp.dest('.'));
});

gulp.task('libs-scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/assets/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/assets/libs/bootstrap/dist/js/bootstrap.bundle.js',
		'app/assets/libs/bootstrap/dist/js/bootstrap.min.js',
		'app/assets/libs/swipeshadow/dist/aos.js',
		'app/assets/libs/slick/slick/slick.min.js',
		'app/assets/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
		'app/assets/libs/tel-input/build/js/intlTelInput.min.js'
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/assets/js')); // Выгружаем в папку app/js
});

gulp.task('css-custom', ['sass'], function() {
	return gulp.src('app/assets/css/main.css') // Выбираем файл для минификации
		.pipe(cssnano({ zindex: false })) // Сжимаем
		.pipe(gulp.dest('app/assets/css')); // Выгружаем в папку app/css
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/assets/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/assets/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'css-custom', 'libs-scripts'], function() {
	gulp.watch('app/assets/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/assets/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('img', function() {
	return gulp.src('app/assets/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('app/assets/img')); // Выгружаем на продакшен
});

gulp.task('custom-scripts', function(){
	return gulp.src('app/assets/js/common.js')
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'));
});

gulp.task('build', ['img', 'sass', 'libs-scripts', 'custom-scripts', 'css-custom', 'css-libs', 'rev'], function() {
	gulp.src([
		'app/assets/css/main.css',
		'app/assets/css/libs.min.css'
		])
	.pipe(gulp.dest('assets/css'));

	gulp.src([
		'app/assets/js/libs.min.js',
		'app/assets/js/utils.js'
		])
	.pipe(gulp.dest('assets/js'))
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
