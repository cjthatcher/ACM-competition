/* jshint node:true */
'use strict';

var  _ = require('underscore');
var db = require('../utils/db.js');

module.exports = function (app) {
  app.get('/scores/:id',    app.m.isLoggedIn, app.m.grabEvent, getScores);
  app.get('/a/results/:id', app.m.isAdmin, app.m.grabEvent, getResults);
};

function getResults(req, res) {
  db.getResults(req.params.id, function (err, results) {
    if (err) return res.fail(err);

    _.each(results, function (result) {
      var q = req.acmEvent.questions[result.question];
      result.eventLabel = req.acmEvent.name;
      result.questionLabel = q.name + ' - ' + q.subtitle;
    });

    res.send({
      success: true,
      results: results
    });
  });
}

function getScores(req, res) {
  var id = req.params.id;

  db.getScores(id, function (err, scores) {
    if (err) return res.fail(err);

    _.each(scores, function (score) {
      var q = req.acmEvent.questions[score.question];
      if (!req.session.user.isAdmin) {
        delete score.answer;
        delete score.source;
      }
      delete score.success;
      delete score.event;
      score.questionLabel = q.name + ' - ' + q.subtitle;
    });

    res.send({
      success: true,
      scores: scores
    });
  });
}
