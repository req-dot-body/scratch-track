var express = require('express');
var router = express.Router();

// Get all projects that can be accessed
router.get('/', function(req, res) {
  res.json({'success':true});
});

// Create new project
router.post('/', function(req, res) {
  res.json({'success':true});
});

// Get a project by id
router.get('/:projectId', function(req, res) {
  res.json({'success':true});
});

// Update a project using its id
router.put('/:projectId', function(req, res) {
  res.json({'success':true});
});

// Delete a project using its id
router.delete('/:projectId', function(req, res) {
  res.json({'success':true});
});

module.exports = router;
