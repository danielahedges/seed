// exports only the environment-specific config.
var url=process.env.APP_URL || 'http://localhost:6005';
module.exports = require('./env/'+process.env.NODE_ENV+'.env.config.js')(url);
