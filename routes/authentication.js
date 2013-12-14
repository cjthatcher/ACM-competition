/* jshint node:true */
'use strict';

var persistence = require('../util/persistence.js');

module.exports = function(app){
  app.post('/signup', signup);
  app.post('/logout', logout);
  app.get('/user', user);
  app.post('/login', login);
};

//high tech database
var db = {};

function login(req, res) {
  persistence.read('users', req.body.username, function (err, user){
    if (err) {
      res.send({
        success: false,
        err: 'No User Found'
      });
    return;
    }

    if (user.password !== req.body.password) {
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

function signup(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password, // <------- this was req.body.pass, shouldn't it be password? -cade
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email
  };
  if (db[user.username]) {
    return;
  }
  db[user.username] = user;

  persistence.create('users', user.username, user, function (err){
    if (err) {
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

function logout(req, res)
{
  req.session.destroy(function(){
    res.send({
      success: true
    });
  });
  //fine.
}

function user(req, res)
{
  var user = req.session.user;

  if (!user)
  {
    res.send( {
      success:false
    });
  }
  else
  {
    res.send( {
      success:true,
      user: user
    });
  }

}