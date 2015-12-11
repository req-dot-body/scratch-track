app.controller('LyricCtrl', ['$scope', '$state', 'Lyric', 'Project', 'Resource', 
  function($scope, $state, Lyric, Project, Resource) {

  var projectId = $state.params.id;

  $scope.sort = Resource.sort;
  $scope.public = true;
  
  if ($state.current.authenticate) {
    $scope.public = false;
  }

  $scope.newLyric = {
    name: '',
    text: '',
    project_id: projectId
  };

  $scope.selectedLyric;

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

  
  $scope.sortBy = function(field){
    Resource.sortBy(field);
  };


  $scope.toggleElement = function(id) {
    div = document.getElementById(id);

    if(div.style.display == "none") {
      div.style.display = "block";
    }
    else {
      div.style.display = "none";
    }
  };
  

  $scope.closeAccordion = function(){
    Resource.closeAccordion();
  };
  

  $scope.formatDate = function(date) {
    return Resource.formatDate(date);
  };


  $scope.updateVal = function(newValue) {
    $scope.val = newValue;
  };


  $scope.update = function(newTitle, newValue) {
    $scope.newLyric = {
      name: newTitle,
      text: newValue,
      project_id: projectId
    };
  };


  $scope.clearValues = function() {
    $scope.newLyric = {
      name: '',
      text: '',
      project_id: projectId
    };
    $scope.hasBeenReset = true;
  };


  $scope.getAll = function(){
    Project.getProjectLyrics(projectId)
    .then(function(projects) {
      $scope.lyrics = projects;
    })
  };
  

  $scope.getOne = function(id){
    Lyric.select(id);
  };


  $scope.add = function(newLyric){
    console.log('text:', newLyric.text);
    console.log(typeof newLyric.text);
    if (newLyric.text === '') {
      console.log('hitting')
      return;
    }

    Lyric.create(newLyric)
    .then(function() {
      $scope.clearValues();
      $scope.getAll();
      $scope.closeAccordion();
    });
  };

  $scope.edit = function(lyric){
    $scope.editing = true;

    $scope.editLyric = {
      id: lyric.id,
      name: lyric.name,
      text: lyric.text
    };
  } 

  $scope.closeEdit = function(){
    $scope.editing = false;
    $scope.editLyric = {};
  };

  $scope.update = function(lyric){
    $scope.editing = false;
    var id = $scope.editLyric.id;

    Lyric.edit(id, $scope.editLyric)
    .then(function(){
      $scope.editLyric = {};
      $scope.getAll();
    })

  };


  $scope.delete = function(noteId) {
    Lyric.del(noteId)
    .then(function() {
      $scope.getAll();
    });
  };


  // Makes textareas expand as you type
  $scope.autoExpand = function(e) {
    Resource.autoExpand(e);    
  };


  // Initial Setup
  $scope.getAll();
  $scope.lyrics = [];
  $scope.toggleMode = "Edit";
  $scope.editing = false;
  $scope.editLyric = {};
  
}]);
