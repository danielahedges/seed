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
});

UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

UserSchema.plugin(passportLocalMongoose);

// Add the UserSchema object to mongoose under the name 'User'
mongoose.model('User', UserSchema);
