// If no environment is set, default to development.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/config');

var mongoose = require('./config/mongoose'),
  express = require('./config/express'),
  cfenv = require('cfenv');

var app = {};

var start = function(db) {
  app.express = express(db);
  var passport = require('./config/passport')();

  // get the app environment from Cloud Foundry
  var appEnv = cfenv.getAppEnv();

  // do not start listening, if this server is included for mocha testing
  if (!module.parent) {
    // start server on the specified port and binding host
    app.express.listen(appEnv.port, '0.0.0.0', function() {
      // print a message when the server starts listening
      console.log("server starting on " + appEnv.url);
    });
  }
}

mongoose(start);

module.exports = app;
