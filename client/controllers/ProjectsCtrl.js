app.controller('ProjectsCtrl', ['$scope','$state','Project','nzTour','$q', function($scope,$state,Project,nzTour,$q) {

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

//Tour

var tour = {
    config: {dark:true}, 
    steps: [{
        target: '#tour1',
        content: 'This is your menu bar!',
    }, {
        target: '#tour2',
        content: 'Here you can see all the published projects!',
    }, {
        target: '#tour3',
        content: 'And here you can see your projects at any time',
    },{
        target: '#tour4',
        content: 'This is your Project Search Bar',
    }, {
        target: '#tour5',
        content: 'Here You Create a new Project!, I am going to create one for you! Enjoy!',
        before: function() {
                    var d = $q.defer();
                    d.resolve();
                    return d.promise;
                },
        after: function() {
            var d = $q.defer();
            $scope.createProject();
            d.resolve();
            return d.promise;
        }
    }]
};


nzTour.start(tour)
    .then(function() {
        console.log('Tour Finished!');
    })
    .catch(function() {
        console.log('Tour Aborted!')
    });


}]);
