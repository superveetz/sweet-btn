var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('compile', function () {
    return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init()) // this means src maps will be generated
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js',
        module: 'system'
    }))
    .pipe(concat('lib/js-library.js')) // can use other plugins
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('release/'));
});