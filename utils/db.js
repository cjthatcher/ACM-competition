/* jshint node:true */
'use strict';

var strategy = require('config').strategy;
module.exports = require('./' + strategy + '.js');
