
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q','signedUp', function($scope,$state,Project, FoundationApi, nzTour, $q,signedUp) {

// Used to determine whether or not to display certain elements
$scope.public = true;
if ($state.current.authenticate) {
  $scope.public = false;
}

//gets the current project ID
projectId = $state.params.id; 

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

//gets information of project and saves it for the controller
Project.getProject(projectId)
.then(function(response){
  $scope.projectData = response.data;
  //declares data for editing window in dash view
  $scope.editData = {
        name:$scope.projectData.name,
        description:$scope.projectData.description
  };
  //if project does not have a name it will add a nave to it
  if ($scope.projectData.name === null){
    $scope.projectData.name = 'MyProject: '+ projectId;
    $scope.saveProjectInfo($scope.projectData);
  }
  //this variable allows to know if the project was just created, if this happen the view will open a model to allow user to put information about it
  $scope.projectCreated = false;
  if($state.params.created){
    $scope.projectCreated = true;
  }
})

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


}]);


