var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var gutil = require('gulp-util');

var global = {
    assetsDirectory: 'app/Resources/public',
    sassFiles: 'sass/**/*.scss',
    jsFiles: 'js/**/*.js',
    imgFiles: 'img/**/*.*',
    prod: gutil.env.prod
};

gulp.task('styles', function () {
    gulp.src(global.assetsDirectory + '/' + global.sassFiles)
        .pipe(!global.prod ? sourcemaps.init() : gutil.noop())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(!global.prod ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest('web/css'));
});

gulp.task('images', function () {
    gulp.src(global.assetsDirectory + '/' + global.imgFiles)
        .pipe(imagemin())
        .pipe(gulp.dest('web/img'));
});

gulp.task('fonts', function () {
    gulp.src('node_modules/materialize-css/dist/fonts/**/*.*')
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('scripts', function () {

    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        global.assetsDirectory + '/' + global.jsFiles
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('watch', function () {
    gulp.watch(global.assetsDirectory + '/**/*.*', ['styles', 'images', 'scripts']);
});

gulp.task('default', ['styles', 'fonts', 'images', 'scripts']);
