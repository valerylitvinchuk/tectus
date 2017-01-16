var gulp = require("gulp"),
		browserSync = require("browser-sync"),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber');

gulp.task("server", function(){
	browserSync({
		port: 9000,
		server: {
			baseDir: "app/"
		}
	});
});

gulp.task('pug', function buildHTML() {
  return gulp.src('dev/*.pug')
  .pipe(plumber())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('app/'))
});

gulp.task('sass', function () {
  return gulp.src('dev/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('copy', function () {
	gulp.src('dev/bower/**/*.*')
	.pipe(gulp.dest('app/bower'));
	gulp.src('dev/img/*.*')
	.pipe(gulp.dest('app/img'));
	gulp.src('dev/js/**/*.*')
	.pipe(gulp.dest('app/js'));
});

gulp.task("watch", function(){
	gulp.watch("dev/*.pug", ['pug']);
	gulp.watch("dev/sass/**/*.scss", ['sass']);
	gulp.watch(["dev/bower/**/*.*", "dev/js/**/*.js"], ['copy']);
	gulp.watch([
		"app/*.html",
		"app/css/**/*.css",
		"app/js/**/*.js"
	]).on("change", browserSync.reload);
});

gulp.task("default", ["pug", "sass", "copy", "server", "watch",]);