app.directive('noteentry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/lyricsOrNoteEntry.html',
    controller: 'ResourceCtrl'
  };
});