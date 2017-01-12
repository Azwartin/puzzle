var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	minify = require('gulp-minify-css'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin');

gulp.task('js', function(){
	gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js/'));
});

gulp.task('css', function(){
	gulp.src('css/*.css')
		.pipe(concat('all.css'))
		.pipe(minify())
		.pipe(gulp.dest('build/css/'));
});

gulp.task('imagemin', function() {
	var src = 'img/*.+(png|jpg)',
		dst = 'build/img';

	gulp.src(src)
		.pipe(changed(dst))
		.pipe(imagemin())
		.pipe(gulp.dest(dst));
});

gulp.task('default', ['js', 'css', 'imagemin'], function(){});