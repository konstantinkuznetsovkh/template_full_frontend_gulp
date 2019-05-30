/*global require*/
((r) => {
	'use strict';
	const gulp = r('gulp'),
		// npm i gulpjs/gulp#3.9.1
		watch = r('gulp-watch'),
		plumber = r('gulp-plumber'),
		filesize = r('gulp-size'),
		changed = r('gulp-changed'),
		rigger = r('gulp-rigger'),

		scss = r('gulp-sass'),
		autoprefixer = r('gulp-autoprefixer'),
		gcmq = r('gulp-group-css-media-queries'),
		uncss = r('gulp-uncss'),
		cleanCSS = r('gulp-clean-css'),
		html_include = r('gulp-file-include'),
		htmlnano = r('gulp-htmlnano'),
		concat = r('gulp-concat'),
		babel = r('gulp-babel'),
		uglify_js = r('gulp-uglify'),
		// npm install --save-dev @babel/core @babel/preset-env
		sourcemaps = r('gulp-sourcemaps'), //добавляют размер в два раза
		img_min = r('gulp-imagemin'),
		webp = r('gulp-webp');
	// var options = {
	// 	removeComments: false
	// };

	// const SRC = 'src/*.js';
	// const DEST = 'dist';

	// this start tasks for developer///////////////////////////////
	gulp.task('scss', () => {
		gulp.src('developer/scss/all.scss')
			.pipe(changed('developer/css'))
			.pipe(plumber())
			.pipe(scss())
			.pipe(gulp.dest('developer/css'))
	});
	gulp.task('css', () => {
		gulp.src(['developer/css/all.css', 'developer/css/library_css/*.css'])
			// gulp.src('developer/css/all.css')
			.pipe(changed('production/css'))
			.pipe(concat('all.css'))
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(autoprefixer({
				browsers: ['last 22 versions'],
				cascade: true
			}))
			// .pipe(sourcemaps.init())
			.pipe(gcmq())
			// .pipe(uncss({
			// 	html: ['production/index.html']
			// }))
			.pipe(cleanCSS())
			// .pipe(sourcemaps.write())
			// .pipe(plumber.stop())//не ясно зачем возвращать поведение по умолчанию
			.pipe(gulp.dest('production/css'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}));
	});
	gulp.task('img_min', () => {
		gulp.src('developer/img/*')
			.pipe(changed('production/img'))
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
	});

	gulp.task('convert_webp', () => {
		gulp.src('developer/img/*.jpg')
			.pipe(webp())
			.pipe(gulp.dest('production'))
	});

	gulp.task('html_include', () => {
		gulp.src(['developer/html/index.html'])
			// .pipe(changed('developer/html/'))
			.pipe(plumber())
			.pipe(html_include({
				prefix: '@!',
				basepath: '@file'
			}))
			.pipe(gulp.dest('developer'))
	});
	gulp.task('html_min', () => {
		gulp.src('developer/index.html')
			// .pipe(changed('production'))
			.pipe(plumber())
			// .pipe(sourcemaps.init())
			.pipe(filesize({
				title: 'before',
				showFiles: true
			}))
			.pipe(htmlnano({
				removeComments: true
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
		gulp.src('./developer/js/library_js/library/*.js')
			.pipe(changed('developer/js/conected.js'))
			.pipe(concat('conected.js'))
			.pipe(gulp.dest('developer/js'))
			.pipe(filesize({
				title: 'after',
				showFiles: true
			}))
	});

	gulp.task('before_2_js_in_production', () => {
		gulp.src('./developer/js/library_js/main.js')
			.pipe(changed('developer/js'))
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
		gulp.src('developer/js/*.js')
			.pipe(plumber())
			.pipe(concat('main.js'))
			.pipe(changed('production/js'))
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
		watch('developer/css/**/*.css');
		watch(['developer/js/library_js/main.js', 'developer/js/library_js/conected.js']);
		watch('developer/js/library_js/main.js');
		watch('developer/js/main.js');
		watch('developer/index.html');
		watch('developer/fonts');
		watch('developer/img/*');
		watch('developer/fonts/*');

		gulp.watch('developer/html/**/*.html', ['html_include']);
		gulp.watch('developer/scss/**/*.scss', ['scss']);
		gulp.watch('developer/css/**/*.css', ['css']);

		gulp.watch(['developer/js/library_js/main.js', 'developer/js/library_js/conected.js'], ['before_js_in_production']);
		gulp.watch('developer/js/library_js/main.js', ['before_2_js_in_production']);
		gulp.watch('developer/js/main.js', ['js']);
		gulp.watch('developer/index.html', ['html_min']);
		gulp.watch('developer/fonts', ['transfer_fonts']);
		gulp.watch('developer/img/*', ['img_min']);
		gulp.watch('developer/fonts/*', ['transfer_fonts']);

		// watch('developer/css/all.css');
		// watch('developer/js/library_js/*.js');
		// gulp.watch('developer/css/all.css', ['autoprefixer']);
		// gulp.watch('developer/js/library_js/*.js', ['concat_js']);
	});
	// this end tasks for developer////////////////////////////////
	gulp.task('transfer_fonts', () => {
		gulp.src('developer/fonts/*')
			.pipe(changed('production'))
			.pipe(rigger())
			.pipe(gulp.dest('production'));
	});
	gulp.task('transfer_favicon', () => {
		gulp.src('developer/*.ico')
			// .pipe(changed('production'))
			.pipe(rigger())
			.pipe(gulp.dest('production'));
	}); //не работает с фавиконом!!?
	gulp.task('default', ['html_include', 'html_min', 'watch', 'scss', 'css', 'before_js_in_production', 'before_2_js_in_production', 'js', 'img_min', 'transfer_favicon', 'transfer_fonts']);
})(require);