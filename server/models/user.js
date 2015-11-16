var db = require('../lib/db');
var bPromise = require('bluebird');
var bcrypt = bPromise.promisifyAll(require('bcrypt-nodejs'));

var User = {};

// returns all users
User.all = function () {
  return db('users').select('*');
};

// finds a user by username and then calls the callback
User.findByEmail = function(username, cb) {
  cb = cb || function() {};
  return db('users').select('*').where({email: username}).limit(1)
    .then(function(rows) {
      if (!rows.length) {
        //return cb(true, null);
      } 
      // if (!cb) return rows[0];
      return cb(null, rows[0]);
    })
    .catch(function(err) {
      // throw err;
      return cb(err, null);
    });
};

// finds a user by id
User.findById = function (id) {
  return db('users').select('*').where({id: id}).limit(1)
  .then(function (rows) {
    if (!rows.length) {
      return;
    }
    return rows[0];
  })
  .catch(function (err) {
    throw err;
  });
};

// creates a new user with name, and hashed password
User.signUp = function (attrs) {
  console.log('User.signUp attrs:', attrs);

  // Create this object incase attrs contains any extra data we dont want/need
  var userAttrs = {
    email: attrs.email,
    password: attrs.password,
    first: attrs.first,
    last: attrs.last
  };
  return db('users').insert(userAttrs).returning('id')
    .then(function(rows) {
      var newUser = {
        id: rows[0],
        email: userAttrs.email,
        password: userAttrs.password,
        first: userAttrs.first,
        last: userAttrs.last
      };
      return newUser;
    });
};

// generates hash async
User.generateHash = function(password) {
  // Use a work factor of 12 for hashing
  return bcrypt.genSaltAsync(12)
    .then(function(salt) {
      return bcrypt.hashAsync(password, salt, null)
      .then(function (passHash) {
        console.log('Salt:', salt, 'Passhash:', passHash);
        return passHash;
      });
    });
};

// checks password async with stored password
User.validPassword = function(enteredPassword, passwordHash) {
  return bcrypt.compareAsync(enteredPassword, passwordHash);
};

module.exports = User;
