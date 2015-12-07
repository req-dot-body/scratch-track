app.controller('PublicViewCtrl', PublicViewCtrl);

function PublicViewCtrl ($scope, $state, $stateParams, Project) {
  $scope.id = $stateParams.id;

  $scope.public = true;

  $scope.projectData = {};

  Project.getProject($scope.id)
  .then((res) => {
    $scope.projectData = res.data;
  });

  console.log('Public View Controller hit', $scope.id);
}
