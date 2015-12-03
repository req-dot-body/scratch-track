app.directive('lyricsentry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/lyricsEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});