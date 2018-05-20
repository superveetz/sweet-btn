var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch  = require('gulp-watch');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init()) // this means src maps will be generated
    .pipe(ts({
        noImplicitAny: true,
        out: 'output.js',
        module: 'system'
    }))
    .pipe(concat('sweet-button.js')) // can use other plugins
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('release/'));
});

gulp.task('watch', function () {
    return watch('src/**/*.ts', function () {
            gulp.src('src/**/*.ts')
            .pipe(sourcemaps.init()) // this means src maps will be generated
            .pipe(ts({
                noImplicitAny: true,
                out: 'output.js',
                module: 'system'
            }))
            .pipe(concat('sweet-button.js')) // can use other plugins
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('release/'));
    });
});