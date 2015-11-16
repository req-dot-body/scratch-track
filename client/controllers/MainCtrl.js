
app.controller('MainCtrl', ['$scope','$state', function($scope,$state) {
  console.log('Main Controller hitted')

  $scope.gotoProjects = function(){
    console.log('displaying Projects view')
    //logic to hit the projects page for now
    $state.go('main.projects')
  }

  $scope.gotoProjectEdit = function(){
    console.log('displaying Projects Edit view')
    //logic to hit the projects page for now
    $state.go('main.project_edit')
  }

  $scope.gotoProjectEntry = function(){
    console.log('displaying Projects Entry view')
    //logic to hit the projects page for now
    $state.go('main.project_entry')
  }

  $scope.logOut = function(){
    console.log('logging out')
    // function to erase cookie here 
    $state.go('main.logout');
  }
}])


