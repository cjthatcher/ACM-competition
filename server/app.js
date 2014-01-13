
/**
 * Module dependencies.
 */

/*jshint node:true*/
'use strict';

var express = require('express');
var http = require('http');
var fs = require('fs');
var config = require('config');

var sessOptions = config.sessOptions;

var app = express();

app.set('port', process.env.PORT || config.port);

var fail = require(__dirname + '/middleware/fail-routes.js');

// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  store: new express.session.MemoryStore(),
  key: sessOptions.key,
  secret: sessOptions.secret
}));
app.use(fail);
app.use(app.router);
app.use(require('stylus').middleware('public'));
app.use(express.static('public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.m = {};
fs.readdirSync(__dirname + '/route-middleware').forEach(function (file) {
  require('./route-middleware/' + file)(app);
});

fs.readdirSync(__dirname + '/routes').forEach(function (file) {
  require('./routes/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
