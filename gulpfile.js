const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

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

gulp.task('bootstrap:css', function() {
    return gulp.src('node_modules/bootstrap/dist/css/**').pipe(gulp.dest('css'));
})
gulp.task('bootstrap:js', function() {
    return gulp.src('node_modules/bootstrap/dist/js/**').pipe(gulp.dest('js'));
})

gulp.task('bootstrap', gulp.series('bootstrap:css', 'bootstrap:js'))

gulp.task('default', gulp.series('bootstrap', 'compile'));

