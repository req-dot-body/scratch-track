require('dotenv').load();

var express = require('express');
var session = require('express-session');
var KnexStore = require('connect-session-knex')(session);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var aws = require('aws-sdk');

var passport = require('passport');
require('./lib/passport');

var uuid = require('node-uuid');
var Path = require('path');

var db = require('./lib/db');

var router = require('./routes/mainRouter');

if(process.env.NODE_ENV !== 'test') {
  checkConfiguration();

  // Set up AWS to use our authorization keys
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Set the region in which our S3 bucket is located
  aws.config.region = process.env.AWS_REGION;

  // Create and run a server
  var app = express();

  app.set('json spaces', 4);

  // Use morgan to log requests to our express server to the console
  app.use(morgan('dev'));

  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Parse incoming cookies
  app.use(cookieParser());

  // Attach db to each req for quick access to our db instance
  app.use(function (req, res, next) {
    req.db = db;
    next();
  });

  // Set up sessions for use within our appliation
  app.use(session({
    name: 'reqdotbody',
    secret: 'Beyond being proficient at relatively simple learning tasks, horses are recognised as having the capacity to solve advanced cognitive challenges involving categorisation learning and a degree of concept formation.',
    resave: false, // Whether or not to save the session back to the store if no modification happened
    rolling: true, // Resets expiry date after each request
    saveUninitialized: false, // Save new sessions that havent been modified
    store: new KnexStore({ knex: db }), // Use our database to store sessions
    genid: function() { // Each session id will be based on uuid v4
      return uuid.v4();
    }
  }));

  // Set up passport so that we can use it to test authentication status
  // As well as use it for authentication
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

// Checks to make sure we have the needed config variables set
function checkConfiguration() {
  if (process.env.AWS_BUCKET.length < 1) {
    throw Error('Check your .env file for variable: AWS_BUCKET');
  } else if (process.env.AWS_REGION.length < 1) {
    throw Error('Check your .env file for variable: AWS_REGION');
  } else if (process.env.AWS_ACCESS_KEY_ID.length < 1) {
    throw Error('Check your .env file for variable: AWS_ACCESS_KEY_ID');
  } else if (process.env.AWS_SECRET_ACCESS_KEY.length < 1) {
    throw Error('Check your .env file for variable: AWS_SECRET_ACCESS_KEY');
  }
}
