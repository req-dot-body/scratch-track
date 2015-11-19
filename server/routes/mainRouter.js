var Path = require('path');
var express = require('express');

var router = express.Router();
var apiRouter = express.Router();

var usersRouter = require('./usersRouter');
var projectsRouter = require('./projectsRouter');
var resourcesRouter = require('./resourcesRouter');

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
  } else {
    res.cookie('isLoggedIn', false);
  }
  next();
});

// Set up routing for our api
router.use('/api', apiRouter);

// Set up our different api endpoints
apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/resources', resourcesRouter);

browserify.settings({ insertGlobals: true, detectGlobals: true });
// Serve application js files
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));
//vex sucks so we have to serve it manually 
router.get('/js/vex.js', function (req, res) {
  res.sendFile(Path.resolve('./node_modules/vextab/releases/vextab-div.js'));
});
// Serve Angular and Angular modules
router.get('/js/jquery.js', browserify(['jquery']));
router.get('/js/angular.js', browserify(sharedAngular));

// Catch-all router, this must be the last route
// Basically, if we get to this point, serve our Angular app and let Angular deal with routing
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router;
