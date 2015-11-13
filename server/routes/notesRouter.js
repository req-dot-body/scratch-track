var express = require('express');
var router = express.Router();

// Create a new note
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a note by id
router.get('/:id', function (req, res) {
  res.json({'success':true});
});

// Update a note by id
router.put('/:id', function (req, res) {
  res.json({'success':true});
});

// Delete a note by id
router.delete('/:id', function (req, res) {
  res.json({'success':true});
});

module.exports = router;
