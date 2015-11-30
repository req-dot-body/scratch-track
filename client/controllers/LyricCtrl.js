var moment = require('moment');

app.controller('LyricCtrl', ['$scope', '$state', 'Lyric', 'Project', function($scope, $state, Lyric, Project) {

  $scope.toggleMode = "Edit";

  $scope.toggleEditable = function(id) {
    var textbox = document.getElementById(id);

    if (textbox.hasAttribute('readOnly')) {
      textbox.removeAttribute('readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Save";
      $scope.toggleMode = "Save";
    }
    else {
      textbox.setAttribute('readOnly', 'readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Edit";
      $scope.toggleMode = "Edit";
    }
  };

  $scope.toggleDiv = function(id) {
    div = document.getElementById(id);
      if(div.style.display == "none") {
         div.style.display = "block";
      }
      else {
         div.style.display = "none";
      }
  };

  $scope.formatDate = function(date) {
    return moment.unix(date).calendar();
  };

  var projectId = $state.params.id;


  $scope.val = "";
  $scope.titleVal = ""


  $scope.updateVal = function(newValue) {
    $scope.val = newValue;
  }

  $scope.updateTitle = function(newTitle) {
    $scope.titleVal = newTitle;
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

  $scope.add = function(titleData, data){
    console.log('data in ctrl:', titleData, data);
    var requestData = {
      "project_id": projectId,
      "text":  data,
      "name": titleData
    }

    return Lyric.create(requestData);
  }

  $scope.edit = function(id, data){
    if($scope.toggleMode === "Edit") {
      Lyric.edit(id, data); 
    }
    else {
      console.log("Cannot post. You are not in edit mode.")
    }
  }


  $scope.delete = function(id) {
    Lyric.del(id);
  }


  // $(document).ready(function() {
  //   $('.modal-trigger').leanModal();
  //   $('.collapsible').collapsible({
  //       accordion : false
  //   });
  // });


  $("textarea").keyup(function(e) {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
      $(this).height($(this).height()+1);
    };
  });

}]);
