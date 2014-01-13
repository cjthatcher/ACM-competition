/* jshint node:true */
'use strict';

var db = require('../utils/db.js');

module.exports = function(app){
  app.get('/events',       app.m.isAdmin, getEvents);
  app.post('/event',       app.m.isAdmin, createEvent);
  app.delete('/event/:id', app.m.isAdmin, deleteEvent);
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

function createEvent(req, res) {
  var event = {
    name: req.body.name,
    description: req.body.description,
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

function deleteEvent(req, res) {
  db.deleteEvent(req.params.id, function (err) {
    if (err) return res.fail(err);

    res.send({
      success: true
    });
  });
}
