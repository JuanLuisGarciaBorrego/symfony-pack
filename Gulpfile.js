var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglifyjs');
var gutil = require('gulp-util');

var global = {
    assetsDirectory: 'app/Resources/public',
    sassFiles: 'sass/**/*.scss',
    jsFiles: 'js/**/*.js',
    imgFiles: 'img/**/*.*',
    prod: gutil.env.prod,
    statusMessage: gutil.env.prod ? ' producción' : ' desarrollo'
};

gulp.task('status', function () {
    gutil.log(gutil.colors.blue('Gulp en modo: '));
    gutil.log(gutil.colors.yellow(gutil.env.prod ? 'Producción' : 'Desarrollo'));
    gutil.log(gutil.colors.blue('Para activar Gulp en producción: gulp --prod'));
});

gulp.task('styles', function () {
    gutil.log(gutil.colors.red('Procesando y minificando archivos sass.'));
    !global.prod ? gutil.log(gutil.colors.blue('Source maps activado')) : gutil.noop();

    gulp.src(global.assetsDirectory + '/' + global.sassFiles)
        .pipe(!global.prod ? sourcemaps.init() : gutil.noop())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(!global.prod ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest('web/css'));
});

gulp.task('images', function () {
    gutil.log(gutil.colors.red('Copiado de imágenes web/img aplicando una reducción de peso'));

    return gulp.src(global.assetsDirectory + '/' + global.imgFiles)
        .pipe(imagemin())
        .pipe(gulp.dest('web/img'));
});

gulp.task('fonts', function () {
    gutil.log(gutil.colors.red('Copiando fonts de materialize-css a web/fonts'));

    return gulp.src('node_modules/materialize-css/dist/fonts/**/*.*')
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('scripts', function () {
    gutil.log(gutil.colors.red('Uniendo y minificando todos los archivos JavaScripts'));

    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        global.assetsDirectory + '/' + global.jsFiles
    ])
        .pipe(uglify('all.js'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('watch', function () {
    gutil.log(gutil.colors.cyan('Uniendo y minificando todos los archivos JavaScripts'));

    return gulp.watch(global.assetsDirectory + '/**/*.*', ['styles', 'images', 'scripts']);
});

gulp.task('default', ['status', 'styles', 'fonts', 'images', 'scripts']);
