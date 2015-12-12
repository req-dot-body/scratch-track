var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q','signedUp','Tour', 
  function($scope,$state,Project, FoundationApi, nzTour, $q,signedUp,Tour) {

// Used to determine whether or not to display certain elements
$scope.public = true;
if ($state.current.authenticate) {
  $scope.public = false;
}

//gets the current project ID
$scope.projectId = $state.params.id; 

//gets project information to be loaded on different components on the view
$scope.getProject = function(projectId) {
  Project.getProject($scope.projectId)
  .then(function(response){
    $scope.projectData = response.data;

  //updates project information   
    $scope.updatedInfo = {
      id: $scope.projectId,
      name: $scope.projectData.name,
      private: $scope.projectData.private,
      description: $scope.projectData.description
    }
  //if project was just created sets this vairiable to true to be able to load the project edit modal
    $scope.projectCreated = false;
    if($state.params.created){
      $scope.projectCreated = true;
    }
  })
};

$scope.getProject($scope.projectId);
//formats the date info
$scope.formatDate = function(date) {
  return moment.unix(date).calendar();
};


//gets all recordings 
  Project.getProjectRecordings($scope.projectId)
  .then(function(response){
    $scope.projectRecordings = response.data;
  })
//gets all notes 
  Project.getProjectNotes($scope.projectId)
  .then(function(response){
    $scope.projectNotes = response.data;

  })

//gets all lyrics 
  Project.getProjectLyrics($scope.projectId)
  .then(function(response){
    $scope.projectLyrics = response.data;
  })

//gets all stablatures 
  Project.getProjectStablature($scope.projectId)
  .then(function(response){
    $scope.projectStablature = response.data;
  })

}]);


