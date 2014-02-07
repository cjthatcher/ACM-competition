/* jshint node:true */
'use strict';

var express = require('express');
var      cc = require('config').couchConfig;

var ConnectCouchDB = require('connect-couchdb')(express);

var store = new ConnectCouchDB({
  host: cc.host,
  port: cc.port,
  name: cc.db.session
});

module.exports = store;
