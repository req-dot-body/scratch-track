app.factory('User', ['$http', '$state', '$timeout', 'signedUp', function($http, $state, $timeout, signedUp) {
  
  var logIn = function (userData){

    return $http.post('/api/users/signin', userData)
    .then(function (response) {
      $timeout(() => {
        $state.go('main.projects', null, { reload: true });
      }, 100);
    });
    // .catch(function(err) {
    //   //display error message
    //   console.log('Error signing in:', err);
    //   $state.go('public.signin');
    //   return 'Auth Error Please Re-Enter Info';
    // });
  };

  var signUp = function (newUser){
    //if user is signed up sends a parameter true to load the tour
    signedUp.value = true;
    return $http.post('/api/users/signup', newUser);
    // .catch(function(err){
    //   $state.go('public.signup');
    //   console.log('signUp err: ', err);
    //   return 'Auth Error Please Re-Enter Info';
    // });
  };

  var logOut = function(){
    return $http.post('/api/users/signout')
    .then(function(response){
      $state.go('home');
    })
    .catch(function(err){  
      console.log('logOut err ', err);
    });
  };

  return {
    logIn:logIn,
    signUp:signUp,
    logOut:logOut
  };
}]);
