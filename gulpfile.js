/*global require*/
((r) => {
	'use strict';
	const gulp = r('gulp'),
		// npm i gulpjs/gulp#3.9.1
		watch = r('gulp-watch'),
		html_include = r('gulp-file-include'),
		scss = r('gulp-sass'),
		autoprefixer = r('gulp-autoprefixer'),
		filesize = r('gulp-size'),
		uglify_js = r('gulp-uglify'),
		babel = r('gulp-babel'),
		// npm install --save-dev @babel/core @babel/preset-env
		concat = r('gulp-concat'),
		cleanCSS = r('gulp-clean-css'),
		sourcemaps = r('gulp-sourcemaps'), //добавляют размер в два раза
		img_min = r('gulp-imagemin'),
		htmlnano = r('gulp-htmlnano'),
		gcmq = r('gulp-group-css-media-queries'),
		plumber = r('gulp-plumber'),
		rigger = require('gulp-rigger');
	const webp = require('gulp-webp');
	// var options = {
	// 	removeComments: false
	// };



	// this start tasks for developer///////////////////////////////
	gulp.task('css', () => {
		return gulp.src('developer/scss/all.scss')
			.pipe(plumber())
			.pipe(scss())
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(autoprefixer({
				browsers: ['last 22 versions'],
				cascade: false
			}))
			// .pipe(sourcemaps.init())
			.pipe(gcmq())
			.pipe(cleanCSS())
			// .pipe(sourcemaps.write())
			// .pipe(plumber.stop())//не ясно зачем возвращать поведение по умолчанию
			.pipe(gulp.dest('production/css'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}));
	});
	gulp.task('img_min', () =>
		gulp.src('developer/img/*')
		.pipe(filesize({
			title: 'before',
			showFiles: true
		}))
		.pipe(img_min())
		.pipe(gulp.dest('production/img'))
		.pipe(filesize({
			title: 'after',
			showFiles: true
		}))
	);

	gulp.task('convert_webp', () => {
		gulp.src('developer/img/*.jpg')
			.pipe(webp())
			.pipe(gulp.dest('production'))
	});

	gulp.task('html_include', () => {
		return gulp.src(['developer/html/index.html'])
			.pipe(plumber())
			.pipe(html_include({
				prefix: '@!',
				basepath: '@file'
			}))
			.pipe(gulp.dest('developer'))
	});
	gulp.task('html_min', () => {
		return gulp
			.src('developer/index.html')
			.pipe(plumber())
			// .pipe(sourcemaps.init())
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(htmlnano({
				removeComments: false
			}))
			// .pipe(sourcemaps.write())
			.pipe(gulp.dest('production'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}))
	});

	// gulp.task('minify-css', () => {
	// 	return gulp.src('styles/*.css')
	// 	  .pipe(cleanCSS({compatibility: 'ie8'}))
	// 	  .pipe(gulp.dest('dist'));
	//   });
	gulp.task('before_js_in_production', () => {
		return gulp.src('./developer/js/library_js/library/*.js')
			.pipe(concat('conected.js'))
			.pipe(gulp.dest('developer/js'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}))
	});

	gulp.task('before_2_js_in_production', () => {
		return gulp.src('./developer/js/library_js/main.js')
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(babel({
				presets: ['env']
			}))
			.pipe(gulp.dest('developer/js'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}))
	});
	gulp.task('js', () => {
		return gulp.src('developer/js/*.js')
			.pipe(plumber())
			.pipe(concat('main.js'))
			// .pipe(sourcemaps.init())
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(uglify_js())
			// .pipe(sourcemaps.write())
			.pipe(gulp.dest('production/js'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}))
	});
	gulp.task('watch', () => {
		watch('developer/html/**/*.html');
		watch('developer/scss/**/*.scss');
		watch(['developer/js/library_js/main.js', 'developer/js/library_js/conected.js']);
		watch('developer/js/library_js/main.js');
		watch('developer/js/main.js');
		watch('developer/index.html');
		// watch('developer/fav.ico');

		gulp.watch('developer/html/**/*.html', ['html_include']);
		gulp.watch('developer/scss/**/*.scss', ['css']);

		gulp.watch(['developer/js/library_js/main.js', 'developer/js/library_js/conected.js'], ['before_js_in_production']);
		gulp.watch('developer/js/library_js/main.js', ['before_2_js_in_production']);
		gulp.watch('developer/js/main.js', ['js']);
		gulp.watch('developer/index.html', ['html_min']);
		// gulp.watch('developer/fav.ico', ['transfer_favicon']);

		// watch('developer/css/all.css');
		// watch('developer/js/library_js/*.js');
		// gulp.watch('developer/css/all.css', ['autoprefixer']);
		// gulp.watch('developer/js/library_js/*.js', ['concat_js']);
	});
	// this end tasks for developer////////////////////////////////
	gulp.task('transfer_file', function () {
		gulp.src(['developer/fonts/*.ttf', 'developer/fonts/*.wolf'])
			.pipe(rigger())
			.pipe(gulp.dest('production/fonts/'));
	});
	gulp.task('transfer_favicon', function () {
		gulp.src('developer/fav.ico')
			.pipe(rigger())
			.pipe(gulp.dest('production'));
	});
	gulp.task('default', ['html_include', 'watch', 'css', 'before_js_in_production', 'before_2_js_in_production']);
	// gulp.task('default', ['scss', 'watch', 'html_include','concat_js','autoprefixer']);
	// потомучто не требуется каждый раз переуменьшать картинки и 
	// gulp.task('default', ['img_min']);

})(require);