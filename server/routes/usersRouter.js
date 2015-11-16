var express = require('express');
var router = express.Router();
var passport = require('passport');

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
router.post('/signup', function (req, res, next) {
  // TODO : create a new user and sign them in
  console.log('Signup');
  passport.authenticate('local-signup', function (err, user, info) {
    console.log('here1')
    if (err) {
      console.log('here2')
      // TODO : Authenticate user and create a session
      res.status(200).json({ signedUp: false, error: err, info: info });
      return;
    }
    if (!user) {
      console.log('here3')
      // TODO : Authenticate user and create a session
      res.status(200).json({ signedUp: false, info: info });
      return;
    }
    console.log('here4')
    res.status(200).json({ signedUp: true });
  })(req, res, next);
  // res.json({'success':true,'body':req.body});
});

// Authenticates a user
router.post('/signin', function (req, res, next) {
  // TODO : Authenticate user and create a session
  console.log('Signin');
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      // TODO : change status code to something meaningful
      res.status(200).json({ loggedIn: false, error: true, info: info });
      return;
    }
    if (!user) {
      // TODO : change status code to something meaningful
      res.status(200).json({ loggedIn: false, error: true, info: info });
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        // TODO : change status code to something meaningful
        return res.status(200).json({ loggedIn: false, error: true, info: info });
      }
      res.cookie('isLoggedIn', true);
      res.json({ loggedIn: true });
    });
  })(req, res, next);
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
