app.controller('UserCtrl', ['$scope','User', function($scope, User) {
  
  $scope.email = '',
  $scope.password = '',
  $scope.first ='',
  $scope.last ='',

  $scope.signinUser = function () {
    var userData = {};
    userData.email = $scope.email;
    userData.password = $scope.password;
    console.log(userData.email,' ',userData.password)
    //send JSON object to server via factory call
    User.logIn(userData);
  }
  
  $scope.signupUser = function () {
    var newUser = {};
    newUser.email = $scope.email;
    newUser.password = $scope.password;
    newUser.first = $scope.first;
    newUser.last = $scope.last;
    //send JSON object to server via factory call
    User.signUp(newUser)
    .then (function (){
      var userData = {};
      userData.email = $scope.email;
      userData.password = $scope.password;
      //sends true to identify that user just signedup
      User.logIn(userData);
    })
  } 

}]);
