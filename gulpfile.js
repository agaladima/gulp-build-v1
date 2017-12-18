'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	minCss = require('gulp-clean-css');

//concat and minify js
gulp.task('scripts', function() {
	return gulp.src([
		'js/circle/autogrow.js',
		'js/circle/circle.js'
	])
	.pipe(maps.init())
	.pipe(concat('global.js'))
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('dist/scripts'));
});

//concat and minify css
gulp.task('compileSass', function() {
	gulp.src('sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(minCss())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['scripts'], function() {
	console.log('Running the default task');
});