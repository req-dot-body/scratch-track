app.controller('PublicProjectsCtrl', PublicProjectsCtrl);

function PublicProjectsCtrl($scope, $state, Project) {
  $scope.projects = [];

  $scope.public = true;

  $scope.getProjects = function () {
    Project.getPublicProjects()
    .then(function (projects) {
      $scope.projects = projects;
    });
  };

  $scope.getProjects();

}
