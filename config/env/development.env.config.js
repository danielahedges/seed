module.exports = {
  name: 'dev',
  db: 'mongodb://localhost/seed',
  sessionSecret: 'palestColtBeseechedSipper',
  facebook: {
    clientID: 'get_from_developers.facebook.com',
    clientSecret: 'get_from_developers.facebook.com',
    callbackURL: 'http://localhost:6005/oauth/facebook/callback',
  },
  twitter: {
    clientID: 'get_from_dev.twitter.com',
    clientSecret: 'get_from_dev.twitter.com',
    callbackURL: 'http://localhost:6005/oauth/twitter/callback',
  },
  google: {
    clientID: 'get_from_console.developers.google.com',
    clientSecret: 'get_from_console.developers.google.com',
    callbackURL: 'http://localhost:6005/oauth/google/callback',
  },
};
