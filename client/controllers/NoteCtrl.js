app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', function($scope, $state, Note, Project) {

  var projectId = $state.params.id;

  $scope.notes = $scope.notes || [];

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
      console.log(notes.data)
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

  $scope.editNote = function (noteId) {
    $scope.editToggle = true;
    var textId = '#note-text' + noteId;
    var text = $(textId);
    text.removeAttr('readonly');
  }

  $scope.confirmEdit = function (noteId, value, name) {
    $scope.editToggle = false;
    var textId = '#note-text' + noteId;
    var text = $(textId);
    text.attr('readonly', 'true ');

    var data = {
      text: value,
      name: name
    }

    return Note.editBody(noteId, data)
    .then(function(){
      $scope.getAll(projectId);
    });
  }

  var init = function () {
    $scope.getAll(projectId);
  }
  init();

}]);
