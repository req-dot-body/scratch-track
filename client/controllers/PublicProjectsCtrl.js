app.controller('PublicProjectsCtrl', PublicProjectsCtrl);

function PublicProjectsCtrl($scope, $state, Project) {
  console.log('Public projects controller, state:', $state.current);

  $scope.projects = [];


  $scope.getProjects = function () {
    Project.getPublicProjects()
    .then(function (projects) {
      $scope.projects = projects;
    });
  };

  $scope.getProjects();

}
