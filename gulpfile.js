const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const mustache = require("gulp-mustache");
/**
 * TODO fazer todos os comandos enviarem os arquivos para a pasta build
 */
/**
 * Mustache
 */
gulp.task('mustache', function () {
    return gulp.src("src/*.mustache")
            .pipe(mustache('src/dataView.json', {}, {}))
            .pipe(rename({extname: '.html'}))
            .pipe(gulp.dest("./build"));
});
/**
 * Build
 */
gulp.task('build:css', function () {
    return gulp.src("css/**").pipe(gulp.dest("./build/css"));
});
gulp.task('build:js', function () {
    return gulp.src("js/**").pipe(gulp.dest("./build/js"));
});
gulp.task('build:images', function () {
    return gulp.src("images/**").pipe(gulp.dest("./build/images"));
});

gulp.task('build', gulp.series('build:css', 'build:js', 'build:images', 'mustache'));
/**
 * Sass
 */
gulp.task('compile:sass', function () {
    return gulp.src('assets/layout/layout.scss')
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(rename({suffix: '.' + require('./package.json').version}))
            .pipe(gulp.dest('./css'))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./css'));
});


gulp.task('compile', gulp.series('compile:sass'));
/**
 * Bootstrap
 */
gulp.task('bootstrap:css', function () {
    return gulp.src('node_modules/bootstrap/dist/css/**').pipe(gulp.dest('css/bootstrap'));
})
gulp.task('bootstrap:js', function () {
    return gulp.src('node_modules/bootstrap/dist/js/**').pipe(gulp.dest('js/bootstrap'));
})

gulp.task('bootstrap', gulp.series('bootstrap:css', 'bootstrap:js'))

/**
 * Fontawesome
 */
gulp.task('fontawesome:css', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/css/**').pipe(gulp.dest('css/fontawesome'));
})
gulp.task('fontawesome:js', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/js/**').pipe(gulp.dest('js/fontawesome'));
})

gulp.task('fontawesome', gulp.series('fontawesome:css', 'fontawesome:js'))

/**
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch('assets/layout/**/*.scss', gulp.series('compile:sass', 'mustache'));
    gulp.watch('src/**/*.mustache', gulp.series('mustache'));
});

/**
 * Server
 */
gulp.task('server', gulp.series('watch'), function () {
    return browserSync.init({server: '.'});
});

/**
 * Dist
 */

/**
 * Initialize Project
 */
gulp.task('init', gulp.series('bootstrap', 'fontawesome', 'compile', 'mustache', 'build'))

gulp.task('default', gulp.series('server'));

