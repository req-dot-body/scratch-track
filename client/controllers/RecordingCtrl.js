app.controller('RecordingCtrl', ['$scope', '$state', 'Recording', 'Project',
	function($scope, $state, Recording, Project) {

	$(document).ready(function() {
    $('.collapsible').collapsible({
      accordion : false
     });
  });

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

	$scope.getAll = function(){
		//$state.params should get me my id
		//something from Project factory
	}

	$scope.add = function(){

	}

	$scope.edit = function(id){
		 
	}

	// $scope.delete = Recording.del;
	$scope.delete = function(id) {
		Recording.del(id);
	}

}]);
