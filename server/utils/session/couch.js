/* jshint node:true */
'use strict';

var express = require('express');
var      cc = require('config').couchConfig;

var ConnectCouchDB = require('connect-couchdb')(express);

var obj = {
  host: cc.host,
  port: cc.port,
  name: cc.db.session
};

if (cc.user) {
  obj.username = cc.user;
  obj.password = cc.pass;
}

var store = new ConnectCouchDB(obj);

module.exports = store;
