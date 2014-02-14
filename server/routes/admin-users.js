/* jshint node:true */
'use strict';

var crypto = require('crypto');
var      _ = require('underscore');
var     db = require('../utils/db.js');
var   hash = require('password-hash');

module.exports = function (app) {
  app.post('/a/user',          app.m.isAdmin, createUser);
  app.get('/a/users',          app.m.isAdmin, getUsers);
  app.post('/a/resetPassword', app.m.isAdmin, resetPassword);
  app.post('/a/updateUser',    app.m.isAdmin, updateUser);
  app.delete('/a/user/:name',  app.m.isAdmin, deleteUser);
};

function createUser(req, res) {
  var user = req.body;

  if (!user.name || !user.pass || !user.first || !user.last || !user.email)
    return res.fail('Missing Information');

  user.pass = hash.generate(user.pass);
  user.gravatar = _md5(user.email);

  db.createUser(user, function (err) {
    if (err) return res.fail(err);
    res.send({
      success: true
    });
  });
}

function getUsers(req, res) {
  db.getUsers(function (err, users) {
    if (err) return res.fail(err);
    _.each(users, function (user) {
      delete user.pass;
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

function _md5(str) {
  str = str.trim().toLowerCase();
  return crypto.createHash('md5').update(str).digest('hex');
}
