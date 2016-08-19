var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('styles', function () {
    gulp.src('app/Resources/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/css'));
});

gulp.task('scripts', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        'app/Resources/assets/js/**/*.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('default', ['styles', 'scripts']);
