var express = require('express');
var router = express.Router();

// Create a new stablature
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a stablature by id
router.get('/:id', function (req, res) {
  res.json({'success':true});
});

// Update a stablature by id
router.put('/:id', function (req, res) {
  res.json({'success':true});
});

// Delete a stablature by id
router.delete('/:id', function (req, res) {
  res.json({'success':true});
});

module.exports = router;
