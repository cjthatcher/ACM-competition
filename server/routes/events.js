/* jshint node:true */
'use strict';

var  _ = require('underscore');
var db = require('../utils/db.js');

module.exports = function (app) {
  app.get('/allEvents', app.m.isLoggedIn, getEvents);
  app.get('/event/:id', app.m.isLoggedIn, getEvent);
};

function getEvents(req, res) {
  db.getEvents(function (err, events) {
    if (err) return res.fail(err);

    var arr = _.map(events, function (event) {
      return _.pick(event, 'id', 'name', 'desc', 'available');
    });

    res.send({
      success: true,
      events: arr
    });
  });
}

function getEvent(req, res) {
  var id = req.params.id;
  var user = req.session.user;

  db.getScores(id, function (err, scores) {
    if (err) return res.fail(err);
    scores = _.where(scores, { user: user.name });

    db.getEvent(id, function (err, event) {
      if (err) return res.fail(err);

      if (event.available || user.isAdmin) {
        event.questions = _.map(event.questions, function (q) {
          return _.omit(q, 'aInput', 'aOutput');
        });

        _.each(event.questions, function (question, index) {
          if (_.findWhere(scores, { question: '' + index }))
            question.solved = true;
        });
      } else {
        event = _.omit(event, 'questions');
      }

      res.send({
        success: true,
        event: event
      });
    });
  });
}
