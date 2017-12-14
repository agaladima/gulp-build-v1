'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('concatScripts', function() {
	gulp.src([
		'js/circle/autogrow.js',
		'js/circle/circle.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('js'));
});
