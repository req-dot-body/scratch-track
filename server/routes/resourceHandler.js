var Resource = require('../models/resource.js');

//request handles for the four project resources:
//lyrics, stablature, recordings, and notes

//creates a new resource
exports.post = function(req, res, tableName){
	var ids = {user: req.session.passport.id};
	var projectInfo = req.body;
	projectInfo.created_at = Math.round(Date.now()/1000);

	//passes in the type of resource, attributes, and user id to the model
	Resource.create(tableName, ids, projectInfo)
	.then(function(resource){
		res.status(201).send(resource);
	})
	.catch(function(err){
		console.log('Could not create new resource')
	}) 
}

//retrieves a resource by id 
exports.get = function(req, res, tableName){
	var ids = {
		user: req.session.passport.id,
		resource: req.params.resourceId
	};

	Resource.findById(tableName, ids)
	.then(function(resource){
		res.status(200).send(resource);
	})
	.catch(function(err){
		console.log('could not find resource')
		res.sendStatus(404);
	})
}

//updates a resource by id
exports.put = function(req, res, tableName){
	var ids = {
		user: req.session.passport.id,
		resource: req.params.resourceId
	};

	Resource.update(tableName, ids, req.body)
	.then(function(updatedResource){
		res.status(200).send(updatedResource);
	})
	.catch(function(err){
		console.log('resource failed to update')
		res.sendStatus(400);
	})
}

//deletes a resource by id
exports.delete = function(req, res, tableName){
	var ids = {
		user: req.session.passport.id,
		resource: req.params.resourceId
	};

	Resource.delete(tableName, ids)
	.then(function(){
		res.sendStatus(200);
	}) 
	.catch(function(err){
		console.log('failed to delete resource')
		res.sendStatus(400);
	})
}

exports.getByProject = function(req, res, tableName){
	var ids = {
		project: req.params.projectId,
		user: req.session.passport.id
	}
	Resource.findByProject(tableName, ids)
	.then(function(resources){
		res.status(200).send(resources)
	})
	.catch(function(err){
		res.sendStatus(400)
	})

}