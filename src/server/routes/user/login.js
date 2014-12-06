var database = require('../../database/Database');
var gravatar = require('nodejs-gravatar');

module.exports = function(app){

	/**
	 * Returns page for logging in registered users.
	 */
	app.get('/user/login', function(req, res) {
		res.render('user/login');
	});

	/**
	 * Log in a registered user.
	 */
	app.post('/user/login', function(req, res) {
		var email = req.body.login_email;
		var password = req.body.login_password;

		var defltAvatar = "http://uekk88933beb.evgeni.koding.io/user.png";
		var grava = gravatar.imageUrl(email, {s: 40, d: defltAvatar});

		// Get the user entity
		database.loginUser(email, password, function(userEntity) {
			// IMPORTZNT: The user entity should be of the following form:
			// var user = {
			// 	"userID"	: userID,
			// 	"firstName"	: firstName,
			// 	"lastName"	: lastName,
			// 	"email"		: email,
			// 	"avatarUrl"	: grava
			// };
			req.session.user = userEntity;

			// Does the user come from a page?
			// Meaning, is the user redirected to login, or has he just clicked button 'Login'?
			// In the first case, he has to be redirected back to the original page.
			// Pages that require authentication, store he path in req.session.redirect_to before redirecting to login.
			var redirect_to = req.session.redirect_to ? req.session.redirect_to : '/';
			delete req.session.redirect_to;
			// Is authenticated ?
			res.redirect(redirect_to);
		});
	});

	/**
	 * Log out the user.
	 */
	app.get('/user/logout', function(req, res) {
		if (req.session.user)
			req.session.destroy();
		res.redirect('/');
	});	
};