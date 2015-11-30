app.controller('NoteCtrl', ['$scope', '$state', 'Note', 'Project', function($scope, $state, Note, Project) {

  var projectId = $state.params.id;

  $scope.notes = [
    {
      name: 'test',
      text: 'testetesetsetsetsetst',
      created_at: '11/11/15',
      id: 1
    },
    {
      name: 'test',
      text: 'testetesetsetsetset112121st',
      created_at: '11/11/15',
      id: 2
    },
    {
      name: 'test',
      text: 'testetesetsetsetsetst',
      created_at: '11/11/15',
      id: 3
    }
  ];

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
    var notes = Project.getProjectNotes(projectId);
    console.log(notes)
    $scope.notes = notes.data
  }

  $scope.addNote = function (newNote) {
    return Note.create(newNote).then = function (response) {
      console.log("fn called")
      $scope.getAll(projectId);
    }
  }

  $scope.deleteNote = function (noteId) {
    return Note.del(noteId).then = function (response) {
      $scope.getAll(projectId);
    }
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
    return Note.editBody(noteId, value).then = function (response) {
      $scope.getAll(projectId);
    }
  }

}]);
