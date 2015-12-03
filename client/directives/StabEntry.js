app.directive('stabEntry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/stabEntry.html',
    controller: 'ResourceEntryCtrl'
  };
});