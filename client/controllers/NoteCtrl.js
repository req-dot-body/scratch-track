app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', function($scope, $state, Note, Project) {

  var projectId = $state.params.id;

  $scope.notes = [
    {
      name: 'test',
      text: 'testetesetsetsetsetst',
      created_at: '11/11/15'
    },
    {
      name: 'test',
      text: 'testetesetsetsetset112121st',
      created_at: '11/11/15'
    },
    {
      name: 'test',
      text: 'testetesetsetsetsetst',
      created_at: '11/11/15'
    }
  ];

  $scope.newNote = {
    name: '',
    text: '',
    project_id: projectId
  }

  $scope.getAll = function (projectId) {
    Project.getProjectNotes(projectId);
  }

  $scope.addNote = function (newNote) {
    console.log(newNote);
    Note.create(newNote);
    $scope.getAll(projectId);
  }

  $scope.deleteNote = function (noteId) {
    Note.del(noteId);
    $scope.getAll(projectId);
  }

  $scope.editNote = function (noteId) {

  }

}]);
