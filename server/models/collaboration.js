var db = require('./lib/db');

var Collaboration = {};

// finds by id and then calls the callback
Collaboration.findById = function(id, cb) {
  return db('collaboration').select('*').where({id: id}).limit(1)
    .then(function(rows) {
      if (!rows.length) return;
      if (!cb) return rows[0];
      return cb(null, rows[0]);
    })
    .catch(function(err) {
      throw err;
    });
};

// returns all collaborations for a user and calls a callback
Collaboration.findByUser = function (user_id, cb) {
  return db('collaborations').select('*').where({user_id: user_id})
    .then(function(rows){
      if (!rows.length) return;
      if (!cb) return rows;
      return cb(null, rows);
    })
    .catch(function(err)){
      throw err;
    })
};

//returns all collaborations for a project and calls a callback
Collaboration.findByProject = function(project_id, cb) {
	return db('collaborations').select('*').where({project_id: project_id})
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows;
			return cb(null, rows);
		})
		.catch(function(err){
			throw err;
		})
}

// creates a new collab
Collaboration.create = function (attrs) {
  return db('collaborations').insert(attrs).returning('id')
    .then(function(rows) {
      var newCollaboration = {
        id: rows[0],
        user_id: user_id,
        project_id: project_id
      };
      return newCollaboration;
    });
};

module.exports = Collaboration;