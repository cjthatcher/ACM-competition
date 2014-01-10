/* jshint node:true */
'use strict';

var db = require('../utils/db.js');

module.exports = function(app){
  app.get('/events', getEvents);
  app.post('/event', createEvent);
  app.delete('/event/:id', deleteEvent);
};

function getEvents(req, res) {
  db.getEvents(function (err, events) {
    if (err) {
      res.send({
        success: false,
        err: err
      });
      return;
    }
    res.send({
      success: true,
      events: events
    });
  });
}

function createEvent(req, res) {
  var event = {
    username: req.body.username,
    password: hash.generate(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email
  };

  db.createEvent(event, function (err, id) {
    if (err) {
      res.send({
        success: false,
        err: err
      });
      return;
    }
    res.send({
      success: true,
      id: id
    });
  });
}

function deleteEvent(req, res) {
  db.deleteEvent(req.params.id, function (err) {
    if (err) {
      res.send({
        success: false,
        err: err
      });
      return;
    }
    res.send({
      success: true
    });
  });
}
