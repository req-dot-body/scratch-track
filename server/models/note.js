var db = require('../lib/db');
var Note = {};

//finds a note 
Note.findById = function(id){
	return db('notes').select('*').where({id: id}).limit(1)
		.then(function(rows){
			var note = rows[0];
			if (!note) return 404;
			return note;
		})
		.catch(function(err){
			throw err;
		})
}

//finds all notes for a project
Note.findByProject = function(project_id){
	return db('notes').select('*').where({project_id: project_id})
		.then(function(notes){
			return notes; 
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

module.exports = Note; 