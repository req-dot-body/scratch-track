app.directive('noteEntry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/lyricsOrNoteEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});