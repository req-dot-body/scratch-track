app.controller('ProjectsCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//Get projects from Projects factory
  $scope.getProjects = function () {
    console.log('getting all projects')
    Project.getAllProjects()
    .then(function(data){
      console.log('Projects Data:', data)
      $scope.products = data;
    }).catch(function(error){
        //case of server error getting projects 
    })
  };

//Create a project from user factory, then displaying project view  
  $scope.createProject = function () {
    Project.createProject()
    .then(function(response){
      console.log('project created response: ',response);
      var id = response.data.id;
      $state.go('main.project_edit', { id: id });
    }).catch(function(error){
      //display a message error 
      //stay on same state
      $state.go('main.projects');
    })
  }

  $scope.deleteProject = function (projectId) {
    console.log("deleting project with ID:", projectId);
    Project.deleteProject(projectId)
    .then(function(response){
      $scope.getProjects();
    }).catch(function(error){
      console.error(error);
    })

  }

// Get projects on controller loading....
  $scope.getProjects();

}]);
