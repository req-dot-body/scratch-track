app.controller('UserCtrl', ['$scope', function($scope) {
  $scope.email = '',
  $scope.password = '',
  $scope.first ='',
  $scope.last ='',

  $scope.signinUser = function () {
    //logic goes here
    var User = {};
    User.email = $scope.email;
    User.password = $scope.password;
    return User;

    //send JSON object to server via factory call
  }
  $scope.signupUser = function () {
    //logic goes here
    var newUser = {};
    newUser.email = $scope.email;
    newUser.password = $scope.password;
    newUser.first = $scope.first;
    newUser.last = $scope.first
    return newUser;

    //send JSON object to server via factory call
  }
}]);
