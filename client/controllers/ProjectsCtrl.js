app.controller('ProjectsCtrl', ['$scope','$state','Project','nzTour','$q', function($scope,$state,Project,nzTour,$q) {

  console.log('Current state:', $state.current);

//Get projects from Projects factory
  $scope.getProjects = function () {
    Project.getAllProjects()
    .then(function(data){
      $scope.projects = data;
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

//Tour

var projectTour = {
    config: {dark:true}, 
    steps: [{
        target: '#tour1',
        content: 'This is your menu bar!',
    }, {
        target: '#tour2',
        content: 'Takes you to public projects',
    }, {
        target: '#tour3',
        content: 'Displays all your projects',
    },{
        target: '#tour4',
        content: 'Quick access search bar',
    },{
        target: '#tour5',
        content: 'This button lets you create a new project!',
    }, {
        target: '#tour6',
        content: 'This area will display all your projects!',
        after: function(){
            var d = $q.defer();
            alertify.logPosition("bottom right")
                    .success("Go ahead and create a new project! :)")           
                    .closeLogOnClick(true) 
            d.resolve(); // or d.reject()
            return d.promise
        }
    }]
};

//Tour is only triggered if the user is just signed in
  if(false){
    nzTour.start(projectTour)
        .then(function() {
            console.log('Tour Finished!');
        })
        .catch(function() {
            console.log('Tour Aborted!')
        });
  }


}]);
