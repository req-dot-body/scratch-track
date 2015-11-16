
app.controller('MainCtrl', ['$scope','$state', function($scope,$state) {
  console.log('Main Controller hitted')
  //On Load go to Projects View
  $state.go('main.projects');

}])


