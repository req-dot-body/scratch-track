var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Serialize a user
passport.serializeUser(function (user, done) {
  console.log('passport serializeUser:', user);
  done(null, { id: user.id, email: user.email }); // TOOD see what we should pass
});

// Deserialize a user
passport.deserializeUser(function (user, done) {
  console.log('passport deserializeUser:', user);
  User.findByUsername(user, function (err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy(
  // passReqToCallback passes req.body to the callback function below
  // We want to pass req.body so that we can get the additional fields at sign up, such as first name, last name
  { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
  function (req, username, password, done) {
    var firstName = req.body.first; // TODO : figure out the actual key name
    var lastName = req.body.last; // TODO : figure out the actual key name
    process.nextTick(function () {
      // Try to find the user first to check if they already have signed up
      User.findByEmail(username, function (err, user) {
        // Error looking up the user
        if (err) {
          return done(err);
        }
        // User already exists, we dont want to sign up
        if (user) {
          return done(null, false, { message: 'User already exists' });
        }
        // User doesnt exist, lets create a new one
        // Hash the users supplied password
        User.generateHash(password)
        .then(function (passHash) {
          // Return a promise of the user sign up
          return User.signUp({
            email: username,
            password: passHash,
            first: firstName,
            last: lastName
          });
        })
        // User successfully signed up
        .then(function (newUser) {
          console.log('User signed up successfully');
          return done(null, newUser, { message: 'Successfully signed up' });
        })
        // There was some error signing up
        .catch(function (err) {
          console.log('Error signing up:', err);
          return done(null, false, { message: 'Error signing up'});
        });
      });
    });
  }
));

passport.use('local-login', new LocalStrategy(
  // TODO : change these to the actual names in the json object being sent
  { usernameField: 'username', passwordField: 'password'},
  function (username, enteredPassword, done) {
    User.findByEmail(username, function (err, user) {
      console.log('local login 2');
      if (err) {
        console.log('local login 3 error:', err);
        return done(err);
      }
      if (!user) {
        console.log('local login 4 error:', err);
        return done(null, false, { message: 'Incorrect user details' }); // Incorrect username
      }
      User.validPassword(enteredPassword, user.password)
      .then(function(isValid) {
        console.log('local login 6');
        if (!isValid) {
          console.log('local login 7 error:', isValid);
          return done(null, false, { message: 'Incorrect user details' }); // Incorrect password
        }
        console.log('local login 8');
        return done(null, user, { message: 'Successfully signed in' });
      });
    });
  }
));
