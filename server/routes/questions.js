/* jshint node:true */
'use strict';

var fs = require('fs');
var db = require('../utils/db.js');
var  Q = require('q');

module.exports = function (app) {
  app.get('/inp/:id/:index/:name', app.m.isLoggedIn, app.m.grabEvent, downloadInput);
  app.post('/upload/:id/:index',   app.m.isLoggedIn, app.m.grabEvent, uploadFiles);
};

function downloadInput(req, res) {
  if (req.acmEvent.available || req.session.user.isAdmin) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment');
    res.send(req.acmEvent.questions[req.params.index].aInput);
  } else {
    res.forbidden();
  }
}

function uploadFiles(req, res) {
  if (req.acmEvent.available || req.session.user.isAdmin) {
    _getFiles(req, function (err, files) {
      if (err) return res.fail(err);
      _verifySolution(req, res, files);
    });
  } else {
    res.forbidden();
  }
}

function _verifySolution(req, res, files) {
  var id = req.params.id;
  var index = req.params.index;
  var question = req.acmEvent.questions[index];
  var user = req.session.user;

  var result = {
    success: false,
    user: user.name,
    gravatar: user.gravatar,
    time: +new Date(),
    answer: files[0].trim(),
    source: files[1].trim(),
    event: id,
    question: index
  };

  var msg = 'Wrong Answer';

  if (question.aOutput.trim() === result.answer) {
    result.success = true;
    msg = 'Correct, Keep going!';
  }

  db.saveResult(result, function (err, wasFirst) {
    if (err) return res.fail(err);
    if (wasFirst && result.success)
      msg = 'First Right Answer!! Congrats!!';

    if (!result.success) return res.fail(msg);

    res.send({
      success: true,
      msg: msg
    });
  });
}

function _getFiles(req, cb) {
  var promises = [
    _getFile(req.files.file0.path), // out
    _getFile(req.files.file1.path)  // src
  ];

  Q.all(promises).then(function (results) {
    cb(null, results);
  });
}

function _getFile(path) {
  var deferred = Q.defer();
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
  });
  return deferred.promise;
}
