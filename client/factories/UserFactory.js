app.factory('User', ['$http','$state','signedUp', function($http,$state,signedUp) {
  
  var logIn = function (userData){

    return $http.post('/api/users/signin', userData)
    .then(function(response){ 
        $state.go('main.projects');
    })
    .catch(function(err) {
      //display error message
      $state.go('public.signin');
      return'Auth Error Please Re-Enter Info'
    });
  };

  var signUp = function (newUser){
    //if user is signed up sends a parameter true to load the tour
    signedUp.value = true;
    console.log('this is signedUp on signUp User Factory: ', signedUp)
    return $http.post('/api/users/signup', newUser)
    .catch(function(err){
      $state.go('public.signup');
      console.log('signUp err: ', err);
      return 'Auth Error Please Re-Enter Info';
    })
  };

  var logOut = function(){
    return $http.post('/api/users/signout')
    .then(function(response){
      //the idea is to make a tour in this case
        $state.go('home');
    })
    .catch(function(err){  
      console.log('logOut err ', err);
    })
  };

  return {
    logIn:logIn,
    signUp:signUp,
    logOut:logOut,
  }

}]);
