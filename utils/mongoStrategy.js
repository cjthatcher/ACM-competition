/* jshint node:true */
'use strict';

var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var dbc = require('config').db;

module.exports = {
  create: create,
  read:   read,
  update: update,
  remove: remove
};

var collections = dbc.groups;

_connect(function (err, db) {
  if (err) console.error(err);
  console.log('Connected to Mongo');
  _.each(collections, function (coll){
    db.createCollection(coll, function(err){
    if (err) console.log('Error creating collection ' + coll + ' : ' + err);
    console.log('[INFO] Collection ' + coll + ' created.');
    });
  });
});

function create(type, key, object, cb) {
  _connect(function (err, db) {
    if (err) return cb(err);
    var collection = db.collection(type);
    collection.findOne({key: key}, function (err, result){
      if (err) return cb(err);
      if (result) return cb('Key Already In Use');
      object.key = key;
      collection.insert(object, function (err, result){
        if (err) return cb(err);
        cb(null, result);
      });
    });
  });
}

function read(type, key, cb) {
  _connect(function (err, db) {
    if (err) return cb(err);
    var collection = db.collection(type);
    collection.findOne({key: key}, function (err, result){
      if (err) return cb(err);
      if (!result) return cb('Key Not Found');
      cb(null, result);
    });
  });
}

function update(type, key, object, cb) {
  _connect(function (err, db) {
    if (err) return cb(err);
    var collection = db.collection(type);
    var criteria = collection.findOne({key: key});
    collection.update(criteria, object, function (err, result) {
      if (err) return cb(err);
      if (!result) return cb('No Key Found');
      return cb(null, result);
    });
  });
}

function remove(type, key, cb) {
  _connect(function (err, db) {
    if (err) return cb(err);
    var collection = db.collection(type);
    collection.remove({key: key}, 1, function (err, result) {
      console.log('did this work eh?');
      if (err) return cb(err);
      return cb(null, result);
    });
  });
}

function _connect(cb) {
  MongoClient.connect('mongodb://' + dbc.host + ':' + dbc.port + '/' + dbc.dbName, cb);
}
