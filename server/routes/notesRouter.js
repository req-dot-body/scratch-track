var express = require('express');
var router = express.Router();
var handler = require('./resourceHandler.js')

// Create a new note
router.post('/', function (req, res) {
  handler.post(req, res, 'notes');
});

// Get a note by id
router.get('/:resourceId', function (req, res) {
 	handler.get(req, res, 'notes');
});

// Update a note by id
router.put('/:resourceId', function (req, res) {
  handler.put(req, res, 'notes');
});

// Delete a note by id
router.delete('/:resourceId', function (req, res) {
  handler.delete(req, res, 'notes');
});

module.exports = router;
