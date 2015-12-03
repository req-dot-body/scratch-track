var express = require('express');
var router = express.Router();
var passport = require('passport');

var helper = require('../helper');

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
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) {
      res.status(500).json({ signedUp: false, error: err, info: info });
      return;
    }
    if (!user) {
      res.status(401).json({ signedUp: false, info: info });
      return;
    }
    res.status(201).json({ signedUp: true });
  })(req, res, next);
});

// Authenticates a user
router.post('/signin', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log('signin err', err);
      res.status(401).json({ loggedIn: false, error: true, info: info });
      return;
    }
    if (!user) {
      console.log('signin !user');
      res.status(401).json({ loggedIn: false, error: true, info: info });
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({ loggedIn: false, error: true, info: info });
      }
      res.cookie('isLoggedIn', true);
      res.status(200).json({ loggedIn: true });
    });
  })(req, res, next);
});

// Signs a user out, have it as a post so that people cant be tricked into going to the link
router.post('/signout',  function (req, res) {
  req.logout();
  res.clearCookie('isLoggedIn');
  res.status(200).json({'success':true});
});

// Get user info by id
router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

// TODO : this currently does nothing
// Update user info by id
router.put('/:userId', helper.requireAuth, function (req, res) {
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
