app.controller('ProjectsCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//Data Structure of Projets to display
  $scope.mockProjects = [ 
    { owner_id: 1, 
      id: 1,
      created_at: '13-NOV-2015',
      updated_at: '14-NOV-2015',
      name: 'November Rain',
      description: 'The Best Song Ever'
    }, 
    { owner_id: 2,
      id:2,
      created_at: '06-FEB-2015',
      updated_at: '03-MAR-2015',
      name: 'Mamma Mia',
      description: 'The Italian Macarena'
    } 
  ]; 

  $scope.products = $scope.mockProjects;
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

// Get projects on controller loading....
  $scope.getProjects();

}]);
