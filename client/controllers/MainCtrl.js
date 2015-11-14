
app.controller('MainCtrl', ['$scope','$state', function($scope,$state) {
  console.log('Main Controller hitted')

  $scope.gotoProjects = function(){
    console.log('displaying Projects view')
    //logic to hit the projects page for now
    $state.go('home.loggedin')
  }

  $scope.logOut = function(){
    console.log('logging out')
    // function to erase cookie here 
    $state.go('home.public');
  }
}])


