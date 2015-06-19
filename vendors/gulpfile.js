var gulp = require("gulp");
var connect = require("gulp-connect");

var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var directorySync = require("gulp-directory-sync");
var iife = require("gulp-iife");
var minifyCss = require("gulp-minify-css");
var ngAnnotate = require("gulp-ng-annotate");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

// Файлы для обработки
var files = {
    images: "/**/*",
    scripts: "/**/*.js",
    styles: "/main.css",
    templates: "/**/*.html"
};

// Папки исходников
var sources = {
    images: "../sources/images",
    scripts: "../sources/scripts",
    styles: "../sources/styles",
    templates: "../sources/templates"
};

// Папки назначения
var www = {
    application: "../www/application",
    images: "../www/images",
    fonts: "../www/fonts",
    libraries: "../www/libraries",
    templates: "../www/templates"
};

// Vendors
var vendors = {
    scripts: [
        "../vendors/bower_components/angular/angular.js",
        "../vendors/bower_components/angular-animate/angular-animate.js",
        "../vendors/bower_components/angular-resource/angular-resource.js",
        "../vendors/bower_components/angular-route/angular-route.js",
        "../vendors/bower_components/angular-touch/angular-touch.js",
        "../vendors/bower_components/jquery/dist/jquery.js",
        "../vendors/bower_components/bootstrap/dist/js/bootstrap.js"
    ],
    styles: [
        "../vendors/bower_components/bootstrap/dist/css/bootstrap.css",
        "../vendors/bower_components/bootstrap/dist/css/bootstrap-theme.css"
    ],
    fonts: [
        "../vendors/bower_components/bootstrap/dist/fonts/**"
    ]
};

// Сервер и отслеживание изменений
gulp.task("default", ["library", "image", "script", "style", "template"], function () {
    connect.server({
        root: "../www",
        port: 3333,
        host: "127.0.0.1",
        fallback: "../www/index.html",
        livereload: true
    });

    gulp.watch(sources.images + files.images, ["image"]);
    gulp.watch(sources.scripts + files.scripts, ["script"]);
    gulp.watch(sources.styles + files.styles, ["style"]);
    gulp.watch(sources.templates + files.templates, ["template"]);
});

// Картинки
gulp.task("image", function () {
    gulp.src(sources.images + files.images) // исходники
        .pipe(gulp.dest(www.images)) // сохранение
        .pipe(connect.reload()) // обновление
        .pipe(directorySync(sources.images, www.images)); // синхронизация
});

// Библиотеки
gulp.task("library", function () {
    gulp.src(vendors.scripts) // исходники
        .pipe(sourcemaps.init()) // инициализация карт
        .pipe(concat("lib.min.js")) // конкатенация
        .pipe(uglify()) // минификация
        .pipe(sourcemaps.write()) // запись карт
        .pipe(gulp.dest(www.libraries)); // сохранение

    gulp.src(vendors.styles)
        .pipe(concat("lib.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(www.libraries));

    gulp.src(vendors.fonts)
        .pipe(gulp.dest(www.fonts));
});

// Скрипты
gulp.task("script", function () {
    gulp.src(sources.scripts + files.scripts) // исходники
        .pipe(sourcemaps.init()) // инициализация карт
        .pipe(iife({
            useStrict: true,
            prependSemicolon: false
        }))
        .pipe(concat("app.min.js")) // конкатенация
        .pipe(ngAnnotate()) // аннотации
        .pipe(uglify()) // минификация
        .pipe(sourcemaps.write()) // запись карт
        .pipe(gulp.dest(www.application)) // сохранение
        .pipe(connect.reload()); // обновление
});

// Стили
gulp.task("style", function () {
    gulp.src(sources.styles + files.styles) // исходники
        .pipe(concat("app.min.css")) // конкатенация
        .pipe(autoprefixer()) // префиксы для браузеров
        .pipe(minifyCss()) // минификация
        .pipe(gulp.dest(www.application)) // сохранение
        .pipe(connect.reload()); // обновление
});

// Шаблоны
gulp.task("template", function () {
    gulp.src(sources.templates + files.templates) // исходники
        .pipe(gulp.dest(www.templates)) // сохранение
        .pipe(connect.reload()) // обновление
        .pipe(directorySync(sources.templates, www.templates)); // синхронизация
});