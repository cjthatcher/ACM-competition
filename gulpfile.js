/* jshint node:true */
'use strict';

var  gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

gulp.task('server', function () {
  if (node) node.kill();
  node = spawn('node', ['app.js'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', function () {
  gulp.run('server');
  gulp.watch('routes/**', function () {
    gulp.run('server');
  });
});

process.on('exit', function () {
  if (node) node.kill();
});
