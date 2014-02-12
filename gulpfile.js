/* jshint node:true */
'use strict';

var gulp = require('gulp');

var     rimraf = require('gulp-rimraf');
var     stylus = require('gulp-stylus');
var     concat = require('gulp-concat');
var      ngmin = require('gulp-ngmin');
var     useref = require('gulp-useref');
var  ngHtml2Js = require('gulp-ng-html2js');
var     uglify = require('gulp-uglify');
var   imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var  minifyCSS = require('gulp-minify-css');

var spawn = require('child_process').spawn;
var node;

gulp.task('server', function () {
  if (node) node.kill();
  node = spawn('node', ['server/app.js'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('html', function () {
  return gulp.src('public/index.html')
          .pipe(useref())
          .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
          }))
          .pipe(gulp.dest('build'));
});

gulp.task('img', function () {
  return gulp.src('public/img/**')
          .pipe(imagemin())
          .pipe(gulp.dest('build/img'));
});

gulp.task('css', ['styl'], function () {
  var files = [
    'public/css/lib/**/*.css',
    'build/generated/css/**/*.css'
  ];
  return gulp.src(files)
          .pipe(minifyCSS({
            keepSpecialComments: 0
          }))
          .pipe(concat('acm.min.css'))
          .pipe(gulp.dest('build/css'));
});

gulp.task('styl', function () {
  return gulp.src('public/css/app.styl')
          .pipe(stylus())
          .pipe(gulp.dest('build/generated/css'));
});

gulp.task('js', ['templates'], function () {
  var files = [
    'public/js/ext/angular.js',
    'public/js/ext/lib/**/*.js',
    'public/js/module.js',
    'build/generated/js/partials.js',
    'public/js/app/**/*.js',
    'public/js/main.js'
  ];
  return gulp.src(files)
          .pipe(ngmin())
          .pipe(concat('acm.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function () {
  return gulp.src('public/tmpl/**/*.html')
          .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
          }))
          .pipe(ngHtml2Js({
            moduleName: 'acm',
            prefix: 'tmpl/'
          }))
          .pipe(concat('partials.js'))
          .pipe(gulp.dest('build/generated/js'));
});

gulp.task('cleanGeneratedFiles', function () {
  return gulp.src('build/generated/**', { read: false })
          .pipe(rimraf({ force: true }));
});

gulp.task('build', ['html', 'img', 'css', 'js'], function () {
  gulp.run('cleanGeneratedFiles');
});

gulp.task('clean', function () {
  return gulp.src('build/**', { read: false })
          .pipe(rimraf({ force: true }));
});

gulp.task('default', function () {
  var files = [
    'server/**',
    'config/**'
  ];
  gulp.run('server');
  gulp.watch(files, function () {
    gulp.run('server');
  });
});

process.on('exit', function () {
  if (node) node.kill();
});
