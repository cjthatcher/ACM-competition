
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
app.use(app.router);
app.use(require('stylus').middleware('public'));
app.use(express.static('public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

fs.readdirSync(__dirname + '/routes').forEach(function (file) {
  require('./routes/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
