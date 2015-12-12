app.controller('ProjectsCtrl', ['$scope','$state','Project','signedUp','Tour', function($scope,$state,Project,signedUp,Tour) {


  // If we're in a public state or not
  $scope.public = true;
  if ($state.current.authenticate) {
    $scope.public = false;
  }

  $scope.sort = {
    sortField: 'updated_at',
    sortDirection: true
  }

  $scope.sortBy = function(field){
    if ($scope.sort.sortField === field){
      $scope.sort.sortDirection = !$scope.sort.sortDirection;
    }
    else {
      $scope.sort.sortField = field;
      $scope.sort.sortDirection = true;
    }
  };

//Get projects from Projects factory
  $scope.getProjects = function () {
    var getProjectsFn = Project.getPublicProjects;

    if (!$scope.public) {
      getProjectsFn = Project.getAllProjects;
    }

    getProjectsFn()
    .then(function(data){
      $scope.projects = data;
    }).catch(function(error){
        //case of server error getting projects 
      console.log('Error getting projects from server!');
    });
  };

//Create a project from user factory, then displaying project view  
  $scope.createProject = function () {
    Project.createProject()
    .then(function(response){
      var id = response.data.id; 
      $state.go('main.project_edit.dash', { id: id, created:true });
    }).catch(function(error){
      //if not created stay in same state
      $state.go('main.projects');
    });
  };

  $scope.deleteProject = function (projectId) {
    Project.deleteProject(projectId)
    .then(function(response){
      $scope.getProjects();
    }).catch(function(error){
      console.error(error);
    });
  };

// Get projects on controller loading
  $scope.getProjects()


}]);
