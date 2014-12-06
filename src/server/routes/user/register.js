var database = require('../../database/Database');
var gravatar = require('nodejs-gravatar');

module.exports = function(app){

	/**
	 * Returns page to register a new user
	 */
	app.get('/user/register', function(req, res) {
		res.render('user/register');
	});

	/**
	 * Register a new user
	 */
	app.post('/user/register', function(req, res) {
		var firstName = req.body.firstname;
		var lastName = req.body.lastname;
		var email = req.body.register_email;
		var password = req.body.register_password;

		var defltAvatar = "http://uekk88933beb.evgeni.koding.io/user.png";
		var grava = gravatar.imageUrl(email, {s: 40, d: defltAvatar});

		database.insertUser(firstName, lastName, email, password, function() {
			database.loginUser(email, password, function(userID) {
				// IMPORTZNT: The user entity should be of the following form:
				// var user = {
				// 	"userID"	: userID,
				// 	"firstName"	: firstName,
				// 	"lastName"	: lastName,
				// 	"email"		: email,
				// 	"avatarUrl"	: grava
				// };
				req.session.user = user;
				res.redirect('/');
			});
		});
	});
};