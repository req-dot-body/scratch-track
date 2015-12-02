var moment = require('moment/moment');

app.controller('LyricCtrl', ['$scope', '$state', 'Lyric', 'Project', function($scope, $state, Lyric, Project) {


  var projectId = $state.params.id;


  $scope.toggleEditable = function() {
    var textbox = document.getElementById('lyrictext');

    if (textbox.hasAttribute('readOnly')) {
      textbox.removeAttribute('readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="SAVE";
      $scope.toggleMode = "Save";
    }
    else {
      textbox.setAttribute('readOnly', 'readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="EDIT";
      $scope.toggleMode = "Edit";
    }
  };


  $scope.submit = function(){
     $scope.submitted = true;
  };


  $scope.toggleElement = function(id) {
    div = document.getElementById(id);

    if(div.style.display == "none") {
      div.style.display = "block";
    }
    else {
      div.style.display = "none";
    }
    console.log('togging');
  };
  

  $scope.formatDate = function(date) {
    return moment.unix(date).calendar();
  };


  $scope.updateVal = function(newValue) {
    $scope.val = newValue;
  };


  $scope.updateTitle = function(newTitle) {
    $scope.titleVal = newTitle;
  };


  $scope.clearValues = function() {
    $scope.val = "";
    $scope.titleVal = "";
    $scope.newVal = "";
    $scope.newTitleVal = "";
  };


  $scope.getAll = function(){
    Project.getProjectLyrics(projectId).then(function(projects) {
      $scope.lyrics = projects;
    })
  };
  

  $scope.getOne = function(id){
    Lyric.select(id);
  };


  $scope.add = function(titleData, data){
    console.log('data in ctrl:', titleData, data);
    var requestData = {
      "project_id": projectId,
      "text":  data,
      "name": titleData
    }

    Lyric.create(requestData).then(function() {
      $scope.getAll();
    });
  };


  $scope.edit = function(id, data){
    if($scope.toggleMode === "Edit") {
      Lyric.edit(id, data); 
    }
    else {
      console.log("Cannot post. You are not in edit mode.")
    }
  };


  $scope.delete = function(id) {
    Lyric.del(id).then(function() {
      $scope.getAll();
    });
  };


  // Makes textareas expand as you type
  $("textarea").keyup(function(e) {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
      $(this).height($(this).height()+1);
    };
  });

  // Initial Setup
  $scope.val = "";
  $scope.getAll();
  $scope.lyrics = [];
  $scope.toggleMode = "Edit";
  
}]);
