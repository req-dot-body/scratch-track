var express = require('express');
var router = express.Router();

// Create a new note
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a note by id
router.get('/:noteId', function (req, res) {
  var noteId = req.params.noteId;
  res.json({'success':true,noteId:noteId});
});

// Update a note by id
router.put('/:noteId', function (req, res) {
  var noteId = req.params.noteId;
  res.json({'success':true,noteId:noteId});
});

// Delete a note by id
router.delete('/:noteId', function (req, res) {
  var noteId = req.params.noteId;
  res.json({'success':true,noteId:noteId});
});

module.exports = router;
