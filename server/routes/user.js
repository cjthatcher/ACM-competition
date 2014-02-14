/* jshint node:true */
'use strict';

var crypto = require('crypto');
var   hash = require('password-hash');
var     db = require('../utils/db.js');

module.exports = function (app) {
  app.post('/login',  login);
  app.post('/signup', signup);
  app.post('/logout', app.m.isLoggedIn, logout);
  app.get('/user',    app.m.isLoggedIn, user);
};

function login(req, res) {
  db.getUser(req.body.name, function (err, user) {
    if (err) return res.fail('No User Found');

    if (!hash.verify(req.body.pass, user.pass))
      return res.fail('Incorrect Credentials');

    req.session.user = user;

    res.send({
      success: true,
      user: user
    });
  });
}

function signup(req, res) {
  var user = {
    name: req.body.name,
    pass: req.body.pass,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email
  };

  if (!user.name || !user.pass || !user.first || !user.last || !user.email)
    return res.fail('Missing Information');

  user.pass = hash.generate(user.pass);
  user.gravatar = _md5(user.email);

  db.createUser(user, function (err) {
    if (err) return res.fail('Username Already In Use');

    req.session.user = user;

    res.send({
      success: true,
      user: user
    });
  });
}

function logout(req, res) {
  req.session.destroy(function () {
    res.send({
      success: true
    });
  });
}

function user(req, res) {
  res.send({
    success: true,
    user: req.session.user
  });
}

function _md5(str) {
  str = str.trim().toLowerCase();
  return crypto.createHash('md5').update(str).digest('hex');
}
