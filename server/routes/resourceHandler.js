var Resource = require('../models/resource.js');

//request handles for the four project resources:
//lyrics, stablature, recordings, and notes

//creates a new resource
exports.post = function(req, res, resource){
	var projectInfo = req.body;
	projectInfo.created_at = Math.round(Date.now()/1000);

	//passes in the type of resource, attributes, and user id to the model
	Resource.create(resource, projectInfo, req.session.passport.id)
	.then(function(resource){
		res.status(201).send(resource);
	})
	.catch(function(err){
		console.log('Could not create new resource')
	}) 
}

//retrieves a resource by id 
exports.get = function(req, res, resource){
	var resourceId = req.params.resourceId;
	Resource.findById(resource, resourceId, req.session.passport.id)
	.then(function(resource){
		res.status(200).send(resource);
	})
	.catch(function(err){
		console.log('could not find resource')
		res.sendStatus(404);
	})
}

//updates a resource by id
exports.put = function(req, res, resource){
	var resourceId = req.params.resourceId;
	var userId = req.session.passport.id;
	Resource.update(resource, req.body, resourceId, userId)
	.then(function(updatedResource){
		res.status(200).send(updatedResource);
	})
	.catch(function(err){
		console.log('resource failed to update')
		res.sendStatus(400);
	})
}

//deletes a resource by id
exports.del = function(req, res, resource){
	var resourceId = req.params.resourceId; 
}