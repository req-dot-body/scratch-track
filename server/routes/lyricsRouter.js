var express = require('express');
var router = express.Router();
var handler = require('./resourceHandler.js')

// Create a new lyric
router.post('/', function (req, res) {
  handler.post(req, res, 'lyrics');
});

// Get a lyric by id
router.get('/:resourceId', function (req, res) {
	handler.get(req, res, 'lyrics');
});

// Update a lyric by id
router.put('/:resourceId', function (req, res) {
  handler.put(req, res, 'lyrics');
});

// Delete a lyric by id
router.delete('/:resourceId', function (req, res) {
	handler.del(req, res, 'lyrics');
});

module.exports = router;
