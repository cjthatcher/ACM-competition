
/**
 * Module dependencies.
 */

/*jshint node:true*/
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var config = require('config');

var app = express();


app.set('port', process.env.PORT || config.port);
// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('shutupdude'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

fs.readdirSync(__dirname + "/routes").forEach(function(file){
  require('./routes/' + file)(app);
});
