/* jshint node:true */
'use strict';

// -- Initialization -----------------------------------------------------------

var request = require('request'),
          _ = require('underscore');

var cc = require('config').couchConfig;

var couchUrl = 'http://' + cc.host + ':' + cc.port + '/';

// -- User Methods -------------------------------------------------------------

exports.getUsers = function (cb) {
  _couchGetAll(cc.db.user, cb);
};

exports.getUser = function (name, cb) {
  _couchGet(cc.db.user, name, cb);
};

exports.createUser = function (user, cb) {
  user._id = user.username;
  _couchSave(cc.db.user, user, cb);
};

exports.updateUser = function (user, cb) {
  var name = user.username;
  _couchGet(cc.db.user, name, function (err, oldUser) {
    if (err) return cb(err);
    user._id = oldUser._id;
    user._rev = oldUser._rev;
    user.password = oldUser.password;
    _couchSave(cc.db.user, user, cb);
  }, true);
};

exports.deleteUser = function (name, cb) {
  _couchDelete(cc.db.user, name, cb);
};

exports.isNameTaken = function (name, cb) {
  _couchGet(cc.db.user, name, function (err, user) {
    cb(null, !!user);
  });
};

// -- Event Methods ------------------------------------------------------------

exports.getEvents = function (cb) {
  _couchGetAll(cc.db.event, cb);
};

exports.getEvent = function (id, cb) {
  _couchGet(cc.db.event, id, cb);
};

exports.createEvent = function (event, cb) {
  _couchSave(cc.db.event, event, cb);
};

exports.updateEvent = function (event, cb) {
  var id = event.id;
  _couchGet(cc.db.event, id, function (err, oldEvent) {
    if (err) return cb(err);
    event._rev = oldEvent._rev;
    _couchSave(cc.db.event, event, cb);
  }, true);
};

exports.deleteEvent = function (id, cb) {
  _couchDelete(cc.db.event, id, cb);
};

// -- Private Functions --------------------------------------------------------

function _couchGet(db, id, cb, saveRev) {
  var url = couchUrl + db + '/' + id;
  request(url, function (err, resp, body) {
    if (err) return cb(err);
    var json = JSON.parse(body);
    if (json.error) return cb(json.error + ': ' + json.reason);
    if (!saveRev) {
      delete json._id;
      delete json._rev;
    }
    cb(null, json);
  });
}

function _couchSave(db, obj, cb) {
  var id = obj._id;
  var url = couchUrl + db;
  if (id) url += '/' + obj._id;
  request({
    method: id ? 'PUT' : 'POST',
    url: url,
    json: obj
  }, function (err, resp, json) {
    if (err) return cb(err);
    if (json.error) return cb(json.error + ': ' + json.reason);
    cb(null, json.id);
  });
}

function _couchDelete(db, id, cb) {
  _couchGet(db, id, function (err, obj) {
    if (err) return cb(err);
    var url = couchUrl + db + '/' + id + '?rev=' + obj._rev;
    request({
      method: 'DELETE',
      url: url
    }, function (err, resp, body) {
      if (err) return cb(err);
      var json = JSON.parse(body);
      if (json.error) return cb(json.error + ': ' + json.reason);
      cb();
    });
  }, true);
}

function _couchGetAll(db, cb) {
  var url = couchUrl + db + '/_all_docs?include_docs=true';
  request(url, function (err, resp, body) {
    if (err) return cb(err);
    var json = JSON.parse(body);
    json = _.map(json.rows, function (item) {
      delete item.doc._id;
      delete item.doc._rev;
      return item.doc;
    });
    cb(null, json);
  });
}
