var Path = require('path');
var express = require('express');

var router = express.Router();
var apiRouter = express.Router();

var usersRouter = require('./usersRouter');
var projectsRouter = require('./projectsRouter');
var resourcesRouter = require('./resourcesRouter');

var sass = require('node-sass-endpoint');
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
  'jquery',
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


// browserify.settings({ external: ['angular', 'jquery'] });
browserify.settings({
  ignoreMissing: true,
  external: [
    'jquery',
    'angular',
  ],
  noParse: [
    'jquery',
    'angular',
  ]
});

// Serve application js files
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));
// Serve Angular and Angular modules
router.get('/js/angular.js', browserify(sharedAngular));
// Serve Foundation
router.get('/js/foundation.js', (req, res) => res.sendFile(Path.resolve('./node_modules/foundation-apps/dist/js/foundation-apps.js')));
// Serve Foundation Templates
router.get('/js/foundation-templates.js', (req, res) => res.sendFile(Path.resolve('./node_modules/foundation-apps/dist/js/foundation-apps-templates.js')));
// Serve Angular work around for Foundation
router.get('/js/index.js', browserify('./client/index.js'));
// router.get('/js/index.js', browserify(sharedIndex));
//vex sucks so we have to serve it manually 
router.get('/js/vex.js', function (req, res) {
  res.sendFile(Path.resolve('./node_modules/vextab/releases/vextab-div.js'));
});
// Serve nzTour
router.get('/js/nztour.js', (req, res) => res.sendFile(Path.resolve('./node_modules/nz-tour/dist/nz-tour.min.js')));
router.get('/css/nztour.css', (req, res) => res.sendFile(Path.resolve('./node_modules/nz-tour/dist/nz-tour.min.css')));

// Alertify
router.get('/js/alertify.js', (req, res) => res.sendFile(Path.resolve('./node_modules/alertify.js/dist/js/alertify.js')));
router.get('/css/alertify.css', (req, res) => res.sendFile(Path.resolve('./node_modules/alertify.js/dist//css/alertify.css')));
// router.get('/css/alertify.default.css', (req, res) => res.sendFile(Path.resolve('./node_modules/alertify/themes/alertify.default.css')));


router.get('/css/main.css', sass.serve('./client/style.scss'));

// Catch-all router, this must be the last route
// Basically, if we get to this point, serve our Angular app and let Angular deal with routing
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router;
