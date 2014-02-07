/* jshint node:true */
'use strict';

// -- Initialization -----------------------------------------------------------

var crypto = require('crypto');
var      _ = require('underscore');
var   hash = require('password-hash');
var   uuid = require('node-uuid');

var users = {
  admin: {
    name: 'admin',
    pass: hash.generate('admin'),
    first: 'admin',
    last: 'admin',
    email: 'admin@usu-acm-competition.com',
    isAdmin: true
  }
};
users.admin.gravatar = crypto.createHash('md5').update(users.admin.email).digest('hex');


var events = {};

// -- User Methods -------------------------------------------------------------

exports.getUsers = function (cb) {
  cb(null, _.toArray(users));
};

exports.getUser = function (name, cb) {
  if (!users[name]) return cb('User does not exist');
  cb(null, users[name]);
};

exports.createUser = function (user, cb) {
  var name = user.name;
  if (users[name]) return cb('User already exists');
  users[name] = user;
  cb();
};

exports.updateUser = function (user, cb) {
  var name = user.name;
  if (!users[name]) return cb('User does not exist');
  user.pass = users[name].pass;
  users[name] = user;
  cb();
};

exports.deleteUser = function (name, cb) {
  if (!users[name]) return cb('User does not exist');
  delete users[name];
  cb();
};

exports.isNameTaken = function (name, cb) {
  cb(null, !!users[name]);
};

// -- Event Methods ------------------------------------------------------------

exports.getEvents = function (cb) {
  cb(null, _.toArray(events));
};

exports.getEvent = function (id, cb) {
  if (!events[id]) return cb('Event does not exist');
  cb(null, events[id]);
};

exports.createEvent = function (event, cb) {
  var id = uuid.v1();
  event.id = id;
  events[id] = event;
  cb(null, id);
};

exports.updateEvent = function (event, cb) {
  var id = event.id;
  if (!events[id]) return cb('Event does not exist');
  events[id] = event;
  cb(null);
};

exports.deleteEvent = function (id, cb) {
  if (!events[id]) return cb('Event does not exist');
  delete events[id];
  cb(null);
};
