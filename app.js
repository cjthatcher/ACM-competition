
/**
 * Module dependencies.
 */

/*jshint node:true*/
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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


app.get('/stallion/:name', function (request, response, next){
  if (request.params.name == 'chris')
  {
    response.send('Welcome Master.');
  }
  else
    next();
    //response.send('You are a monster ' + request.params.name);
});


var items = ['smells', 'cats', 'laundry'];

app.get('/items', function (req, res, next) {
  res.send(items);
});
