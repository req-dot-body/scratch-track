app.directive('noteEntry', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/noteEntry.html',
    controller: 'resourceEntryCtrl'
  };
});