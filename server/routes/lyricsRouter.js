var express = require('express');
var router = express.Router();

// Create a new lyric
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a lyric by id
router.get('/:lyricId', function (req, res) {
  var lyricId = req.params.lyricId;
  res.json({'success':true,lyricId:lyricId});
});

// Update a lyric by id
router.put('/:lyricId', function (req, res) {
  var lyricId = req.params.lyricId;
  res.json({'success':true,lyricId:lyricId});
});

// Delete a lyric by id
router.delete('/:lyricId', function (req, res) {
  var lyricId = req.params.lyricId;
  res.json({'success':true,lyricId:lyricId});
});

module.exports = router;
