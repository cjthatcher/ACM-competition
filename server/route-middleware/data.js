/* jshint node:true */
'use strict';

var db = require('../utils/db.js');

module.exports = function (app) {
  app.m.grabEvent = grabEvent;
};

function grabEvent(req, res, next) {
  if (req.params && req.params.id) {
    db.getEvent(req.params.id, function (err, event) {
      if (err) return res.fail(err);
      req.acmEvent = event;
      next();
    });
  } else {
    return next();
  }
}
