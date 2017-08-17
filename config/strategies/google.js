var passport = require('passport');
var url = require('url');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var users = require('../../app/controllers/user.server.controller');

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    //passReqToCallback: true,
    accessType: 'offline',
  }, function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      username: providerData.displayName,
      provider: 'google',
      providerId: profile.id,
      providerData: providerData,
    }
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
