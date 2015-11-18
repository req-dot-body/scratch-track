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

  $scope.testProject = function() {
    console.log('hitting controller');
    return Lyric.testProject();
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

  $scope.id = $state.params.id;
  
  var projectId = $state.params.id;


  $scope.getAll = function(){

    return Project.getProjectLyrics(projectId);
  }

  $scope.getOne = function(id){
    Lyric.select(id);
  }

  $scope.lyrics = [] || $scope.getAll();


  $scope.add = function(data){
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
