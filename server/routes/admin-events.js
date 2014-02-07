/* jshint node:true */
'use strict';

var db = require('../utils/db.js');

module.exports = function(app){
  app.get('/a/events',       app.m.isAdmin, getEvents);
  app.get('/a/event/:id',    app.m.isAdmin, app.m.grabEvent, getEvent);
  app.post('/a/event',       app.m.isAdmin, createEvent);
  app.post('/a/updateEvent', app.m.isAdmin, updateEvent);
  app.delete('/a/event/:id', app.m.isAdmin, deleteEvent);
};

function getEvents(req, res) {
  db.getEvents(function (err, events) {
    if (err) return res.fail(err);

    res.send({
      success: true,
      events: events
    });
  });
}

function getEvent(req, res) {
  res.send({
    success: true,
    event: req.acmEvent
  });
}

function createEvent(req, res) {
  var event = {
    name: req.body.name,
    desc: req.body.desc,
    available: false,
    questions: []
  };

  db.createEvent(event, function (err, id) {
    if (err) return res.fail(err);

    res.send({
      success: true,
      id: id
    });
  });
}

function updateEvent(req, res) {
  db.updateEvent(req.body, function (err) {
    if (err) return res.fail(err);

    res.send({
      success: true
    });
  });
}

function deleteEvent(req, res) {
  db.deleteEvent(req.params.id, function (err) {
    if (err) return res.fail(err);

    res.send({
      success: true
    });
  });
}
