app.directive('signup', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/signupForm.html',
    controller: 'UserCtrl'
  };
});
