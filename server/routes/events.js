/* jshint node:true */
'use strict';

var  _ = require('underscore');
var db = require('../utils/db.js');

module.exports = function (app) {
  app.get('/allEvents',      app.m.isLoggedIn, getEvents);
  app.get('/event/:id',      app.m.isLoggedIn, getEvent);
  app.get('/inp/:id/:index/:name', app.m.isLoggedIn, downloadInput);
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
  db.getEvent(req.params.id, function (err, event) {
    if (err) return res.fail(err);

    if (event.available || req.session.user.isAdmin) {
      event.questions = _.map(event.questions, function (q) {
        return _.omit(q, 'aInput', 'aOutput');
      });
    } else {
      event = _.omit(event, 'questions');
    }

    res.send({
      success: true,
      event: event
    });
  });
}

function downloadInput(req, res) {
  db.getEvent(req.params.id, function (err, event) {
    if (err) return res.fail(err);

    if (event.available || req.session.user.isAdmin) {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment');
      res.send(event.questions[req.params.index].aInput);
    } else {
      res.forbidden();
    }
  });
}
