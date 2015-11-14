app.controller('HomeCtrl', ['$scope','$state', function($scope,$state) {
// the idea is to have a service that will give us 2 states loggedin / public that will change the states for what the user hits when it gets to the website

//----CODE FOR TESTING THE CLIENT WHILE WE DON'T HAVE FUNCTIONALITY IMPLEMENTED-----

  $scope.gotoPublic = function() {
    console.log('gotopublic');
    $state.go('home.public');
  }
  $scope.gotoSignedup = function() {
    console.log('gotoSignedUp');
    $state.go('home.signedup');
  }
  $scope.gotoLoggedin = function() {
    console.log('gotologgedin');
    $state.go('home.loggedin');
  }
}]);
