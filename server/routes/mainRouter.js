var Path = require('path');
var express = require('express');

var router = express.Router();
var apiRouter = express.Router();
var userRouter = require('./usersRouter');

var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');

var usersRouter = require('./usersRouter');
var projectsRouter = require('./projectsRouter');
var recordingsRouter = require('./recordingsRouter');
var lyricsRouter = require('./lyricsRouter');
var stablatureRouter = require('./stablatureRouter');

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
  './node_modules/angular-materialize/src/angular-materialize',
];

router.use('/api', apiRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/recordings', recordingsRouter);
apiRouter.use('/lyrics', lyricsRouter);
apiRouter.use('/stablature', stablatureRouter);
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));
router.get('/js/angular.js', browserify(sharedAngular));
// Catch-all router, this must be the last route
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router;
