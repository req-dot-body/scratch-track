app.controller('ProjectsCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//Get projects from Projects factory
  $scope.getProjects = function () {
    Project.getAllProjects()
    .then(function(data){
      $scope.projects = data;
      console.log('this are the projects: ', data)
    }).catch(function(error){
        //case of server error getting projects 
    })
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
    })
  }

  $scope.deleteProject = function (projectId) {
    Project.deleteProject(projectId)
    .then(function(response){
      $scope.getProjects();
    }).catch(function(error){
      console.error(error);
    })
  }

// Get projects on controller loading
  $scope.getProjects()

}]);
