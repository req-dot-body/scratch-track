var db = require('../lib/db');

var Recording = {};

//finds one recording and executes a callback
Recording.findById = function(id, cb){
	return db('recordings').select('*').where({id: id}).limit(1)
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows[0];
			return cb(null, rows[0]);
		})
		.catch(function(err){
			throw err;
		})
}

//finds all recordings for a project and executes a callback
Recording.findByProject = function(project_id, cb){
	return db('recordings').select('*').where({project_id: project_id})
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows;
			return cb(null, rows);
		})
		.catch(function(err){
			throw err;
		})
}

//creates a new recording
Recording.create = function(attrs){
	return db('recordings').insert(attrs).returning('id')
		.then(function(rows){
			var newRecording = {
				id: rows[0],
				project_id: attrs.project_id,
				url: attrs.url,
				created_at: attrs.created_at,
				name: attrs.name,
				description: attrs.description
			};
			return newRecording; 
		})
}

module.exports = Recording; 