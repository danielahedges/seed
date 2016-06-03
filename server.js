// default to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose'),
	config = require('./config/config');

var db = mongoose.connect(config.db);

var express = require('./config/express');
var app = express();
app.listen(3000);
console.log('Server listening on port 3000');
