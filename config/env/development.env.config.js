module.exports = {
  name: 'dev',
  db: 'mongodb://localhost/seed',
  sessionSecret: 'palestColtBeseechedSipper',
  facebook: {
    clientID: 'get_from_developers.facebook.com',
    clientSecret: 'get_from_developers.facebook.com',
    callbackURL: 'http://localhost:6005/oauth/facebook/callback',
  },
};
