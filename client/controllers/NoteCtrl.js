app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', 'Resource',
 function($scope, $state, Note, Project, Resource) {

  var projectId = $state.params.id;

  $scope.sort = Resource.sort;

  $scope.notes = $scope.notes || [];

  $scope.newNote = {
    name: '',
    text: '',
    project_id: projectId
  };

  $scope.hasBeenReset = true;

  $scope.tempNote = {};

  $scope.public = true;

  if ($state.current.authenticate) {
    $scope.public = false;
  }

  //Note Methods:
  $scope.formatDate = function(date) {
    return Resource.formatDate(date);
  };

  $scope.sortBy = function(field){
    Resource.sortBy(field);
  };

  $scope.autoExpand = function(e) {
    Resource.autoExpand(e);    
  };
  
  $scope.submit = function(){
    $scope.submitted = true;
  };

  $scope.closeAccordion = function(){
    Resource.closeAccordion();
  };
  
  $scope.getAll = function () {
    Project.getProjectNotes(projectId)
    .then(function(notes){
      console.log(notes.data);
      $scope.notes = notes.data;
    });
  };

  $scope.addNote = function (newNote) {
    return Note.create(newNote)
    .then(function(){
      $scope.resetForm();
      $scope.getAll();
    });
  };

  $scope.resetForm = function () {
    $scope.hasBeenReset = true;
    $scope.newNote.name = '';
    $scope.newNote.text = '';
  };

  $scope.deleteNote = function (noteId) {
    return Note.del(noteId)
    .then(function(){
      $scope.getAll();
    });
  };

  $scope.editing= false;

  $scope.editNote = function(note){

    console.log('editing?', note);
    $scope.editing = true;

    $scope.tempNote = {
      id: note.id,
      name: note.name,
      text: note.text
    };
  };

  $scope.closeEdit = function(){
    $scope.editing = false;
    $scope.tempNote = {};
  };

  $scope.update = function(){
    $scope.editing = false;
    var id = $scope.tempNote.id;

    Note.edit(id, $scope.tempNote)
    .then(function(){
      $scope.tempNote = {};
      $scope.getAll();
    });

  };

  //initializing
  $scope.getAll();

}]);
