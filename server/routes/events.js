/* jshint node:true */
'use strict';

var  _ = require('underscore');
var db = require('../utils/db.js');

module.exports = function (app) {
  app.get('/allEvents', app.m.isLoggedIn, getEvents);
  app.get('/event/:id', app.m.isLoggedIn, app.m.grabEvent, getEvent);
  app.get('/event/', app.m.isLoggedIn, nope);
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

    if (req.acmEvent.available || user.isAdmin) {
      req.acmEvent.questions = _.map(req.acmEvent.questions, function (q) {
        return _.omit(q, 'aInput', 'aOutput');
      });

      _.each(req.acmEvent.questions, function (question, index) {
        if (_.findWhere(scores, { question: '' + index }))
          question.solved = true;
      });
    } else {
      req.acmEvent = _.omit(req.acmEvent, 'questions');
    }

    res.send({
      success: true,
      event: req.acmEvent
    });
  });
}

function nope(req, res) {
  res.fail('Invalid Event Id');
}
