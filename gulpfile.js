var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var stylus = require("gulp-stylus");
var jade = require("gulp-jade");

var paths = {
    js: {
        all: ["./src/**/*.js"],
        outputs: ["./src/app.js"]
    },
    styles: {
        all: ["./styles/**/*.styl"],
        outputs: ["./styles/main.styl"]
    },
    templates: {
        all: ["./src/templates/**/*.jade"],
        outputs: ["./src/templates/index.jade"]
    },
    release: {
        styles: "./release/css",
        js: "./release/js",
        html: "./release"
    }
};


gulp.task("styles", function () {
    gulp.src(paths.styles.outputs)
        .pipe(stylus({ compress: true }))
        .pipe(gulp.dest(paths.release.styles));
});


gulp.task("templates", function () {
    gulp.src(paths.templates.outputs)
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest(paths.release.html));
});


gulp.task("js", function () {
    browserify({ entries: paths.js.outputs })
    .transform(babelify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest(paths.release.js));
});


gulp.task("watch", function () {
    gulp.watch(paths.styles.all, ["styles"]);
    gulp.watch(paths.js.all, ["js"]);
    gulp.watch(paths.templates.all, ["templates"])
});


gulp.task("release", ["styles", "js", "templates"]);


gulp.task("default", ["release"]);
