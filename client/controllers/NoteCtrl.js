app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', 'Resource',
 function($scope, $state, Note, Project, Resource) {

  var projectId = $state.params.id;

  $scope.sort = Resource.sort;

  $scope.notes = $scope.notes || [];

  $scope.newNote = {
    name: '',
    text: '',
    project_id: projectId
  }

  $scope.editNote = {};

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
  }

  $scope.addNote = function (newNote) {
    return Note.create(newNote)
    .then(function(){
      $scope.resetForm();
      $scope.getAll();
    });
  }

  $scope.deleteNote = function (noteId) {
    return Note.del(noteId)
    .then(function(){
      $scope.getAll();
    });
  }

  $scope.editing= false;

  $scope.edit = function(note){
    $scope.editing = true;

    $scope.editNote = {
      id: note.id,
      name: note.name,
      text: note.text
    };
  } 

  $scope.closeEdit = function(){
    $scope.editing = false;
    $scope.editNote = {};
  };

  $scope.update = function(){
    $scope.editing = false;
    var id = $scope.editNote.id;

    Note.edit(id, $scope.editNote)
    .then(function(){
      $scope.editNote = {};
      $scope.getAll();
    })

  };

  //initializing
  $scope.getAll();

}]);
