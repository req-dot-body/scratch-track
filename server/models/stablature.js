var db = require('../lib/db');

var Stablature = {};

//finds one stab 
Stablature.findById = function(id){
	return db('stablature').select('*').where({id: id}).limit(1)
		.then(function(rows){
			var stab = rows[0];
			if (!stab) return 404;
			return stab; 
		})
		.catch(function(err){
			throw err;
		})
}

//finds all stabs for a project and executes a callback
Stablature.findByProject = function(project_id){
	return db('stablature').select('*').where({project_id: project_id})
		.then(function(stabs){
			return stabs; 
		})
		.catch(function(err){
			throw err;
		})
}

//creates a new stab
Stablature.create = function(attrs){
	return db('stablature').insert(attrs).returning('id')
		.then(function(rows){
			var newStab = {
				id: rows[0],
				project_id: attrs.project_id,
				code: attrs.code,
				created_at: attrs.created_at,
				name: attrs.name,
				description: attrs.description
			};
			return newStab; 
		})
}

module.exports = Stablature; 