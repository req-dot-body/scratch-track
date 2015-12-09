var db = require('../lib/db');

var Resource = {};

//resource model represents Lyrics, Recordings, Stablature, and Notes

//finds one resource by id
Resource.findById = function(tableName, resourceId){
	return db.table('projects')
		.join(tableName, 'projects.id', '=', tableName+'.project_id')
		.where(tableName + '.id', '=', resourceId)
	.then(function(rows){
		var resourceInfo = rows[0]
		if (!resourceInfo) throw 404;
		return resourceInfo;
	})
}

//finds all resources for a project
Resource.findByProject = function(tableName, ids, isPrivate){
	//finds the project in question
	return db('projects').select('*').where({id: ids.project})
	.then(function(rows){
		//checks that project exists and belongs to authed user
		var project = rows[0];
		if (!project) throw 404;
		if (isPrivate && project.owner_id !== ids.user) throw 401;

		return db(tableName).select('*').where({project_id: ids.project})
		.then(function(resources){
			return resources;
		})
	})
}


//creates a new resource entry
Resource.create = function(tableName, ids, attrs){
	//finds the project from the project_id attributes
	return db('projects').select('*').where({id: attrs.project_id})
	.then(function(rows){
		//checks that the project is owned by authed usr
		var project = rows[0];
		if (project.owner_id !== ids.user) throw 401;

		//creates new project
		return db(tableName).insert(attrs).returning('*')
		.then(function(rows){
			return rows[0]; 
		})
	})
}

//updates a resource entry 
Resource.update = function(tableName, ids, attrs){
	//checks that the resource belongs to the authed user
	return db.table('projects')
	.innerJoin(tableName, 'projects.id', '=', tableName+'.project_id')
	.where('projects.owner_id', '=', ids.user)
	.andWhere(tableName + '.id', '=', ids.resource)
	.then(function(rows){
		//could not find resource belonging to authed user
		if (!rows[0]) throw 404;

		//updates information
		return db(tableName).where('id', '=', ids.resource)
		.update(attrs).returning('*')
		.then(function(rows){
			return rows[0];
		})
	})
}

//deletes a resource entry by id 
Resource.delete = function(tableName, ids){
	//checks that the resource belongs to the authed user
	return db.table('projects')
	.innerJoin(tableName, 'projects.id', '=', tableName+'.project_id')
	.where('projects.owner_id', '=', ids.user)
	.andWhere(tableName + '.id', '=', ids.resource)
	.then(function(rows){
		//could not find resource belonging to authed user
		if (!rows[0]) throw 404;
		//deletes resource entry
		return db(tableName).where('id', '=', ids.resource)
		.del().returning('project_id')
		.then(function(rows){
			return rows[0]
		})
	})
}

//deletes all resources for a particular project
Resource.deleteAll = function(projectId){
	//finds all resources from a particular table and deletes
	var del = function(tableName){
		return db.select('*').from(tableName)
		.where(tableName + '.project_id', '=', projectId)
		.del() 
	}

	//deletes all four 
	return del('lyrics')
	.then(function(){
		return del('stablature');
	})
	.then(function(){
		return del('recordings');
	})
	.then(function(){
		return del('notes');
	})
}

module.exports = Resource; 
