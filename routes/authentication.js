module.exports = function(app){
	app.post('/signup', signup);
	app.post('/logout', logout);
	app.get('/user', user);
	app.get('/login', login);
};

//high tech database
var db = {};

function login(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	if (!db[user.username]) {
		res.send({
			success: false,
			err: "No user found"
		}); 
	}

	if (user.password != db[user.password]) {
		res.send({
			success: false, 
			err: "The credentials you entered were incorrect"
		})
		return;
	}
	//session set
	req.session.user = user;

	res.send({
		success: true,
		user: user
	});
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