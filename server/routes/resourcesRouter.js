var express = require('express');
var router = express.Router();
var Resource = require('../models/resource');
// Add a new resource
router.post('/:resourceType/', function (req, res) {
	console.log('posting new resource', req.body);
  var resourceType = req.params.resourceType;
  var ids = {user: req.session.passport.user.id};
	
	var resourceInfo = req.body;
	resourceInfo.created_at = Math.round(Date.now()/1000);

	//passes in the type of resource, attributes, and user id to the model
	Resource.create(resourceType, ids, resourceInfo)
	.then(function(resource){
		//changes updated_at on project
		Project.updateResource(resource.project_id)
		.then(function(){
			res.status(201).send(resource);
		})
		.catch(function(err){
			console.log('could not change project updated_at');
			res.sendStatus(400);
		})
	})
	.catch(function(err){
		console.log('Could not create new resource');
		res.sendStatus(400);
	}) 

});

// Get resource by id
router.get('/:resourceType/:resourceId', function (req, res) {
	console.log('getting resource');
  var resourceType = req.params.resourceType;
  var ids = {
		user: req.session.passport.user.id,
		resource: req.params.resourceId
	};

	Resource.findById(resourceType, ids)
	.then(function(resource){
		res.status(200).send(resource);
	})
	.catch(function(err){
		console.log('could not find resource')
		res.sendStatus(404);
	})
});

// Edit resource by id
router.put('/:resourceType/:resourceId', function (req, res) {
	console.log('editing resource')
	var resourceType = req.params.resourceType;	
	var ids = {
		user: req.session.passport.user.id,
		resource: req.params.resourceId
	};

	Resource.update(resourceType, ids, req.body)
	.then(function(updatedResource){
		//changes updated_at on project
		Project.updateResource(updatedResource.project_id)
		.then(function(){
			res.status(200).send(updatedResource);
		})
		.catch(function(err){
			console.log('could not change project updated_at');
			res.sendStatus(400);
		})
	})
	.catch(function(err){
		console.log('resource failed to update')
		res.sendStatus(400);
	})
});

// Delete resource by id
router.delete('/:resourceType/:resourceId', function (req, res) {
	console.log('deleting resource');
  var resourceType = req.params.resourceType;
  var ids = {
		user: req.session.passport.user.id,
		resource: req.params.resourceId
	};

	Resource.delete(resourceType, ids)
	.then(function(projectId){
		//changes updated_at on project
		Project.updateResource(projectId)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			console.log('could not change project updated_at');
			res.sendStatus(400);
		})
	}) 
	.catch(function(err){
		console.log('failed to delete resource')
		res.sendStatus(400);
	})
});

module.exports = router;
