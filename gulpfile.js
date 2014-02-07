/* jshint node:true */
'use strict';

var gulp = require('gulp');

var rimraf = require('gulp-rimraf');

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

gulp.task('css', function () {

});

gulp.task('js', function () {

});

gulp.task('img', function () {
  gulp.src('./public/img/**')
    .pipe(gulp.dest('./build/img'));
});



gulp.task('build', function () {
  gulp.run('css');
  gulp.run('js');
  gulp.run('img');
});

gulp.task('clean', function () {
  gulp.src('./build/**', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('default', function () {
  gulp.run('server');
  gulp.watch('server/**', function () {
    gulp.run('server');
  });
});

process.on('exit', function () {
  if (node) node.kill();
});
