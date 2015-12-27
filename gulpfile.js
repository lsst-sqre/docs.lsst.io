'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
// var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');


// gulp-plummer wrapper to handle errors during gulp watch
// From Zell Liew. “Automate Your Workflow.”
function customPlumber (errTitle) {
  return plumber({
    errorHandler: function(err) {
      // Logs error in console
      console.log(err.stack);
      // gulp-notify doesn't work under tmux, unfortunately
      // notify.onError({
      //     // Customizing error title
      //     title: errTitle || 'Error running Gulp',
      //     message: 'Error: <%= error.message %>',
      // });
      // Ends the current pipe, so Gulp watch doesn't break
      this.emit('end');
    }
  });
}


// gulp sass - build Sass in sass/ directory and install into theme
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(customPlumber())
    .pipe(sass({includePaths: ['src/bower_components']}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
});


// gulp html - copy html into build directory
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(customPlumber())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}))
});


// gulp browserSync - Starts a BrowserSync sever at the Demo site.
// BrowserSync - http://www.browsersync.io
// From: Zell Liew. “Automate Your Workflow.”
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build',
    },
    browser: 'google chrome',
    open: false,
  })
});


// gulp clean - Delete the built site
gulp.task('clean', function(callback) {
  return del(['build'], callback)
});


// gulp watch - build when files change
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch("src/**/*.html", ['html']);
});


// default task runs the full pipeline, activates browserSync, then starts
// the watch task.
gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'html',
        'sass',
        ['browserSync', 'watch'],
        callback
    );
});
