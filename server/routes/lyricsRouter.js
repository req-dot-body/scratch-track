var express = require('express');
var router = express.Router();

// Create a new lyric
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a lyric by id
router.get('/:id', function (req, res) {
  res.json({'success':true});
});

// Update a lyric by id
router.put('/:id', function (req, res) {
  res.json({'success':true});
});

// Delete a lyric by id
router.delete('/:id', function (req, res) {
  res.json({'success':true});
});

module.exports = router;
