'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	minCss = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	connect = require('gulp-connect');

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
gulp.task('styles', function() {
	gulp.src('sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(minCss())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/styles'));
});

//Optimize size of jpeg and png files and copy to dist/content
gulp.task('images', function() {
	gulp.src('images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/contnet'));
});

//delete all files and folders in the dist folder
gulp.task('clean', function() {
	return gulp.src('dist/*', {read: false})
		.pipe(clean());
});

//connect server
gulp.task('connect', function() {
	connect.server();
});

//watch for changes
gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['styles']);
});

//serve
gulp.task('serve', ['watch']);

//run all above tasks together
gulp.task('build', ['clean'], function(callback) {
	runSequence(['scripts', 'styles', 'images', 'serve'],
	callback
	)
});

gulp.task('default', ['connect'], function() {
	gulp.start('build');
	console.log('Running the default task');
});