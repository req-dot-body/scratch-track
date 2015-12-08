
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q','signedUp', function($scope,$state,Project, FoundationApi, nzTour, $q,signedUp) {

// Used to determine whether or not to display certain elements
$scope.public = true;
if ($state.current.authenticate) {
  $scope.public = false;
}

//gets the current project ID
projectId = $state.params.id; 


$scope.getProject = function(projectId) {
  Project.getProject(projectId)
  .then(function(response){
    $scope.projectData = response.data;
    
    if ($scope.projectData.name === null){
      $scope.projectData.name = 'MyProject: '+ projectId;
      $scope.saveProjectInfo($scope.projectData);
    }
    
    $scope.updatedInfo = {
      id: projectId,
      name: $scope.projectData.name,
      private: $scope.projectData.private,
      description: $scope.projectData.description
    }

    $scope.projectCreated = false;
    if($state.params.created){
      $scope.projectCreated = true;
    }
  })
};

$scope.getProject(projectId);

$scope.formatDate = function(date) {
  return moment.unix(date).calendar();
};

//delets a project and redirects to main view
$scope.deleteProject = function(id){
  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};
//saves the project
$scope.saveProjectInfo = function(){
  if (signedUp.value) {nzTour.start(dashTour)};

  return Project.editProject($scope.updatedInfo)
  .then(function(){
    $scope.getProject($scope.projectData.id);
  })
}

//gets all recordings 
  Project.getProjectRecordings(projectId)
  .then(function(response){
    $scope.projectRecordings = response.data;
    // console.log('recordings: ', response.data)
  })
//gets all notes 
  Project.getProjectNotes(projectId)
  .then(function(response){
    $scope.projectNotes = response.data;
      // console.log('notes: ', response.data)

  })

//gets all lyrics 
  Project.getProjectLyrics(projectId)
  .then(function(response){
    $scope.projectLyrics = response.data;
      // console.log('lyrics: ', response.data)

  })

//gets all stablatures 
  Project.getProjectStablature(projectId)
  .then(function(response){
    $scope.projectStablature = response.data;
      // console.log('stablature: ', response.data)
  })



var newProjectTour = {
    config: {dark:true}, 
    steps: [{
        target: '#tour7',
        content: 'Awsome you are rocking!',
    }, {
        target: '#tour8',
        content: 'You can make your project Public watchout! other users can edit it! default is Private',
    }, {
        target: '#tour9',
        content: 'Change the name!',
    },{
        target: '#tour10',
        content: 'Add... a description and Save when you Finish!',
  
    }]
};

var dashTour = {
    config: {dark:false}, 
    steps: [{
        target: '#tour11',
        content: 'This is your Project Dash'
    }, {
        target: '#tour12',
        content: 'New Controls you can edit your project at any time or delete it',
    }, {
        content: 'Navigate thru the components, Recordings, Lyrics, Notes and of course the "Stablature"',
        after: function(){
            var d = $q.defer();
            alertify.logPosition("bottom right")
                    .success("Go ahead and explore...")           
                    .closeLogOnClick(true) 
            d.resolve(); // or d.reject()
            return d.promise
        }
    }]
};

//Tour is only triggered if the user is just signed in
  if(signedUp.value && !$scope.public){
    nzTour.start(newProjectTour)
        .then(function() {
            console.log('Tour Finished!');
        })
        .catch(function() {
            console.log('Tour Aborted!')
        });
  }


}]);


