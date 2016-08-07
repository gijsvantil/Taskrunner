// Require gulp
const gulp = require('gulp');
// Require the gulp-sass plugin
const sass = require('gulp-sass');
// Require BrowserSync
const browserSync = require('browser-sync').create();
// Concatenation
const useref = require('gulp-useref');

//// BASIC TASK SYNTAX
// gulp.task('task-name', function() {
//   // Stuff here
// });

// gulp.src tells the Gulp task what files to use for the task
// gulp.dest tells Gulp where to output the files once the task is completed.

// SASS Compiler
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss') // Globs //  Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ // Inject new CSS styles into browser
			stream: true
	}))
});

//// BASIC WATCH SYNTAX
// gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
//   // ...
// })

// Watch
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
   // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
  // Other watchers
});

// Server spin up using BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});