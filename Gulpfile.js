var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babel = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('styles', function () {
    gulp.src('app/Resources/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/css'));
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
        .pipe(gulp.dest('web/js'));
});

gulp.task('default', ['styles', 'scripts']);
