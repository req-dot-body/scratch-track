var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require('../models/project.js'); 
var Resource = require('../models/resource.js');

// Get all projects that can be accessed
router.get('/', function (req, res) {
    //this needs to change once public projects and
    //collabs become a thing 
    console.log('session stuff:', req.session);
    Project.findByUser(req.session.passport.user.id)
    .then(function(projects){
      //sends all projects
      res.status(200).send({projects: projects});
    })
    .catch(function(err){
      console.log('Could not find projects for this user');
      res.sendStatus(404);
    });
});

// Gets all public projects
router.get('/public', (req, res) => {
  Project.findByPublic()
  .then((projects) => {
    res.json({ projects: projects });
  })
  .catch((err) => {
    console.log('Error finding public projects:', err);
    res.status(500).json({error:'Error finding public projects'});
  });
});

// Create new project
router.post('/', function (req, res) {
  console.log('making a new project');
  var now = Math.round(Date.now()/1000);
  console.log('session stuff:', req.session);
  var projectInfo = {
    name: 'Untitled Project',
    owner_id: req.session.passport.user.id,
    created_at: now,
    updated_at: now
  };

  //creates a new project
  Project.create(projectInfo)
  .then(function(project){
    res.status(201).send(project);
  })
  .catch(function(err){
    console.log('Could not create project', err);
    res.sendStatus(400);
  });
});

// Get a project by id
router.get('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //grab the project from db
  Project.findById(projectId, req.session.passport.user.id)
  .then(function(project){
    res.status(200).send(project);
  })
  .catch(function(err){
    console.log('could not find project');
    res.sendStatus(404);
  });
});

// Update a project using its id
router.put('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authorized by user
  Project.findById(projectId, req.session.passport.user.id)
  .then(function(){
    req.body.updated_at = Math.round(Date.now()/1000);

    Project.update(projectId, req.body)
    .then(function(project){
      //succesfully updated
      res.status(200).send(project);
    })
    .catch(function(err){
      console.log('could not update project');
      res.sendStatus(400);
    });
  })
  .catch(function(err){
    console.log('could not find project');
    res.sendStatus(404);
  });
});

// Delete a project using its id
router.delete('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authorized by user
  Project.findById(projectId, req.session.passport.user.id)
  .then(function(){
    //deleting project and resources
    Project.del(projectId)
    .then(function(){
      //successfully deleted
      res.status(200).send();
    })
    .catch(function(err){
      console.log('could not delete project');
      res.sendStatus(400);
    });
  })
  .catch(function(err){
    console.log('could not find project');
    res.sendStatus(404);
  });
});

// Get all resource of a type associated with a specific project
router.get('/:projectId/:resourceType', function (req, res) {
  var resourceType = req.params.resourceType;
  var ids = {
    project: req.params.projectId,
    user: req.session.passport.user.id
  };

  Resource.findByProject(resourceType, ids)
  .then(function(resources){
    res.status(200).send(resources);
  })
  .catch(function(err){
    res.sendStatus(400);
  });
});

module.exports = router;
