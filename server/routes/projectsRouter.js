var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require('../models/project.js'); 
var Recording = require('../models/recording.js');
var Lyrics = require('../models/lyrics.js');
var Stablature = require('../models/stablature.js');
var Note = require('../models/note.js');

// Get all projects that can be accessed
router.get('/', function (req, res) {
  console.log('getting for user', req.session.passport.id)
    //this needs to change once public projects and
    //collabs become a thing 
    Project.findByUser(req.session.passport.id)
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
  //grabs email from session and finds user in db
  User.findById(req.session.passport.id)
  .then(function(user){
    var now = Math.round(Date.now()/1000);
    var projectInfo = {
      owner_id: user.id,
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

  })
  .catch(function(err){
    console.log("Could not find user");
    res.sendStatus(404);
  })
});

// Get a project by id
router.get('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //grab the project from db
  Project.findById(projectId, req.session.passport.id)
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
  Project.findById(projectId, req.session.passport.id)
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
  Project.findById(projectId, req.session.passport.id)
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

// Get all recordings associated with a specific project
router.get('/:projectId/recordings', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authed
  Project.findById(projectId, req.session.passport.id)
  .then(function(){
    Recording.findByProject(projectId)
    .then(function(projects){
      res.status(200).send({projects: projects})
    })
    .catch(function(err){
      console.log('could not find recordings')
      res.sendStatus(404);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.sendStatus(404);
  })
  
});

//THE FOLLOWING ARE GOING TO BE MAD REFACTORED
//But later, because I need to write the other handlers before I can test them

// Get all lyrics associated with a specific project
router.get('/:projectId/lyrics', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authed
  Project.findById(projectId, req.session.passport.user)
  .then(function(){
    Lyrics.findByProject(projectId)
    .then(function(projects){
      res.status(200).send({projects: projects})
    })
    .catch(function(err){
      console.log('could not find lyrics')
      res.sendStatus(404);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.sendStatus(404);
  })
});

// Get all stablatures associated with a specific project
router.get('/:projectId/stablature', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authed
  Project.findById(projectId, req.session.passport.user)
  .then(function(){
    Stablature.findByProject(projectId)
    .then(function(projects){
      res.status(200).send({projects: projects})
    })
    .catch(function(err){
      console.log('could not find stablature')
      res.sendStatus(404);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.sendStatus(404);
  })
});

// Get all notes associated with a specific project
router.get('/:projectId/notes', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authed
  Project.findById(projectId, req.session.passport.user)
  .then(function(){
    Note.findByProject(projectId)
    .then(function(projects){
      res.status(200).send({projects: projects})
    })
    .catch(function(err){
      console.log('could not find notes')
      res.sendStatus(404);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.sendStatus(404);
  })
});

module.exports = router;
