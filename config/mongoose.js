var config = require('./config'),
  mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

var requireModels = function() {
  require('../app/models'); // imports entire models directory (app/models/index.js)
};

module.exports = function(cb) {
  var dbDriverOptions = config.dbDriverOptions;
  if (dbDriverOptions == null) {
    // If no dbDriverOptions are specified, then assume useMongoClient to be true.
    // Mongose's default connection logic is deprecated as of Mongoose 4.11.0.
    dbDriverOptions = {
      useMongoClient: true,
    };
  }
  if (config.db) {
    mongoose.connect(config.db, dbDriverOptions).then(
      ()=>{
        requireModels();
        cb(mongoose.connection);
      }, (error)=>{
        console.log('got error '+JSON.stringify(error));
        cb(null);
      }
    );
  } else {
    throw 'no config db found';
  }
};
