app.controller('UserCtrl', ['$scope','User', function($scope,User) {
  $scope.email = '',
  $scope.password = '',
  $scope.first ='',
  $scope.last ='',

  $scope.signinUser = function () {
    //logic goes here
    var userData = {};
    userData.email = $scope.email;
    userData.password = $scope.password;
    console.log(userData.email,' ',userData.password)
    //send JSON object to server via factory call
    User.logIn(userData);
  }
  
  $scope.signupUser = function () {
    //logic goes here
    var newUser = {};
    newUser.email = $scope.email;
    newUser.password = $scope.password;
    newUser.first = $scope.first;
    newUser.last = $scope.last;
    //send JSON object to server via factory call
    User.signUp(newUser);
  } 

}]);
