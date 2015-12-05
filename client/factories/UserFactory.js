app.factory('User', ['$http','$state', function($http,$state) {
  

  var logIn = function (userData,signedUp){

    return $http.post('/api/users/signin', userData)
    .then(function(response){ 
      //if user is signed up sends a parameter true to load the tour
      if(signedUp === true){
        $state.go('main.projects',{signedUp:true})
      }else {
        console.log('login Sending signedUp not sending Param')
        $state.go('main.projects');
      }
    })
    .catch(function(err) {
      //display error message
      $state.go('public.signin');
      return'Auth Error Please Re-Enter Info'
    });
  };

  var signUp = function (newUser){
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
    logOut:logOut
  }

}]);
