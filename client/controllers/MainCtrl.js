app.controller('MainCtrl', ['$scope', '$state', 'User','nzTour', function($scope, $state, User, nzTour) {

  if ($state.is('main')) {
    $state.go('main.projects');
  }

  $scope.logOut = function () {
    User.logOut();
  };


}]);


