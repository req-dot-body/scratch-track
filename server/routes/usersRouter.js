var express = require('express');
var router = express.Router();

// This wont be here eventually
// Get all users (for testing)
router.get('/', function (req, res) {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') { // Just in case we accidentally forget to remove this handler
    res.status(404).end();
    return;
  }
  res.json({'success':true});
});

// Creates new user
router.post('/signup', function (req, res) {
  // TODO : create a new user and sign them in
  res.json({'success':true});
});

// Authenticates a user
router.post('/signin', function (req, res) {
  // TODO : Authenticate user and create a session
  res.json({'success':true});
});

// Signs a user out, have it as a post so that people cant be tricked into going to the link
router.post('/signout', function (req, res) {
  res.json({'success':true});
});

// Get user info by id
router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

// Update user info by id
router.put('/:userId', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

// Get all projects for a user
router.get('/:userId/projects', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

// Get all collaborations for a user
router.get('/:userId/collaborations', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

module.exports = router;
