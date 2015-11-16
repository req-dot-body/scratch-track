var db = require('../lib/db');

var Lyrics = {};

//finds one lyrics entry 
//checks that it belongs to a user
Lyrics.findById = function(id, userId){
	return db.table('projects')
	.innerJoin('lyrics', 'projects.id', '=', 'lyrics.project_id')
	.then(function(rows){
		var lyrics = rows[0]
		if (lyrics.owner_id !== userId) throw 401;
		console.log('huh?', lyrics)
		return lyrics;
	})
	.catch(function(err){
		throw err;
	})
}

//finds all lyrics for a project
Lyrics.findByProject = function(projectId, userId){
	return Lyrics.authByProject(projectId, userId)
	.then(function(){
		return db('lyrics').select('*').where({project_id: projectId})
			.then(function(lyrics){
				return lyrics;
			})
			.catch(function(err){
				throw err;
			})
	})
	.catch(function(err){
		throw err; 
	})
}

//creates a new lyrics entry
Lyrics.create = function(attrs, userId){
	return Lyrics.authByProject(attrs.project_id, userId)
	.then(function(){
		return db('lyrics').insert(attrs).returning('id')
			.then(function(rows){
				var newLyrics = attrs;
				newLyrics.id = rows[0];
				return newLyrics; 
			})
			.catch(function(err){
				throw err;
			})
	})
	.catch(function(err){
		throw err;
	})
}

Lyrics.authByProject = function(projectId, userId){
	return db('projects').select('*').where({id: projectId})
	.then(function(rows){
		var project = rows[0]
		if (project.owner_id !== userId) throw 401;
	})
}

module.exports = Lyrics; 