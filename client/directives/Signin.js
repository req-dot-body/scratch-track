app.directive('signin', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/signinForm.html',
    controller: 'UserCtrl'
  };
});
