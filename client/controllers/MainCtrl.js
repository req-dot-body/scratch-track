app.controller('MainCtrl', ['$scope','$state','User', function($scope,$state,User) {
  console.log('Main Controller hitted')
  //On Load go to Projects View
  $state.go('main.projects');

  $scope.logOut = function () {
    User.logOut();
  } 

}])


