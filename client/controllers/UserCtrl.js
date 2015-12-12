app.controller('UserCtrl', ['$scope','User', function($scope, User) {
  
  $scope.email = '';
  $scope.password = '';
  $scope.first ='';
  $scope.last ='';
  $scope.error = { message: '' };

  $scope.signinUser = function () {
    $scope.error.message = '';
    var userData = {};
    userData.email = $scope.email;
    userData.password = $scope.password;
    //send JSON object to server via factory call
    User.logIn(userData).catch(function (err) {
      console.log('Error with signin:', err);
      $scope.error.message = 'Invalid details provided';
    });
  };
  
  $scope.signupUser = function () {
    $scope.error.message = '';
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
      console.log('User signed up, logging them in')
      User.logIn(userData);
    })
    .catch((err) => {
      $scope.error.message = 'Error signing up, please try again';
      console.log('Signup error:', err);
    });
  } ;

}]);
