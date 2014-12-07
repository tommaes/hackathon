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
		var username = req.body.username;
		var lastName = req.body.lastname;
		var email = req.body.register_email;
		var password = req.body.register_password;

		var defltAvatar = "http://evgeni.koding.io:3000/images/user.png";
		var grava = gravatar.imageUrl(email, {s: 40, d: defltAvatar});

		//   firstName, lastName, email, password,
		database.createUser(username, password, email, hero, type, function() {
			database.loginUser(email, password, function(userEntity) {
				req.session.user = userEntity;
				res.redirect('/');
			});
		});
	});

	/*
	 * Check if email already in use to prevent duplication
	 */
	app.post('/user/validate/register_email', function(req, res) {
		var email = req.body.register_email;
		var result;
		// In JavaScript, the following values are falsy
		// The following values are always FALSE:
		// - false.
		// - 0 (zero)
		// - "" (empty string)
		// - null.
		// - undefined.
		// - NaN (a special Number value meaning Not-a-Number!)
		database.checkEmailExists(email, function(dataEntry) {
			if (dataEntry)
				result = "This e-mail is already in use";
			else
				result = "true";
			res.json(result);
		});
	});

	/*
	 * Check if userName already in use to prevent duplication
	 */
	app.post('/user/validate/register_username', function(req, res) {
		var email = req.body.register_username;
		var result;
		// In JavaScript, the following values are falsy
		// The following values are always FALSE:
		// - false.
		// - 0 (zero)
		// - "" (empty string)
		// - null.
		// - undefined.
		// - NaN (a special Number value meaning Not-a-Number!)
		database.checkUserNameExists(email, function(dataEntry) {
			if (dataEntry)
				result = "This UserName is already in use";
			else
				result = "true";
			res.json(result);
		});
	});
};