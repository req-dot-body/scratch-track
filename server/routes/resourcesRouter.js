var express = require('express');
var router = express.Router();
var Resource = require('../models/resource');
var Project = require('../models/project');

var aws = require('aws-sdk');
var uuid = require('node-uuid');

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
    console.log('whats going on hurrr?', resource);
    //changes updated_at on project
    Project.updateResource(resource.project_id)
    .then(function(){
      res.status(201).send(resource);
    })
    .catch(function(err){
      console.log('could not change project updated_at');
      res.sendStatus(400);
    });
  })
  .catch(function(err){
    console.log('Could not create new resource');
    res.sendStatus(400);
  });

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
    console.log('could not find resource');
    res.sendStatus(404);
  });
});

// Edit resource by id
router.put('/:resourceType/:resourceId', function (req, res) {
  console.log('editing resource');
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
    });
  })
  .catch(function(err){
    console.log('resource failed to update');
    res.sendStatus(400);
  });
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
    });
  }) 
  .catch(function(err){
    console.log('failed to delete resource');
    res.sendStatus(400);
  });
});

// Handles generating a signed url to allow client to upload to AWS S3
router.post('/recordings/signedAWS', function(req, res) {

  var fileSize = req.body.size;
  // Check if file size was sent with request
  if (typeof fileSize === 'undefined') {
    res.json({ error: 'Error getting file information' });
    return;
  }

  if (fileSize > 75000000) {
    res.json({ error: 'Error processing file' });
    return;
  }

  // Generate a unique file name, extremely low chance of collisions
  var uniqueName = uuid.v4();

  // We configured AWS in app.js
  var s3 = new aws.S3();
  var bucket = process.env.AWS_BUCKET;

  // Pass this to the function that generates a signed URL
  // This prevents the client from uploading something different than what we have specified (Amazon will 401)
  var params = {
    Bucket: bucket, // S3 bucket to upload to
    Key: 'recordings/' + uniqueName + '.wav', // Give the file a unique name
    ContentType: 'audio/wav', // We are always expecting a WAV file. NOTE: There are a few different mime types that can signify a WAV file
    ACL: 'public-read', // The file we upload should be readable by the public
    Expires: 180, // Signed URL will expire 3 minutes after being generated
  };

  // Generate a signed url that the client can upload to with their recording
  s3.getSignedUrl('putObject', params, (err, data) => {
    console.log('Blob size:', req.body.size);
    if (err) {
      console.log('Error creating a signed url');
      res.json({ error: 'Error creating a signed url' });
      return;
    }

    // Information to send back to client
    var returnData = {
      signedRequest: data, // Url the client should PUT recording
      url: 'https://' + bucket + '.s3.amazonaws.com/' + params.Key, // Url the client can access recording after upload
    };

    res.json(returnData);
  });

  // res.send(uniqueName);
});

module.exports = router;
