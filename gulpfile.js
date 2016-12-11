'use strict';

var gulp = require('gulp');
var embedTemplates = require('gulp-angular-embed-templates');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
 
gulp.task('build', function () {
  gulp.src(['src/datetime-input.js', 'src/date-input.js', 'src/time-input.js'])
    .pipe(embedTemplates())
    .pipe(uglify())
    .pipe(concat('datetime-input.min.js'))
    .pipe(gulp.dest('./dist'));
  gulp.src(['src/datetime-input.css', 'src/date-input.css', 'src/time-input.css'])
    .pipe(cssnano())
    .pipe(concat('datetime-input.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.+(js|html|css)', ['build']);
});
