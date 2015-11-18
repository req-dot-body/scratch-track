app.controller('LyricCtrl', ['$scope', '$state', 'Lyric', 'Project', function($scope, $state, Lyric, Project) {

  $scope.toggleEditable = function(id) {
    var el = document.getElementById(id);

    if (el.hasAttribute('readOnly')) {
      el.removeAttribute('readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Save";
    }
    else {
      el.setAttribute('readOnly', 'readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Edit";
    }
  };
 
  $scope.removeOverlay = function() {
    if (document.getElementsByClassName('lean-overlay')) {
      var overlays = document.getElementsByClassName('lean-overlay');
      // console.log(overlays);
      for (var i = 0; i < overlays.length; i++) {
        overlays[i].remove();
      }
    }
  };

  $scope.mockLyrics = [ 

   {
      project_id: 97,
      text:  'this is lyrics',
      name: 'draft1'
    },
    {
       project_id: 98,
       text:  'this is also lyrics',
       name: 'draft2'
     }
  ]; 

  $scope.lyrics = [] || $scope.getAll();


  $scope.getAll = function(){
    var projectId = $state.params.id;
    return Project.getProjectLyrics(projectId);
  }


  $scope.add = function(){

  }


  $scope.edit = function(id){
     
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
