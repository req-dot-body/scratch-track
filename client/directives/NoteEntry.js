app.directive('noteEntry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/noteEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});