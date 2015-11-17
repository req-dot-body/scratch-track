app.factory('User', ['$http', function($http) {
  
  var logIn = function (userData){


    return $http.post('/api/users/signin', userData)
    .then(function(response){
      // console.log('logged in?', response);
      if (response.status === 200 && isLoggedIn()) {
        $state.go('home');
        return true;
      } else {
        $state.go('public.signup');
        return false;
      }
    });

  };

  var signUp = function (newUser){


  };



}]);
