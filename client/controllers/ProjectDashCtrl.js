
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


$scope.displayRecordings = function(projectId){
  Project.getProjectRecordings(projectId)
  .then(function(response){
    $scope.projectRecordings = 'recordings'
    console.log('recordings: ', response)
  })
};

$scope.displayNotes = function(projectId){
  Project.getProjectNotes(projectId)
  .then(function(response){
    $scope.projectRecordings = 'notes'
      console.log('notes: ', response)

  })

};

$scope.displayLyrics = function (projectId) {
  Project.getProjectLyrics(projectId)
  .then(function(response){
    $scope.projectRecordings = 'lyrics'
      console.log('lyrics: ', response)

  })

};

$scope.displayStablature = function (projectId) {
  Project.getProjectStablature(projectId)
  .then(function(response){
    $scope.projectRecordings = 'stablature'
      console.log('stablature: ', response)

  })


};

$scope.displayRecordings(projectId);
$scope.displayNotes(projectId);
$scope.displayLyrics(projectId);
$scope.displayStablature(projectId);

}]);


