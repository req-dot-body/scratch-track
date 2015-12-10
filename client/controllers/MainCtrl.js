app.controller('MainCtrl', ['$scope', '$state', 'User','nzTour', 'Auth','Tour','signedUp', function($scope, $state, User, nzTour, Auth,Tour,signedUp) {

//user is signed in 
  $scope.signedIn = Auth.isLoggedIn();

//user just signedUp, a value shared across the app
  $scope.signedUp = signedUp.value;

// default state is main projects
  if ($state.is('main')) {
    $state.go('main.projects');
  } else {
    // $state.go('main.pubprojects');
  }

  $scope.logOut = function () {
    User.logOut();
  };


//function that runs the tour on each tour when available
  $scope.runTour = function (){
  
    var state = $state.current.name;
//switch state determines which tour to load on which view
    switch(state) {
    case 'main.projects':
        Tour.startProjectTour();
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
    case 'main.pubprojects':
        Tour.startPublicProjectTour();
        break;
    case 'main.public_view.dash':
        Tour.startPublicDashTour();
        break;
    case 'main.public_view.recordings':
        Tour.startEditProjectTour();
        break;
    case 'main.public_view.lyrics':
        Tour.startEditProjectTour();
        break;
    case 'main.public_view.notes':
        Tour.startEditProjectTour();
        break;
    case 'main.public_view.stablature':
        Tour.startEditProjectTour();
    break;
    }
  }

//runs the first tour by default, lets the user know that tours are available
  if(signedUp.value){
    Tour.startMainTour();
  }

}]);


