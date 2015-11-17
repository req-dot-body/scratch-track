var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require('../models/project.js'); 
var resourceHandler = require('./resourceHandler.js');

// Get all projects that can be accessed
router.get('/', function (req, res) {
    //this needs to change once public projects and
    //collabs become a thing 
    Project.findByUser(req.session.passport.user.id)
    .then(function(projects){
      //sends all projects
      res.status(200).send({projects: projects});
    })
    .catch(function(err){
      console.log("Could not find projects for this user");
      res.sendStatus(404);
    })
});

// Create new project
router.post('/', function (req, res) {
  var now = Math.round(Date.now()/1000);
  var projectInfo = {
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
  })
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
  })

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
      res.status(200).send(project)
    })
    .catch(function(err){
      console.log('could not update project');
      res.sendStatus(400);
    })
  })
  .catch(function(err){
    console.log('could not find project');
    res.sendStatus(404);
  })
});

// Delete a project using its id
router.delete('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authorized by user
  Project.findById(projectId, req.session.passport.user.id)
  .then(function(){
    Project.del(projectId)
    .then(function(){
      //successfully deleted
      res.status(200).send();
    })
    .catch(function(err){
      console.log('could not delete project')
      res.sendStatus(400);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.sendStatus(404);
  })
});


// Get all lyrics associated with a specific project
router.get('/:projectId/lyrics', function (req, res) {
  resourceHandler.getByProject(req, res, 'lyrics');
});

// Get all recordings associated with a specific project
router.get('/:projectId/recordings', function (req, res) {
  resourceHandler.getByProject(req, res, 'recordings');
});

// Get all stablatures associated with a specific project
router.get('/:projectId/stablature', function (req, res) {
  resourceHandler.getByProject(req, res, 'stablature');
});

// Get all notes associated with a specific project
router.get('/:projectId/notes', function (req, res) {
  resourceHandler.getByProject(req, res, 'notes');
});

module.exports = router;
