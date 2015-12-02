
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', function($scope,$state,Project, FoundationApi) {

projectId = $state.params.id; 


Project.getProject(projectId)
.then(function(response){
  $scope.projectData = response.data;
  
  if ($scope.projectData.name === null){
    $scope.projectData.name = 'MyProject: '+ projectId;
    $scope.saveProjectInfo($scope.projectData);
  }

  $scope.projectCreated = false;
  if($state.params.created){
    $scope.projectCreated = true;
  }
})


$scope.formatDate = function(date) {
  return moment.unix(date).calendar();
};

$scope.deleteProject = function(id){
  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};


$scope.saveProjectInfo = function(){
  Project.editProject($scope.projectData)
};

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


