
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var slashes = require('connect-slashes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(slashes(false));
app.use(express.cookieParser());
app.use(express.session({ secret: '0nm2qf4'}));
app.use(express.methodOverride());
/**
 * Middleware to provide explicit locals passed to the render by the route handler.
 * Of course, if there is no session, then these locals are undefined.
 * These locals are used to show the user's credentials whenever he's logged in.
 */
app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Error-handling middleware
app.use(function(req, res, next){
	res.status(404);
	// respond with html page
	if (req.accepts('html'))
		res.render('errorpage', { error: "404", message: "Page not found." });
});

// Homepage
require('./routes/index')(app);
// All functionality to login a registered user
require('./routes/user/login')(app);
// Functionality to register a new user
require('./routes/user/register')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
