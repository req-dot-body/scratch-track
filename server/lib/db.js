var bPromise = require('bluebird');
// Read configuration file
var config = require('../knexfile.js');
// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
var db = require('knex')(config[env]);

module.exports = db;