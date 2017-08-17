var passport = require('passport'),
  mongoose = require('mongoose');

module.exports = function() {
  require('./strategies/local.js')();
  require('./strategies/facebook.js')();
  require('./strategies/twitter.js')();
  require('./strategies/google.js')();
}
