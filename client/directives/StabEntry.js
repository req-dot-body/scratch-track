app.directive('stabentry', function() {
  return  {
    restrict: 'E',
    scope: {
      resource: '=resource'
    },
    templateUrl: '../views/stabEntry.html',
    controller: 'ResourceCtrl'
  };
});