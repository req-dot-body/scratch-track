var express = require('express');
var router = express.Router();

// Get all projects that can be accessed
router.get('/', function (req, res) {
  res.json({'success':true});
});

// Create new project
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a project by id
router.get('/:id', function (req, res) {
  res.json({'success':true});
});

// Update a project using its id
router.put('/:id', function (req, res) {
  res.json({'success':true});
});

// Delete a project using its id
router.delete('/:id', function (req, res) {
  res.json({'success':true});
});

// Get all recordings associated with a specific project
router.get('/:id/recordings', function (req, res) {

});

// Get all lyrics associated with a specific project
router.get('/:id/lyrics', function (req, res) {

});

// Get all stablatures associated with a specific project
router.get('/:id/stablature', function (req, res) {

});

// Get all notes associated with a specific project
router.get('/:id/notes', function (req, res) {

});

module.exports = router;
