var Path = require('path');
var express = require('express');

var router = express.Router();
var apiRouter = express.Router();

var usersRouter = require('./usersRouter');
var projectsRouter = require('./projectsRouter');
var recordingsRouter = require('./recordingsRouter');
var lyricsRouter = require('./lyricsRouter');
var stablaturesRouter = require('./stablatureRouter');
var notesRouter = require('./notesRouter');

var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');

var assetFolder = Path.resolve(__dirname, '../../client/');
router.use(express.static(assetFolder));

var sharedAngular = [
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-mocks',
  'angular-messages',
  'angular-resource',
  'angular-sanitize',
  'angular-touch',
  'angular-ui-router',
  'angular-ui-router-anim-in-out',
  './node_modules/angular-materialize/src/angular-materialize',
];

// Middleware that checks if logged in and sets cookie to true
// Used so that Angular can check for this cookies existence to see if logged in or not
router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.cookie('isLoggedIn', true);
  }
  next();
});

// Set up routing for our api
router.use('/api', apiRouter);

// Set up our different api endpoints
apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/recordings', recordingsRouter);
apiRouter.use('/lyrics', lyricsRouter);
apiRouter.use('/stablatures', stablaturesRouter);
apiRouter.use('/notes', notesRouter);

// Serve application js files
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));
// Serve Angular and Angular modules
router.get('/js/angular.js', browserify(sharedAngular));

// Catch-all router, this must be the last route
// Basically, if we get to this point, serve our Angular app and let Angular deal with routing
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router;
