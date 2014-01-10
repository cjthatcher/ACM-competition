/* jshint node:true */
'use strict';

// -- Init Code ----------------------------------------------------------------

var       Q = require('q'),
          _ = require('underscore'),
       hash = require('password-hash'),
         cc = require('config').couchConfig,
    request = require('request');

require('colors');

if (!cc) {
  console.log('You must run this script from the root directory of the acm project.'.rainbow);
  process.exit(0);
}

var couchUrl = 'http://' + cc.host + ':' + cc.port + '/';

// -- Driver Code --------------------------------------------------------------

(function () {
  var dbPromises = [];
  _.each(cc.db, function (db) {
    dbPromises.push(createDB(db));
  });

  Q.all(dbPromises).then(function (results) {
    _report('green', results);
    return createAdmin();
  }).then(function (result) {
    _report('green', result);
  }, function (err) {
    _report('red', err);
  });
}());

// -- Functions ----------------------------------------------------------------

function createAdmin() {
  var deferred = Q.defer();
  var msg = 'Create Admin: ';
  var url = couchUrl + cc.db.user + '/admin';
  var obj = {
    username: 'admin',
    password: hash.generate('admin'),
    isAdmin: true
  };
  request({
    url: url,
    method: 'PUT',
    json: obj
  }, function (err, resp, body) {
    if (err) return deferred.reject(msg + err);
    if (_.isString(body)) body = JSON.parse(body);
    if (body.ok) {
      deferred.resolve(msg + JSON.stringify(body));
    } else if (body.error === 'conflict') {
      deferred.resolve(msg + 'admin already exists');
    } else {
      deferred.reject(msg + body.error + ': ' + body.reason);
    }
  });
  return deferred.promise;
}

function createDB(name) {
  var deferred = Q.defer();
  var msg = 'Create Database: ' + name + ': ';
  var url = couchUrl + name;
  request.put(url, function (err, resp, body) {
    if (err) return deferred.reject(msg + err);
    if (_.isString(body)) body = JSON.parse(body);
    if (body.ok) {
      deferred.resolve(msg + JSON.stringify(body));
    } else if (body.error === 'file_exists') {
      deferred.resolve(msg + 'db already exists');
    } else {
      deferred.reject(msg + body.error + ': ' + body.reason);
    }
  });
  return deferred.promise;
}

// -- Private Functions --------------------------------------------------------

function _report(status, msgs) {
  if (!_.isArray(msgs)) msgs = [msgs];
  _.each(msgs, function (msg) {
    if (_.isObject(msg)) msg = JSON.stringify(msg);
    console.log(msg[status]);
  });
}

// function template() {
//   var deferred = Q.defer();
//   return deferred.promise;
// }
