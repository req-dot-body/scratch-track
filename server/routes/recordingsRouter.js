var express = require('express');
var router = express.Router();

// Add a new recording
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get recording by id
router.get('/:id', function (req, res) {
  res.json({'success':true});
});

// Edit recording by id
router.put('/:id', function (req, res) {
  res.json({'success':true});
});

// Delete recording by id
router.delete('/:id', function (req, res) {
  res.json({'success':true});
});

module.exports = router;
