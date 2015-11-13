var users = require('../toy_data/users').users;
var projects = require('../toy_data/projects').projects;
var lyrics = require('../toy_data/lyrics').lyrics;
var recordings = require('../toy_data/recordings').recordings;
var stablature = require('../toy_data/stablature').stablature;
var notes = require('../toy_data/notes').notes;

//clears all tables and then repopulates them
//the wacky promise structure stems from making sure
//foreign ids are available when they're needed
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('notes').del(),
    knex('stablature').del(),
    knex('recordings').del(),
    knex('lyrics').del(),
    knex('projects').del(),
    knex('users').del(),

    knex('users').insert(users()),
   )
  .then(function(){
  	return knex.select('id').from('users');
  })
  .then(function(userIDs){
  	return knex('projects').insert(projects(userIDs));
  })
  .then(function(){
  	return knex.select('id').from('projects')
  })
  .then(function(projectIDs){
  	return Promise.join(
  		//inserts all data that requires a project_id
  		knex('lyrics').insert(lyrics(projectIDs)),
  		knex('recordings').insert(recordings(projectIDs)),
  		knex('stablature').insert(stablature(projectIDs)),
  		knex('notes').insert(notes(projectIDs))
  	)
  })

};