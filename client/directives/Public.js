app.directive('public', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/landing.html',
    controller: 'PublicCtrl'
  };
});