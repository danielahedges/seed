var express = require('express'),
  morgan = require('morgan'),
	json = require('express-json'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compression = require('compression'),
	expressSession = require('express-session'),
	config = require('./config');

module.exports = function() {
	var app = express();

	require('../app/models/user.server.model.js');

	if (config.name==='dev') {
		app.use(morgan('dev', {}));
		app.use(json());
		app.use(bodyParser.urlencoded());
		app.use(cookieParser());

		app.use(expressSession({
			secret: config.sessionSecret
		}));

		app.set('views', __dirname + '/../app/views');
		app.set('view engine', config.viewEngine);
	} else if (config.name==='prod') {
		app.use(compression());
	}

	require('../app/routes/index.server.route.js')(app);
	require('../app/routes/user.server.route.js')(app);

	//app.configure(function() {
		app.use(express.static(__dirname + '/../public'));
	//});

	return app;
};
