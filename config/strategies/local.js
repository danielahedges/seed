// Configuration for using local passport strategy.

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function() {
  // use static authenticate method of model in LocalStrategy
  passport.use(User.createStrategy());

  //use static serialize and deserialize of model for passport session support
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
