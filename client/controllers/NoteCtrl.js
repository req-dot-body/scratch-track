app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', function($scope, $state, Note, Project) {

  var projectId = $state.params.id;

  $scope.notes = [{
    name: 'test note',
    text: 'ballsballsballsballsballsballsballsballs',
    projectId: projectId
  }]

  $scope.newNote = {
    name: '',
    text: '',
    project_id: projectId
  }

  $scope.getAll = function (projectId) {
    Project.getProjectNotes(projectId);
  }

  $scope.addNote = function (newNote) {
    Note.create(newNote);
  }

  $scope.deleteNote = function (noteId) {
    Note.del(noteId);
    $scope.getAll(projectId);
  }

}]);
