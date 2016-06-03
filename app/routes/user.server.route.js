var users = require('../../app/controllers/user.server.controller.js');

module.exports = function(app) {
	app.post('/users', users.create);
	app.get('/users', users.list);
	app.get('/users/:userId', users.read);
	app.put('/users/:userId', users.update);
	app.del('/users/:userId', users.delete);

	app.param('userId', users.userByID);
};
