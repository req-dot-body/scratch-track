var express = require('express');
var router = express.Router();
var handler = require('./resourceHandler.js')

// Add a new recording
router.post('/', function (req, res) {
  handler.post(req, res, 'recordings');
});

// Get recording by id
router.get('/:resourceId', function (req, res) {
  handler.get(req, res, 'recordings');
});

// Edit recording by id
router.put('/:resourceId', function (req, res) {
  handler.put(req, res, 'recordings');
});

// Delete recording by id
router.delete('/:resourceId', function (req, res) {
  handler.delete(req, res, 'recordings');
});

module.exports = router;
