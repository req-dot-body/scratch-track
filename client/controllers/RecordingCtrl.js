app.controller('RecordingCtrl', ['$scope', '$state', 'Recording', 'Project',
  function($scope, $state, Recording, Project) {

  var projectId = $state.params.id;

  $scope.recordings = [];

  $scope.getAll = function(){
    return Project.getProjectRecordings(projectId)
    .then(function(response){
      $scope.recordings = response.data;
    })
  };

  $scope.add = function(url){

    var newRecording = {
      project_id: projectId,
      url: url, 
      name: 'New Recording'
    };

    Recording.create(newRecording)
    .then(function(){
      $scope.getAll();
    })
  };

  $scope.edit = function(id){

  };

  // $scope.delete = Recording.del;
  $scope.delete = function(id) {
    Recording.del(id)
    .then(function(){
      $scope.getAll();
    })
  };

  //RecorderJS:

  $scope.audio_context = null;
  $scope.recorder = null;
  $scope.log = $('#log');


  
  $scope.__log = function (e, data) {
    $scope.log.innerHTML += '\n' + e + ' ' + (data || '');
  }

  $scope.startUserMedia = function (stream) {
    var input = audio_context.createMediaStreamSource(stream);
    //__log('Media stream created.');
    $scope.recorder = new Recorder(input);
    //__log('Recorder initialised.');
  }

  $scope.startRecording = function () {
    $scope.log.innerHTML = '';
    $scope.recorder && $scope.recorder.record();

    var button = $('#record-btn');
    var stopButton = $('#stop-btn');
    button.removeClass('large button')
    button.addClass('large button disabled')
    stopButton.removeClass('large alert button disabled')
    stopButton.addClass('large alert button')

    $scope.__log('Recording...');
  }

   $scope.stopRecording = function () {
    $scope.recorder && $scope.recorder.stop();
    
    var button = $('#record-btn');
    var stopButton = $('#stop-btn');
    button.removeClass('large button disabled')
    button.addClass('large button')
    stopButton.removeClass('large alert button')
    stopButton.addClass('large alert button disabled')
    $scope.__log('Stopped recording.');
    // create WAV download link using audio data blob
    $scope.createDownloadLink();
    $scope.recorder.clear();
  }

  $scope.createDownloadLink = function () {
    if (!$scope.recorder) {
      return;
    }

    // Show download link
    $scope.recorder.exportWAV(function(blob) {

      console.log('Blob stuff:', blob.size, blob);

      if (blob.size < 64) { // WAV is instantiated to a size of 44 
        return;
      }
      // Send request to Express server to get a signed url
      $.ajax({
        method: 'post',
        url: window.location.origin + '/api/resources/recordings/signedAWS',
        data: JSON.stringify({ size: blob.size }),
        contentType: 'application/json',
      })
      // Get signed AWS url
      .then(function(response) {
        console.log('Response:', response);

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
          console.log('Amazon stuff:', e);

          if (xhr.status === 200) {
            console.log('Express response:', response);
            console.log('XHR status === 200', e);
            var url = response.url

            $scope.add(url);



            /*var recordingEl = document.createElement('zf-accordion-item');
            recordingEl.setAttribute('title', 'New Recording');                      

            var audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.src = URL.createObjectURL(blob);

            var downloadLink = document.createElement('a');
            downloadLink.className = 'recording-element';
            downloadLink.href = response.url;
            downloadLink.innerHTML = '<a class="small button" download>Download Recording</a>'

            recordingEl.appendChild(audioElement);
            recordingEl.appendChild(downloadLink);
            document.getElementById('recordingslist').appendChild(recordingEl);*/

            // TODO : Save recording information in database
          } else if (xhr.status === 403) {
            // Something was changed in the signed url, its not what the server signed
            // Amazon rejected the upload
          }
        };

        xhr.onerror = function () {
          console.log('Error uploading file');
        };
        xhr.send(blob);
      });
    });
  }


  function init() {
    $scope.getAll();

    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      //__log('Audio context set up.');
      //__log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, $scope.startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });
  };

  init();


}]);
