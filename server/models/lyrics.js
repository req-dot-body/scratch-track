var db = require('path'); 

var Lyrics = {};

//finds one lyrics entry and executes a callback
Lyrics.findById = function(id, cb){
	return db('lyrics').select('*').where({id: id}).limit(1)
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows[0];
			return cb(null, rows[0]);
		})
		.catch(function(err){
			throw err;
		})
}

//finds all lyrics for a project and executes a callback
Lyrics.findByProject = function(project_id, cb){
	return db('lyrics').select('*').where({project_id: project_id})
		.then(function(rows){
			if (!rows.length) return;
			if (!cb) return rows;
			return cb(null, rows);
		})
		.catch(function(err){
			throw err;
		})
}

//creates a new lyrics entry
Lyrics.create = function(attrs){
	return db('lyrics').insert(attrs).returning('id')
		.then(function(rows){
			var newLyrics = {
				id: rows[0],
				project_id: attrs.project_id,
				text: attrs.text,
				created_at: attrs.created_at,
				name: attrs.name
			};
			return newLyrics; 
		})
}

module.exports = Lyrics; 