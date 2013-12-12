module.exports = function(app){
	app.post('/signup', signup);
	app.post('/logout', logout);
	app.get('/user', user);
};
var db = {};
function signup(req, res) {
	var user = {
		username: req.body.username,
		password: req.body.pass,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email_address: req.body.email
	};
	if (db[user.username]) {
		res.send({
			success: false,
			err: "username taken"
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