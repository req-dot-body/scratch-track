var Path = require('path');
var express = require('express');
var router = express.Router();
var apiRouter = express.Router();

var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');

var userRouter = require('./usersRouter');

var assetFolder = Path.resolve(__dirname, '../../client/');
// router.use(express.static(assetFolder));

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
apiRouter.use('/users', userRouter);
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));
router.get('/js/angular.js', browserify(sharedAngular));
router.get('/js/jquery.js',browserify('./node_modules/jquery/dist/jquery.js'));
// router.get('/js/materialize.js',browserify('./node_modules/materialize-css/dist/js/materialize.js'));

// Catch-all router, this must be the last route
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router;
