module.exports = function(app){
	app.post('/signup', signup);
	app.post('/logout', logout);
	app.get('/user', user);
	app.post('/login', login);
};

//high tech database
var db = {};

function login(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	if (!db[req.body.username]) {
		res.send({
			success: false,
			err: "No user found"
		});
		return; 
	}
	var currentUser = db[req.body.username];
	if (currentUser.password === req.body.password) {
		//session set
		req.session.user = user;

		res.send({
			success: true,
			user: user
		});
	} else {
		res.send({
			success: false, 
			err: "The credentials you entered were incorrect"
		})
		return;
	}
}

function signup(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.password, // <------- this was req.body.pass, shouldn't it be password? -cade
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email_address: req.body.email
	};
	if (db[user.username]) {
		res.send({
			success: false,
			err: "That username is taken :("
		})
		return;
	}
	db[user.username] = user;

	//session set
	req.session.user = user;

	res.send({
		success: true,
		user: user
	});
}

function logout(req, res)
{
	req.session.destroy(function(){
		res.send({
			success: true
		});
	});
	//fine.
}

function user(req, res)
{
	var user = req.session.user;

	if (!user)
	{
		res.send( {
			success:false
		});
	}
	else
	{
		res.send( {
			success:true,
			user: user
		});
	}

}