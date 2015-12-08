var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var gulpWatch = require('gulp-watch');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var appFiles = ['index.js','models/**/*.js', 'routes/**/*.js', 'gulpfile.js', 'lib/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('jshint:test', function(){
  return gulp.src(testFiles)
  .pipe(jshint({
    node:true,
    globals: {
      describe: true,
      it: true,
      before: true,
      after: true,
    }
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:app', function(){
  return gulp.src(appFiles)
  .pipe(jshint({
    node:true
  }))
  .pipe(jshint.reporter('default'));
});

gulp.task('mocha', ['jshint'], function(){
  return gulp.src('./test/test.js', {read:false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('static:dev', function(){
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', function(){
  gulp.src('./app/sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:watch', function() {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['sass:dev','static:dev']);
})

gulp.task('webpack:dev', function(){
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function(){
  gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'))
})

gulp.task('static:watch')
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['build:dev', 'jshint', 'mocha']);
