app.controller('PublicCtrl', ['$scope','$state', function($scope,$state) {
  console.log('Public Controller hitted')
  //On Load go to Projects View
  $state.go('public.landing');

}])