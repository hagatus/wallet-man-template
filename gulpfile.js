const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');

/**
 * Sass
 */
gulp.task('compile:sass', function () {
    return gulp.src('assets/layout/layout.scss')
            .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(rename({ suffix: '.' + require('./package.json').version}))
            .pipe(gulp.dest('./css'))
            .pipe(cleanCSS())
            .pipe(rename({ suffix: '.min'}))
            .pipe(gulp.dest('./css'));
});


gulp.task('compile', gulp.series('compile:sass'));
/**
 * Bootstrap
 */
gulp.task('bootstrap:css', function() {
    return gulp.src('node_modules/bootstrap/dist/css/**').pipe(gulp.dest('css/bootstrap'));
})
gulp.task('bootstrap:js', function() {
    return gulp.src('node_modules/bootstrap/dist/js/**').pipe(gulp.dest('js/bootstrap'));
})

gulp.task('bootstrap', gulp.series('bootstrap:css', 'bootstrap:js'))

/**
 * Fontawesome
 */
gulp.task('fontawesome:css', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/css/**').pipe(gulp.dest('css/fontawesome'));
})
gulp.task('fontawesome:js', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/js/**').pipe(gulp.dest('js/fontawesome'));
})

gulp.task('fontawesome', gulp.series('fontawesome:css', 'fontawesome:js'))

/**
 * Watch
 */
gulp.task('watch', function () {
    return gulp.watch('assets/layout/**/*.scss', gulp.series('compile:sass'));
});

/**
 * Server
 */
gulp.task('server', gulp.series('watch'), function () {
    return browserSync.init({ server: '.' });
});

/**
 * Initialize Project
 */
gulp.task('init', gulp.series('bootstrap', 'fontawesome', 'compile'))

gulp.task('default', gulp.series('server'));

