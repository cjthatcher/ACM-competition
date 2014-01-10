/* jshint node:true */
'use strict';

var hash = require('password-hash');
var db = require('../utils/db.js');

module.exports = function(app){
  app.post('/signup', signup);
  app.post('/logout', logout);
  app.get('/user', user);
  app.post('/login', login);
};

function login(req, res) {
  db.getUser(req.body.username, function (err, user) {
    if (err) {
      res.send({
        success: false,
        err: 'No User Found'
      });
    return;
    }

    if (!hash.verify(req.body.password, user.password)) {
      res.send({
        success: false,
        err: 'Incorrect Credentials'
      });
      return;
    }

    req.session.user = user;
    res.send({
      success: true,
      user: user
    });
  });
}

function signup(req, res){
  var user = {
    username: req.body.username,
    password: hash.generate(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email
  };

  db.createUser(user, function (err) {
    if (err){
      res.send({
        success: false,
        err: 'Username Already In Use'
      });
      return;
    }
    //session set
    req.session.user = user;
    res.send({
      success: true,
      user: user
    });
  });
}

function logout(req, res){
  req.session.destroy(function(){
    res.send({
      success: true
    });
  });
}

function user(req, res){
  var user = req.session.user;
  if (!user){
    res.send({
      success:false
    });
  } else {
    res.send({
      success:true,
      user: user
    });
  }
}
