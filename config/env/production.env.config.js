module.exports = function(url) {
  return {
    // Production only configurations
    name: 'prod',
    db: process.env.MONGO_CONNECT_STRING,
    sessionSecret: process.env.SESSION_SECRET,
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID || 'get_from_developers.facebook.com',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'get_from_developers.facebook.com',
      callbackURL: '/oauth/facebook/callback',
    },
    twitter: {
      clientID: process.env.TWITTER_CLIENT_ID || 'get_from_dev.twitter.com',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || 'get_from_dev.twitter.com',
      callbackURL: '/oauth/twitter/callback',
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || 'get_from_console.developers.google.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'get_from_console.developers.google.com',
      callbackURL: '/oauth/google/callback',
    },
  };
};
