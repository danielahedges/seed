var User = require('mongoose').model('User');
var passport = require('passport');
var tools = require('../utils/tools.server');
var zxcvbn = require('zxcvbn');

// Routines for signing in and out:

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Login',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (req.user) {
		return res.redirect('/');
	} else {
		res.render('signup', {
			title: 'Sign Up',
			messgaes: req.flash('error') || req.flash('info'),
		});
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		User.register(user, req.body.password, function(err, user) {
			if (err) {
				var message = tools.getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			} else {
				passport.authenticate('local')(req, res, function() {
					// Authentication succeeded after signup. Go to main page.
					res.redirect('/');
				});
			}
		});
	} else {
		next (new Error('Cannot sign up when already logged in'));
	}
};

exports.signout = function(req, res, next) {
	req.logout();
	res.redirect('/');
};

exports.checkPasswordStrength = function(req, res) {
	let result, password = req.body.password;
	if (password == null) {
		return res.status(400).send({message: 'missing parameter'});
	}
	result = zxcvbn(password);
	return res.json({
		score: result.score,
		feedback: result.feedback,
	});
};

exports.changePassword = function(req, res) {
	let currentPassword = req.body.currentPassword;
	if (!currentPassword) {
		return res.status(400).send({message: 'missing parameter'});
	}
	req.user.authenticate(currentPassword, function(err, user) {
		if (err || !user) {
			return res.status(401).send({message: 'Not authorized'});
		}
		var password = req.body.password;
		var scoreResult = zxcvbn(password);
		if (scoreResult.score < 3) {
			return res.status(400).send({message: 'Password too weak'});
		}
		req.user.setPassword(password, function(err, user) {
			if (err) {
				return res.status(400).send({message: tools.getErrorMessage(err)});
			} else {
				return res.status(204).send();	// Success, no data.
			}
		});
	});
};

// Middleware for authentication states

/*
 Ordinary operations require a login. Also, the user cannot be locked out (meaning
the account cannot be accessed at all) nor be provisional (meaning the password
must be changed, and nothing else can be done until it is).
 */
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated() || req.user.lockedOut || req.user.provisional) {
    return res.status(401).send({
      message: 'User is not logged in',
    });
  }
  next();
};

// A provisional login is either logged in, or only provisioally
// logged in if the password needs to be changed first.
exports.requiresProvisionalLogin = function(req, res, next) {
  if (!req.isAuthenticated() || req.user.lockedOut) {
    return res.status(401).send({
      message: 'User is not logged in',
    });
  }
  next();
};

exports.partialRedirectOnProvisional = function(req, res, next) {
  if (req.isAuthenticated && req.user.provisional) {
    return res.render('changePassword', {
      messages: ['INDEX.YOU_MUST_CHANGE_PASSWORD'],
    });
  }
  next();
};

exports.requiresAdmin = function(req, res, next) {
	if (!req.user || req.user.role !== 'Admin') {
		return res.status(403).send({
			message: 'User is not authorized',
		});
	}
	next();
};
