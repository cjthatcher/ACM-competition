/* jshint node:true */
'use strict';

module.exports = {
	create: create,
	read:   read,
	update: update,
	remove: remove
};

var strategy = require('./mongoStrategy.js');

function create(type, key, object, cb) {
	strategy.create(type, key, object, cb);
}

function read(type, key, cb) {
	strategy.read(type, key, cb);
}

function update(type, key, object, cb) {
	strategy.update(type, key, object, cb);
}

function remove(type, key, cb) {
	strategy.remove(type, key, cb);
}