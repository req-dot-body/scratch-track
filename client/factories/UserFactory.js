app.factory('User', ['$http','$state', function($http,$state) {
  

  var logIn = function (userData){

    return $http.post('/api/users/signin', userData)
    .then(function(response){ 
      $state.go('main.projects');
    })
    .catch(function(err) {
      //display error message
      $scope.signinError = 'Auth Error Please Re-Enter Info';
      $state.go('public.signin');
    });
  };

  var signUp = function (newUser){

    return $http.post('/api/users/signup', newUser)
    .then(function(response){
      if (response.status === 200) {
        $state.go('home');
        return true;
      } else {
        $state.go('public.signup');
        return false;
      }
    });
  };

  return {
    logIn:logIn,
    signUp:signUp
  }

}]);
