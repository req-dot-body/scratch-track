app.controller('HomeCtrl', ['$scope','$state', 'Auth', function($scope,$state, Auth) {
  // the idea is to have a service that will give us 2 states loggedin / public that will change the states for what the user hits when it gets to the website

  // Redirect to appropriate main page
  // If logged in, go to main controller
  if (Auth.isLoggedIn()) {
    $state.go('main');
  // Else, go to the public landing page
  } else {
    $state.go('public');
  }

}]);
