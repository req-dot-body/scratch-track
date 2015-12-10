var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q','signedUp','Tour', function($scope,$state,Project, FoundationApi, nzTour, $q,signedUp,Tour) {

// Used to determine whether or not to display certain elements
$scope.public = true;
if ($state.current.authenticate) {
  $scope.public = false;
}

//gets the current project ID
$scope.projectId = $state.params.id; 
console.log('projectId', $scope.projectId, 'params', $state.params);

$scope.showEdit = function(){
  $scope.projectCreated = true; 
}

//THIS IS MOCK DATA AND SHOULD BE DELETED
$scope.testRecording = {
  name: "a recording",
  description: "that's pretty much all there is to it",
  url: "https://scratch-track.s3.amazonaws.com/recordings/a39c9438-00e2-4f44-9261-36044cce02fb.wav"
}

$scope.testLyrics = { 
  text: 'Darkness at the break of noon'+
'\nShadows even the silver spoon'+
'\nThe handmade blade, the child\'s balloon'+
'\nEclipses both the sun and moon' +
'\nTo understand you know too soon' +
'\nThere is no sense in trying.'+
'\n '+
'\nPointed threats, they bluff with scorn'+
'\nSuicide remarks are torn'+
'\nFrom the fools gold mouthpiece'+
'\nThe hollow horn plays wasted words'+
'\nProved to warn'+
'\nThat he not busy being born'+
'\nIs busy dying.'+
'\n'+
'\nTemptation\'s page flies out the door'+
'\nYou follow, find yourself at war'+
'\nWatch waterfalls of pity roar'+
'\nYou feel to moan but unlike before'+
'\nYou discover'+
'\nThat you\'d just be'+
'\nOne more person crying.'+
'\n'+
'\nSo don\'t fear if you hear'+
'\nA foreign sound to you ear'+
'\nIt\'s alright, Ma, I\'m only sighing.',
  created_at: 150817546,
  name: 'It\'s Alright Ma',
  description: 'a little something I came up with'    
};

//gets project information to be loaded on different components on the view
$scope.getProject = function(projectId) {
  Project.getProject($scope.projectId)
  .then(function(response){
    $scope.projectData = response.data;
  //if project does not have a name value, assings a default   
    if ($scope.projectData.name === null){
      $scope.projectData.name = 'MyProject: '+ $scope.projectId;
      $scope.saveProjectInfo($scope.projectData);
    }
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

//delets a project and redirects to main view
$scope.deleteProject = function(id){
  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};
//saves the project
$scope.saveProjectInfo = function(){
  return Project.editProject($scope.updatedInfo)
  .then(function(){
    $scope.getProject($scope.projectData.id);
  })
}

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


