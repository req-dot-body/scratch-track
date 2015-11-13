var db = require('./lib/db');
var Note = {};

//finds a note and executes a callback
Note.findById = function(id, cb){
	return db('notes').select('*').where({id: id}).limit(1)
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows[0];
			return cb(null, rows[0]);
		})
		.catch(function(err){
			throw err;
		})
}

//finds all notes for a project and executes a callback
Note.findByProject = function(project_id, cb){
	return db('notes').select('*').where({project_id: project_id})
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows;
			return cb(null, rows);
		})
		.catch(function(err){
			throw err;
		})
}

//creates a new note
Note.create = function(attrs){
	return db('notes').insert(attrs).returning('id')
		.then(function(rows){
			var newNote = {
				id: rows[0],
				project_id: attrs.project_id,
				text: attrs.text,
				created_at: attrs.created_at,
				name: attrs.name
			};
			return newNote; 
		})
}

module.exports = Notes; 