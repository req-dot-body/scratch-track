app.controller('PublicCtrl', ['$scope', '$state', function($scope, $state) {
  //On Load go to Projects View
  $state.go('public.landing');

}]);
