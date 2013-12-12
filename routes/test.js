module.exports = function(app){
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
};