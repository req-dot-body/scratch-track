var express = require('express');
var router = express.Router();

// Add a new recording
router.post('/', function (req, res) {
  res.json({'success':true});
});

// Get recording by id
router.get('/:recordingId', function (req, res) {
  var recordingId = req.params.recordingId;
  res.json({'success':true,recordingId:recordingId});
});

// Edit recording by id
router.put('/:recordingId', function (req, res) {
  var recordingId = req.params.recordingId;
  res.json({'success':true,recordingId:recordingId});
});

// Delete recording by id
router.delete('/:recordingId', function (req, res) {
  var recordingId = req.params.recordingId;
  res.json({'success':true,recordingId:recordingId});
});

module.exports = router;
