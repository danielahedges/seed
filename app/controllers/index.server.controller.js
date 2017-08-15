exports.render = function(req, res) {
	res.render('index', {
		title: 'MyApp',
		username: req.user ? req.user.username : null,
    user: req.user ? JSON.stringify(req.user) : null,
    admin: req.user && req.user.role === 'Admin',
	});
};
