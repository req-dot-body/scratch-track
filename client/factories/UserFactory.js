app.factory('User', ['$http','$state', function($http,$state) {
  

  var logIn = function (userData){

    return $http.post('/api/users/signin', userData)
    .then(function(response){
      // console.log('logged in?', response);
      if (response.status === 200) {
        $state.go('home');
        return true;
      } else {
        $state.go('public.signin');
        return false;
      }
    });

  };

  var signUp = function (newUser){

    return $http.post('/api/users/signup', newUser)
    .then(function(response){
      // console.log('logged in?', response);
      if (response.status === 200) {
        $state.go('home');
        return true;
      } else {
        $state.go('public.signup');
        console.log(response);
        return false;
      }
    });
  };

  return {
    logIn:logIn,
    signUp:signUp
  }

}]);
