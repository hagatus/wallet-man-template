const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const mustache = require("gulp-mustache");
/**
 * Mustache
 */
gulp.task('compile:mustache', function () {
    return gulp.src(["src/**/*.mustache", '!src/partials/*.mustache'])
            .pipe(mustache('src/dataView.json', {}, {}))
            .pipe(rename({extname: '.html'}))
            .pipe(gulp.dest("./build"));
});

/**
 * Sass
 */
gulp.task('compile:sass', function () {
    return gulp.src('assets/layout/layout.scss')
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(rename({suffix: '.' + require('./package.json').version}))
            .pipe(gulp.dest('./build/css'))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./build/css'));
});

/**
 * JS
 */
gulp.task('compile:js', function () {
    return gulp.src('assets/js/*.js')
            .pipe(rename({suffix: '.' + require('./package.json').version}))
            .pipe(gulp.dest('./build/js'));
    // .pipe(cleanJS())
    // .pipe(rename({suffix: '.min'}))
    // .pipe(gulp.dest('./build/css'));
});


gulp.task('compile', gulp.series('compile:sass', 'compile:js','compile:mustache'));
/**
 * Bootstrap
 */
gulp.task('bootstrap:css', function () {
    return gulp.src('node_modules/bootstrap/dist/css/**').pipe(gulp.dest('build/css/bootstrap'));
})
gulp.task('bootstrap:js', function () {
    return gulp.src('node_modules/bootstrap/dist/js/**').pipe(gulp.dest('build/js/bootstrap'));
})

gulp.task('bootstrap', gulp.series('bootstrap:css', 'bootstrap:js'));

/**
 * Fontawesome
 */
gulp.task('fontawesome:css', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/css/**').pipe(gulp.dest('build/css/fontawesome'));
});
gulp.task('fontawesome:js', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/js/**').pipe(gulp.dest('build/js/fontawesome'));
});
gulp.task('fontawesome:webfonts', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**').pipe(gulp.dest('build/css/webfonts'));
});

gulp.task('fontawesome', gulp.series('fontawesome:css', 'fontawesome:js', 'fontawesome:webfonts'))

/**
 * Chart.js
 */
gulp.task('chart.js', function () {
    return gulp.src('node_modules/chart.js/dist/**').pipe(gulp.dest('build/js/chart.js'));
})

/**
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch('assets/js/**/*.js', gulp.series('compile:js'));
    gulp.watch('assets/layout/**/*.scss', gulp.series('compile:sass'));
    gulp.watch('src/**/*.mustache', gulp.series('compile:mustache'));
});

/**
 * Server
 */
gulp.task('server', gulp.series('watch'), function () {
    return browserSync.init({server: '.'});
});

/**
 * Dist
 * TODO incluir minificação
 */
gulp.task('dist:css', function () {
    return gulp.src("build/css/**").pipe(gulp.dest("./dist/css"));
});
gulp.task('dist:js', function () {
    return gulp.src("build/js/**").pipe(gulp.dest("./dist/js"));
});
gulp.task('dist:html', function () {
    return gulp.src("build/**.html").pipe(gulp.dest("./dist"));
});
gulp.task('dist:images', function () {
    return gulp.src("build/images/**").pipe(gulp.dest("./dist/images"));
});
gulp.task('dist', gulp.series('dist:css', 'dist:js', 'dist:html', 'dist:images'));

/**
 * Build
 */
gulp.task('build:images', function () {
    return gulp.src("assets/images/**").pipe(gulp.dest("./build/images")) &&
    gulp.src("assets/*.ico").pipe(gulp.dest("./build"));
});

gulp.task('build', gulp.series('bootstrap', 'fontawesome', 'chart.js', 'build:images'));

/**
 * Initialize Project
 */
gulp.task('init', gulp.series('compile', 'build'))

/**
 * Default
 */
gulp.task('default', gulp.series('server'));

