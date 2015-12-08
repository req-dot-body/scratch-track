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
  
    var state = $state.current.name;

    switch(state) {
    case 'main.projects':
        Tour.startProjectTour();
        break;
    case 'main.pubprojects':
        Tour.startPublicProjectTour();
        break;
    case 'main.project_edit.dash':
        Tour.startDashTour();
        break;
    case 'main.project_edit.recordings':
        Tour.startEditProjectTour();
        break;
    case 'main.project_edit.notes':
        Tour.startEditProjectTour();
        break;
    case 'main.project_edit.lyrics':
        Tour.startEditProjectTour();
        break;
    case 'main.project_edit.stablature':
        Tour.startEditProjectTour();
    break;

    }
  }

  if(signedUp.value){
    Tour.startMainTour();
  
  }

}]);


