app.controller('LyricCtrl', ['$scope', '$state', 'Lyric', 'Project', function($scope, $state, Lyric, Project) {

  $scope.toggleEditable = function() {
    var textbox = document.getElementById('lyrictext');

    if (textbox.hasAttribute('readOnly')) {
      textbox.removeAttribute('readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Save";
    }
    else {
      textbox.setAttribute('readOnly', 'readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Edit";
    }
  };
 
  $scope.removeOverlay = function() {
    if (document.getElementsByClassName('lean-overlay')) {
      var overlays = document.getElementsByClassName('lean-overlay');
      for (var i = 0; i < overlays.length; i++) {
        overlays[i].remove();
      }
    }
  };

  var projectId = $state.params.id;

  $scope.testProject = function(data) {
    console.log('hitting controller:', data);
    var requestData = {
      "project_id": projectId,
      "text":  data,
      "name": "draft"
    }

    return Lyric.testProject(requestData);
  };
  
  $scope.mockLyrics = [ 

   {
      "project_id": 97,
      "text":  "this is lyrics",
      "name": "draft1"
    },
    {
       "project_id": 98,
       "text": "this is also lyrics",
       "name": "draft2"
     }
  ]


  $scope.mockLyrics2 = {
      "project_id": 8,
      "text":  "this is lyrics",
      "name": "draft1"
  }
  

  $scope.lyrics = [];

  $scope.getAll = function(){
    Project.getProjectLyrics(projectId).then(function(projects){
      $scope.lyrics = projects;
    })
  }

  $scope.getAll();

  $scope.getOne = function(id){
    Lyric.select(id);
  }


  $scope.add = function(data){
    console.log('data in ctrl:', data);
    Lyric.create(data);
  }


  $scope.edit = function(id){
     Lyric.edit(id);
  }


  $scope.delete = function(id) {
    Lyric.del(id);
  }

  $(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.collapsible').collapsible({
        accordion : true
    });
  });


}]);
