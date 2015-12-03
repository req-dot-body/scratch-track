app.directive('recordingentry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/recordingEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});