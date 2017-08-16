var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		index: true,
	},
	role: {
		type: String,
		enum: ['Admin', 'Owner', 'User']
	},
	created: {
		type: Date,
		default: Date.now
	},
	lockedOut: {
    type: Boolean,
    default: false,
  },
  provisional: {
    type: Boolean,
    default: false,
  },
  provider: {
		type: String,
		// Validate 'provider' value existence
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
});

UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

UserSchema.plugin(passportLocalMongoose);

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

// Add the UserSchema object to mongoose under the name 'User'
mongoose.model('User', UserSchema);
