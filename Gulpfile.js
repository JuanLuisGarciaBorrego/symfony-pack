var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babel = require('babelify');
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

    browserify('app/Resources/assets/js/app.js')
        .transform(babel)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('web/js'));

    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        'app/Resources/assets/js/init-template.js'
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'));
});

gulp.task('default', ['styles', 'fonts', 'images', 'scripts']);
