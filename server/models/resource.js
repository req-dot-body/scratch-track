var db = require('../lib/db');

var Resource = {};

//finds one resource 
//checks that it belongs to a user
Resource.findById = function(resource, resourceId, userId){
	return db.table('projects')
	.innerJoin(resource, 'projects.id', '=', resource+'.project_id')
	.where('projects.owner_id', '=', userId)
	.andWhere(resource + '.id', '=', resourceId)
	.then(function(rows){
		var resourceInfo = rows[0]
		return resourceInfo;
	})
	.catch(function(err){
		throw err;
	})
}

//finds all resources for a project
Resource.findByProject = function(resource, projectId, userId){
	return Resource.authByProject(projectId, userId)
	.then(function(){
		return db(resource).select('*').where({project_id: projectId})
			.then(function(resource){
				return resource;
			})
			.catch(function(err){
				throw err;
			})
	})
	.catch(function(err){
		throw err; 
	})
}

//creates a new resource entry
Resource.create = function(resource, attrs, userId){
	return Resource.authByProject(resource, attrs.project_id, userId)
	.then(function(){
		return db(resource).insert(attrs).returning('id')
			.then(function(rows){
				var newResource = attrs;
				newResource.id = rows[0];
				return newResource; 
			})
			.catch(function(err){
				throw err;
			})
	})
	.catch(function(err){
		throw err;
	})
}

//updates a resource entry 
Resource.update = function(resource, attrs, resourceId, userId){
	//checks that the resource belongs to the authed user
	return db.table('projects')
	.innerJoin(resource, 'projects.id', '=', resource+'.project_id')
	.where('projects.owner_id', '=', userId)
	.andWhere(resource + '.id', '=', resourceId)
	.then(function(){
		//updates information
		return db(resource).where('id', '=', resourceId)
		.update(attrs).returning('*')
		.then(function(rows){
			return rows[0];
		})
		.catch(function(err){
			throw err;
		})
	})
	.catch(function(err){
		throw err;
	})
}

//checks that a project id matches a user id
Resource.authByProject = function(resource, projectId, userId){
	return db('projects').select('*').where({id: projectId})
	.then(function(rows){
		var project = rows[0];
		if (project.owner_id !== userId) throw 401;
	})
}

module.exports = Resource; 