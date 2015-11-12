app.directive('note', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/note.html',
    controller: 'NoteCtrl'
  };
});
