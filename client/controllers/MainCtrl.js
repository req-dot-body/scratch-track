app.controller('MainCtrl', ['$scope', '$state', 'User','nzTour', 'Auth','Tour','signedUp', function($scope, $state, User, nzTour, Auth,Tour,signedUp) {

  $scope.signedIn = Auth.isLoggedIn();


  if ($state.is('main')) {
    $state.go('main.projects');
  } else {
    // $state.go('main.pubprojects');
  }

  $scope.logOut = function () {
    User.logOut();
  };

  $scope.runTour = function (){
    console.log ('Runing the Tour')
  }

  if(!signedUp.value){
    Tour.startMainTour();
  }

}]);


