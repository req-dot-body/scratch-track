var express = require('express');
var router = express.Router();

// Create a new stablature
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get a stablature by id
router.get('/:stablatureId', function (req, res) {
  var stablatureId = req.params.stablatureId;
  res.json({'success':true,stablatureId:stablatureId});
});

// Update a stablature by id
router.put('/:stablatureId', function (req, res) {
  var stablatureId = req.params.stablatureId;
  res.json({'success':true,stablatureId:stablatureId});
});

// Delete a stablature by id
router.delete('/:stablatureId', function (req, res) {
  var stablatureId = req.params.stablatureId;
  res.json({'success':true,stablatureId:stablatureId});
});

module.exports = router;
