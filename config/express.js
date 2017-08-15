var config = require('./config'),
  express = require('express'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  compress = require('compress'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  flash = require('connect-flash'),
  passport = require('passport'),
  http = require('http'),
  cookieParser = require('cookie-parser'),
  csrfProtection = require('csurf')({cookie:true});

module.exports = function(db) {
  var app = express();
  var server = http.createServer(app);

  // helmet sets http headers for security.
  app.use(helmet());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    //app.use(compress());
    app.use(morgan('dev')); // For now.
  }

  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb',
  }));
  app.use(cookieParser());

  app.use(bodyParser.json({
    limit: '10mb'
  }));
  app.use(methodOverride());

  var mongoStore = new MongoStore({
    mongooseConnection: db,
    ttl: 60 * 15, // 15 minutes
  });

  app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: config.sessionSecret,
    store: mongoStore,
    unset: 'destroy',
    cookie: {
      secure:  config.secure,
      httpOnly: true,
      domain: config.domain,
    }
  }));

  app.set('views', './app/views');
  app.set('view engine', 'pug');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/user.server.routes.js')(app);

  app.use(csrfProtection);
  app.use(function(req, res, next) {
    var token=req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    next();
  });

  // require all routes.

  app.use(express.static('./public'));

  return server;
};
