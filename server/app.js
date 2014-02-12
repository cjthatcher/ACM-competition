/* jshint node:true */
'use strict';

var    http = require('http');
var      fs = require('fs');
var express = require('express');
var  config = require('config');

var sessOptions = config.sessOptions;
var store = require('./utils/session.js');

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
  store: store,
  key: sessOptions.key,
  secret: sessOptions.secret
}));
app.use(fail);
app.use(app.router);

if (isdev()) {
  app.use(require('stylus').middleware('public'));
  app.use(express.static('public'));
  app.use(express.errorHandler());
} else {
  app.use(express.static('build'));
}

app.m = {};
fs.readdirSync(__dirname + '/route-middleware').forEach(function (file) {
  require('./route-middleware/' + file)(app);
});

fs.readdirSync(__dirname + '/routes').forEach(function (file) {
  require('./routes/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port') + ' in env ' + app.get('env'));
});

function isdev() {
  return app.get('env') == 'development' || app.get('env') == 'localdev';
}
