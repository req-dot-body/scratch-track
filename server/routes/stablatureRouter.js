var express = require('express');
var router = express.Router();
var handler = require('./resourceHandler.js')

// Create a new stablature
router.post('/', function (req, res) {
  handler.post(req, res, 'stablature');
});

// Get a stablature by id
router.get('/:resourceId', function (req, res) {
  handler.get(req, res, 'stablature');
});

// Update a stablature by id
router.put('/:resourceId', function (req, res) {
  handler.put(req, res, 'stablature');
});

// Delete a stablature by id
router.delete('/:resourceId', function (req, res) {
  handler.delete(req, res, 'stablature');
});

module.exports = router;
