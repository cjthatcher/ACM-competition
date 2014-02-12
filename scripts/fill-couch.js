/* jshint node:true */
'use strict';

// -- Init Code ----------------------------------------------------------------

var  crypto = require('crypto');
var       _ = require('underscore');
var       Q = require('q');
var    hash = require('password-hash');
var      cc = require('config').couchConfig;
var request = require('request');
var   spawn = require('child_process').spawn;

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
    return createSession();
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
    name: 'admin',
    pass: hash.generate('admin'),
    first: 'admin',
    last: 'admin',
    email: 'admin@usu-acm-competition.com',
    isAdmin: true
  };
  obj.gravatar = crypto.createHash('md5').update(obj.email).digest('hex');

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

function createSession() {
  var deferred = Q.defer();
  var msg = 'createSessionView: ';

  var args = [
    'node_modules/connect-couchdb/tools/setup.js',
    cc.db.session,
    1000
  ];

  var err = '';
  spawn('node', args).on('close', function (code) {
    if (code === 0)
    deferred.resolve(msg + 'view created successfully');
    deferred.reject(msg + err);
  }).stderr.on('data', function (data) {
    err += data;
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
