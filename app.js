
/**
 * Module dependencies.
 */

/*jshint node:true*/
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient

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

fs.readdirSync(__dirname + "/routes").forEach(function(file){
  require('./routes/' + file)(app);
});


// below is code for mongo db. I had to install mongodb first.
// On mac, brew install mongodb. Christ - Good Luck. I'm sure there's a way. 
// First - it creates a collection. Idk if this is really needed? - clarify if you know
// Second - it adds some sample data to a var and inserts the record into the collection
// Last - I included code to find the record you just inserted.

// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;

// MongoClient.connect("mongodb://localhost:27017/testCollection", function(err, db) {
//   if(!err)
//     console.log("We are connected");

//   // //------------------------------create collection---
// 	// db.createCollection("users", function(err, collection){
// 	//    if (err) throw err;

// 	//    	console.log("[INFO] Collection created.");
// 	// }); // ---------------------------------------------

// 	//json record
// 	//var sampleData = {username:"cade", password:"secret"};
  
// 	//------------------------------------insert record----
// 	// db.collection('testCollection').insert(sampleData, function(err, records) {
// 	// 	if (err) throw err;
// 	// 	console.log(records[0].username);
// 	// }); // ---------------------------------------------

// 	// --------------find the data previously entered -----
// 	db.collection('testCollection').find({username: "cade"}).toArray(function(err, results){
// 		console.log(results[0].username); // prints user name
// 		console.log(results[0].password); // prints password
// 	}); // ------------------------------------------------
// });