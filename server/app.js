require('dotenv');

var express = require('express');
var session = require('express-session');
var KnexStore = require('connect-session-knex')(session);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');

var uuid = require('node-uuid');
var Path = require('path');

var db = require('./lib/db');

var router = require('./routes/mainRouter');

if(process.env.NODE_ENV !== 'test') {

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  app.use(morgan('dev'));

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Parse incoming cookies
  app.use(cookieParser());

  app.use(session({
    secret: 'Beyond being proficient at relatively simple learning tasks, horses are recognised as having the capacity to solve advanced cognitive challenges involving categorisation learning and a degree of concept formation.',
    resave: false, // Whether or not to save the session back to the store if no modification happened
    rolling: true, // Resets expiry date after each request
    saveUninitialized: false, // Save new sessions that havent been modified
    store: new KnexStore({ knex: db }),
    genid: function() {
      return uuid.v4();
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Mount our main router
  app.use('/', router);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port, function() {
    console.log('Listening on port %d in mode %s', port, app.get('env'));
  });
} else {
  // We're in test mode; make this file importable instead.
  module.exports = router;
}
