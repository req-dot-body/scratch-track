app.controller('RecordingCtrl', ['$scope', '$state', 'Recording', 'Project', 'Resource', 
  function($scope, $state, Recording, Project, Resource) {

  var projectId = $state.params.id;

  $scope.public = true;

  if ($state.current.authenticate) {
    $scope.public = false;
  }

  $scope.recordings = [];
  $scope.newRecordingSrc = '';
  $scope.newRecordingBlob;
  $scope.isSaving = false;

  $scope.newRecording = {
    project_id: projectId,
    url: '',
    name: 'New Recording',
    description: ''
  };

  $scope.sort = Resource.sort;

  $scope.getAll = function(){
    return Project.getProjectRecordings(projectId)
    .then(function(response){
      $scope.recordings = response.data;
    })
  };

  $scope.add = function(url){
    $scope.newRecording.url = url;
    console.log($scope.newRecording);
    Recording.create($scope.newRecording)
    .then(function(){
      $scope.newRecording = {
        project_id: projectId,
        url: '',
        name: 'New Recording',
        description: ''
      };
      $scope.getAll();
    })
  };

  $scope.edit = function(id, name, desc, url){

    var editedRecording = {
      project_id: projectId,
      url: url,
      name: name,
      description: desc
    }

    Recording.edit(id, editedRecording)
    .then(function(){
      $scope.getAll();
    })
  };

  $scope.delete = function(id) {
    Recording.del(id)
    .then(function(){
      $scope.getAll();
    })
  };

  $scope.formatDate = function(date) {
    return Resource.formatDate(date);
  };

  $scope.sortBy = function(field){
    Resource.sortBy(field);
  };

  // -------------Timer Functions-------------:

  $scope.interval;
  $scope.offset;
  $scope.clock = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;
  $scope.secondsPlace = "00";

  $scope.startTimer = function () {
    $scope.resetTimer();

    if (!$scope.interval) {
      $scope.offset = Date.now() / 1000;
      $scope.interval = setInterval($scope.updateTimer, 1000)
    }
  };

  $scope.stopTimer = function () {
    if ($scope.interval) {
      clearInterval($scope.interval);
      $scope.interval = null;
    }
  } 

  $scope.resetTimer = function () {
    $scope.clock = 0;
    $scope.seconds = 0;
    $scope.minutes = 0;
    $scope.secondsPlace = "00";
  }

  $scope.updateTimer = function () {

    var updated = ($scope.tick()/1000);

    $scope.clock += updated;
    $scope.seconds += updated;
    $scope.clock = Math.ceil($scope.clock);
    $scope.seconds = Math.ceil($scope.seconds);

    if ($scope.seconds < 10) {
      $scope.secondsPlace = "0" + $scope.seconds;
    } else if ($scope.seconds % 60 == 0){
      $scope.seconds = 0;
      $scope.secondsPlace = "00";
      $scope.minutes++;
    } else {
      $scope.secondsPlace = $scope.seconds
    }
    $scope.$apply();
  }

  $scope.tick = function () {
    var now = Date.now() / 1000;
    var diff = now - $scope.offset;
    $scope.offset = now;
    return diff;
  }
  

  // -------------RecorderJS-------------:

  $scope.audio_context = null;
  $scope.recorder = null;
  $scope.stream = null;
  
  $scope.__log = function (e, data) {
    var htmlString = '\n' + e + ' ' + (data || '');
    $('#log').html(htmlString);
  }

  $scope.startUserMedia = function (stream) {
    $scope.stream = stream;
    var input = $scope.audio_context.createMediaStreamSource($scope.stream);
    //__log('Media stream created.');
    $scope.recorder = new Recorder(input);
    //__log('Recorder initialised.');
  }

  $scope.startRecording = function () {
    $scope.startTimer();
    $scope.__log('');
    $scope.recorder && $scope.recorder.record();

    var button = $('#record-btn');
    var stopButton = $('#stop-btn');
    button.removeClass('large button');
    button.addClass('large button disabled');
    stopButton.removeClass('large alert button disabled');
    stopButton.addClass('large alert button');

    $('#log').addClass('blink');
    $scope.__log('Recording...');
  }

   $scope.stopRecording = function () {
    $('#log').removeClass('blink');
    $scope.stopTimer();
    $scope.recorder && $scope.recorder.stop();
    $scope.buttonToggle();
    $scope.__log('Stopped recording.');

    // create WAV download link using audio data blob
    $scope.createDownloadLink();
    $scope.recorder.clear();
  }

  $scope.buttonToggle = function () {
    var button = $('#record-btn');
    var stopButton = $('#stop-btn');
    var saveButton = $('#save-btn');
    var discardButton = $('#discard-btn');

    button.removeClass('large button disabled')
    button.addClass('large button')
    stopButton.removeClass('large alert button')
    stopButton.addClass('large alert button disabled')
    saveButton.removeClass('medium button disabled');
    saveButton.addClass('medium button');
    discardButton.removeClass('medium alert button disabled');
    discardButton.addClass('medium alert button');
  }

  $scope.createDownloadLink = function () {
    if (!$scope.recorder) {
      return;
    }

    // Show download link
    $scope.recorder.exportWAV(function(blob) {
      $scope.newRecordingBlob = blob;
      $scope.newRecordingSrc = URL.createObjectURL(blob);
      $scope.$apply();
      $('#audio-player').load()

      console.log("new recording src var is", $scope.newRecordingSrc);

    });
  };

  $scope.completeRecording = function () {
    var saveButton = $('#save-btn');
    var discardButton = $('#discard-btn');
    saveButton.removeClass('medium button');
    saveButton.addClass('medium button disabled');
    discardButton.removeClass('medium alert button');
    discardButton.addClass('medium alert button disabled');
  }

  $scope.discardRecording = function () {
    console.log("discard called")
    $scope.newRecordingSrc = '';
    $scope.newRecordingBlob = {};
    $scope.completeRecording();
    $scope.__log('Discarded recording.');
  }


  $scope.saveRecording = function (audioBlob) {
    $scope.isSaving = true;
    $scope.__log('Saving recording.');
    $scope.completeRecording();

    if (audioBlob.size < 64) { // WAV is instantiated to a size of 44 
      return;
    }
    // Send request to Express server to get a signed url
    $.ajax({
      method: 'post',
      url: window.location.origin + '/api/resources/recordings/signedAWS',
      data: JSON.stringify({ size: audioBlob.size }),
      contentType: 'application/json',
    })
    // Get signed AWS url
    .then(function(response) {
      $scope.isSaving = false;
      if (response.error) {
        console.log('Some error...');
        return;
      }

      if (typeof response.signedRequest === 'undefined' || typeof response.url === 'undefined') {
        // This shouldnt happen
        console.log('SignedRequest or URL was undefined');
        return;
      }

      // In order for this to work, we must use the ol' fashion XMLHttpRequest object
      var xhr = new XMLHttpRequest();

      xhr.open('PUT', response.signedRequest);
      xhr.onload = function (e) {
        var amazonResult = e.response;
        if (xhr.status === 200) {
          var url = response.url
          $scope.add(url);
        } else if (xhr.status === 403) {
          // Something was changed in the signed url, its not what the server signed
          // Amazon rejected the upload
        }
        $scope.__log('Saved!');
      };

      xhr.onerror = function () {
        console.log('Error uploading file');
      };
      xhr.send(audioBlob);
    }); 
  }

  function getAudio () {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      $scope.audio_context = new AudioContext;
      //__log('Audio context set up.');
      //__log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      if (e === PERMISSION_DENIED) {
        $scope.__log('You must allow microphone access to use recording features.')
      }

      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, $scope.startUserMedia, function(e) {
      $scope.__log('You must allow microphone access to use recording features:' + e);
    });
  }


  function init() {
    $scope.getAll();

    getAudio();
  }

  init();


}]);

//Allows us to circumvent Angular's security so we can link to AWS files in an HTML5 audio element
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
