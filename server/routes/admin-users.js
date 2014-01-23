/* jshint node:true */
'use strict';

var _ = require('underscore');

var db = require('../utils/db.js');

module.exports = function (app) {
  app.get('/a/users',          app.m.isAdmin, getUsers);
  app.post('/a/resetPassword', app.m.isAdmin, resetPassword);
  app.post('/a/updateUser',    app.m.isAdmin, updateUser);
  app.delete('/a/user/:name',  app.m.isAdmin, deleteUser);
};

function getUsers(req, res) {
  db.getUsers(function (err, users) {
    if (err) return res.fail(err);
    _.each(users, function (user) {
      delete user.password;
    });

    res.send({
      success: true,
      users: users
    });
  });
}

function resetPassword(req, res) {
  // send a password reset email
  res.send({ success: false, err: 'Not Yet Implemented, sorry.' });
}

function updateUser(req, res) {
  db.updateUser(req.body, function (err) {
    if (err) return res.fail(err);
    res.send({ success: true });
  });
}

function deleteUser(req, res) {
  db.deleteUser(req.params.name, function (err) {
    if (err) return res.fail(err);
    res.send({ success: true });
  });
}
