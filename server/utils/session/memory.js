/* jshint node:true */
'use strict';

var express = require('express');

var store = new express.session.MemoryStore();

module.exports = store;
