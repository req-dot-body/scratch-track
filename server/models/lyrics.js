var db = require('../lib/db');

var Lyrics = {};

//finds one lyrics entry 
//checks that it belongs to a user
Lyrics.findById = function(id, email){
	return db('lyrics').select('*').where({id: id}).limit(1)
		.then(function(rows){
			var lyricsEntry = rows[0]
			if (!lyricsEntry) return 404;

			return db('projects').select('*').where({email: email})
			.then(function(rows){
				var project = rows[0]

				return db('users').select('*').where({id: project.owner_id})
				.then(function(rows){
					var user = rows[0]
					if (user.email !== email) return 401
					return lyrics 
				})  
			})
			.catch(function(err){
				throw err;
			})
			
		})
		.catch(function(err){
			throw err;
		})
}

//finds all lyrics for a project
Lyrics.findByProject = function(project_id){
	return db('lyrics').select('*').where({project_id: project_id})
		.then(function(lyrics){
			return lyrics;
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