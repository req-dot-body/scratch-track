app.directive('recordingEntry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/recordingEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});