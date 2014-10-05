var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    'use strict';
	connect.server({
		root: ['.'],
		port: 4242,
		livereload: true
	});
	watch(['./*.*'])
		.pipe(connect.reload());
});