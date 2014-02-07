/* jshint node:true */
'use strict';

var strategy = require('config').strategy;

try {
  module.exports = require('./session/' + strategy + '.js');
} catch (e) {
  console.error('[session] No such strategy: ' + strategy);
  process.exit(1);
}
