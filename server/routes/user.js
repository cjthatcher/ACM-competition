/* jshint node:true */
'use strict';

var hash = require('password-hash');
var db = require('../utils/db.js');

module.exports = function (app) {
  app.post('/login',  login);
  app.post('/signup', signup);
  app.post('/logout', app.m.isLoggedIn, logout);
  app.get('/user',    app.m.isLoggedIn, user);
};

function login(req, res) {
  db.getUser(req.body.username, function (err, user) {
    if (err) return res.fail('No User Found');

    if (!hash.verify(req.body.password, user.password))
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
    username: req.body.username,
    password: hash.generate(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email
  };

  if (!user.username || !user.password || !user.first_name || !user.last_name || !user.email)
    return res.fail('Missing Information');

  db.createUser(user, function (err) {
    if (err) return res.fail('Username Already In Use');

    //session set
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
    success:true,
    user: req.session.user
  });
}
