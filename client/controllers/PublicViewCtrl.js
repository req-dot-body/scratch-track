app.controller('PublicViewCtrl', PublicViewCtrl);

function PublicViewCtrl ($scope, $state, $stateParams, Project) {
  $scope.id = $stateParams.id;

  console.log('Public View Controller hit', $scope.id);
}
