app.directive('lyricsentry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/lyricsOrNoteEntry.html',
    controller: 'ResourceCtrl'
  };
});