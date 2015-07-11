var gulp = require('gulp');
var concat = require('gulp-concat');
// var livereload = require()

gulp.task('js', function() {
  gulp.src('./source/javascripts/**/*.js')
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./public/javascripts/'))
  // .pipe(livereload())
});


gulp.task('default', function() {
  gulp.watch('./source/javascripts/**/*.js', ['js']);
});