app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', function($scope, $state, Note, Project) {

  var projectId = $state.params.id;

  $scope.notes = [];

  $scope.newNote = {
    name: '',
    text: '',
    project_id: projectId
  }

  $scope.noteEdits = {
    name: '',
    text: '',
    project_id: projectId
  }

  //Note Methods:
  $scope.getAll = function (projectId) {
    Project.getProjectNotes(projectId)
    .then(function(notes){
      $scope.notes = notes.data;
    });
  }

  $scope.addNote = function (newNote) {
    return Note.create(newNote)
    .then(function(){
      $scope.getAll(projectId);
    });
  }

  $scope.deleteNote = function (noteId) {
    return Note.del(noteId)
    .then(function(){
      $scope.getAll(projectId);
    });
  }

  $scope.editToggle = false;

  $scope.editNote = function () {
    $scope.editToggle = true;
    var text = $('#note-text');
    text.removeAttr('readonly');
  }

  $scope.confirmEdit = function (noteId, value) {
    $scope.editToggle = false;
    var text = $('#note-text');
    text.attr('readonly', 'true ');
    return Note.editBody(noteId, value)
    .then(function(){
      $scope.getAll(projectId);
    });
  }

}]);
