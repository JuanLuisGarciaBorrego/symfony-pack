var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');

gulp.task('styles', function () {
    gulp.src('app/Resources/assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/css'));
});

gulp.task('watch', function () {
    gulp.watch('app/Resources/assets/sass/**/*.scss', ['styles']);
    gulp.watch('app/Resources/assets/js/**/*.js', ['scripts']);
});

gulp.task('images', function () {
    gulp.src('app/Resources/assets/img/**/*.*')
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
        'app/Resources/assets/js/**/*.js'
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('default', ['styles', 'fonts', 'images', 'scripts']);
