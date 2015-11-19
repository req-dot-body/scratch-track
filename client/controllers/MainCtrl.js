app.controller('MainCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {

  if ($state.is('main')) {
    $state.go('main.projects');
  }

  $scope.logOut = function () {
    User.logOut();
  };

}]);


