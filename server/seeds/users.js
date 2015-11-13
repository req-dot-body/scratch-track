var users = require('../toy_data/users').users;
var projects = require('../toy_data/projects').projects;
var lyrics = require('../toy_data/lyrics').lyrics;
var recordings = require('../toy_data/recordings').recordings;
var stablature = require('../toy_data/stablature').stablature;
var notes = require('../toy_data/notes').notes;

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('notes').del(),
    knex('stablature').del(),
    knex('recordings').del(),
    knex('lyrics').del(),
    knex('projects').del(),
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
    	email: 'karl_skid_marx@gmail.com',
    	password: '12383838askdfkjhadsf',
    	first: 'Karl',
    	last: 'Marx'
    }),

    knex('users').insert({
    	email: 'songwriter_omg@yahoo.com',
    	password: 'iouoiuoiuoiuoiuoi',
    	first: 'Jenny',
    	last: 'Bloodbath'
    }),

    knex('users').insert({
    	email: 'shadyp@gmail.com',
    	password: 'dhdhdh',
    	first: 'Shady Pete',
    	last: 'Johnson'
    })
  );
};
