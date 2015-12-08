app.controller('MainCtrl', ['$scope', '$state', 'User','nzTour', 'Auth', function($scope, $state, User, nzTour, Auth) {

  $scope.signedIn = Auth.isLoggedIn();

  if ($state.is('main')) {
    $state.go('main.projects');
  } else {
    // $state.go('main.pubprojects');
  }

  $scope.logOut = function () {
    User.logOut();
  };


}]);


