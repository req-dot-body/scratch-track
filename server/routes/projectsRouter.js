var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require('../models/project.js') 

// Get all projects that can be accessed
router.get('/', function (req, res) {
  //grabs email from session and finds user in db
   User.findByEmail(req.session.passport.user)
   .then(function(user){

    //this needs to change once public projects and
    //collabs become a thing 
      Project.findByUser(user.id)
      .then(function(projects){
        //sends all projects
        res.status(200).send({projects: projects});
      })
      .catch(function(err){
        console.log("Could not find projects for this user");
        res.status(404).send(err);
      })
   })
   .catch(function(err){
      console.log("Could not find user");
      res.status(404).send(err);
   })
});

// Create new project
router.post('/', function (req, res) {
  //grabs email from session and finds user in db
  User.findByEmail(req.session.passport.email)
  .then(function(user){
    var projectInfo = req.body;
    projectInfo.owner_id = user.id;

    //creates a new project
    Project.create(projectInfo)
    .then(function(project){
      res.status(201).send(project);
    })
    .catch(function(err){
      console.log('Could not create project');
      res.status(400).send(err);
    })

  })
  .catch(function(err){
    console.log("Could not find user");
    res.status(404).send(err);
  })
});

// Get a project by id
router.get('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //grab the project from db
  Project.findById(projectId, req.session.passport.user)
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
  Project.findById(projectId, req.session.passport.email)
  .then(function(){
    //does not allow 'created_at' to be edited
    if (req.body.created_at){
      delete req.body.created_at;
    }

    Project.update(projectId, req.body)
    .then(function(project){
      //succesfully updated
      res.status(200).send(project)
    })
    .catch(function(err){
      console.log('could not update project');
      res.status(400).send(err);
    })
  })
  .catch(function(err){
    console.log('could not find project');
    res.status(404).send(err)
  })
});

// Delete a project using its id
router.delete('/:projectId', function (req, res) {
  var projectId = req.params.projectId;
  //checks that project is authorized by user
  Project.findById(projectId, req.session.passport.user)
  .then(function(){
    Project.del(projectId)
    .then(function(){
      //successfully deleted
      res.status(200).send();
    })
    .catch(function(err){
      console.log('could not delete project')
      res.status(400).send(err);
    })
  })
  .catch(function(err){
    console.log('could not find project')
    res.status(404).send(err);
  })
});

// Get all recordings associated with a specific project
router.get('/:projectId/recordings', function (req, res) {
  var projectId = req.params.projectId;
  res.json({'success':true,projectId:projectId});
});

// Get all lyrics associated with a specific project
router.get('/:projectId/lyrics', function (req, res) {
  var projectId = req.params.projectId;
  res.json({'success':true,projectId:projectId});
});

// Get all stablatures associated with a specific project
router.get('/:projectId/stablature', function (req, res) {
  var projectId = req.params.projectId;
  res.json({'success':true,projectId:projectId});
});

// Get all notes associated with a specific project
router.get('/:projectId/notes', function (req, res) {
  var projectId = req.params.projectId;
  res.json({'success':true,projectId:projectId});
});

module.exports = router;
