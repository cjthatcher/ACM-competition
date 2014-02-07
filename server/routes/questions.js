/* jshint node:true */
'use strict';

var fs = require('fs');
var db = require('../utils/db.js');

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
  var id = req.params.id;
  var index = req.params.index;

  if (req.acmEvent.available || req.session.user.isAdmin) {
    _getFiles(req, function (err, files) {
      if (err) return res.fail(err);
      var question = req.acmEvent.questions[index];
      _verifySolution(res, files, id, index, question, req.session.user);
    });
  } else {
    res.forbidden();
  }
}

function _verifySolution(res, files, id, index, question, user) {
  var result = {
    success: false,
    user: user.name,
    gravatar: user.gravatar,
    time: +new Date(),
    source: files.src.trim(),
    answer: files.out.trim(),
    event: id,
    question: index
  };

  var msg = 'Wrong Answer';

  if (question.aOutput.trim() === files.out.trim()) {
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
  var files = {};
  for (var key in req.files) {
    var file = req.files[key];
    files[map[key]] = fs.readFileSync(file.path, 'utf8');
  }
  cb(null, files);
}

var map = {
  file0: 'out',
  file1: 'src'
};
