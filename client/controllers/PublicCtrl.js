app.controller('PublicCtrl', ['$scope', '$state', function($scope, $state) {

  //On Load go to Projects View
  if ($state.is('public')) {
    $state.go('public.landing');
  }

}]);
