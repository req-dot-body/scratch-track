app.controller('RecordingCtrl', ['$scope', '$state', 'Recording', 'Project',
	function($scope, $state, Recording, Project) {

	

	$scope.mockData = [
	  {
	  	id: 8,
	    project_id: 1,
	    url: 'www.mediaupload.com/test.mp3',
	    created_at: '10/6/15',
	    description: ''
	  },
	  {
	  	id: 10,
	    project_id: 1,
	    url: 'www.mediaupload.com/toadcroak.mp3',
	    description: 'sampled from a swamp in the dead of night',
	    created_at: '11/11/15'
	  },
	  {
	  	id: 19,
	    project_id: 1,
	    url: 'www.mediaupload.com/frognado.mp3',
	    created_at: '11/12/15',
	    name: 'Frognado',
	    description: 'it was quite the blustery frognado'
	  }
	]

	$scope.recordings = [] || $scope.getAll();

	$scope.getAll = function(){
		var projectId = $state.params.id;
		return Project.getProjectRecordings(projectId);
	}

	$scope.add = function(){

	}

	$scope.edit = function(id){
		 
	}

	// $scope.delete = Recording.del;
	$scope.delete = function(id) {
		Recording.del(id);
	}

	//RecorderJS:

	$scope.audio_context;
  $scope.recorder;

  function init() {
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
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });
  };

  init();


}]);
