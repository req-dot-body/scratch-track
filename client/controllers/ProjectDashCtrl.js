
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', function($scope,$state,Project, FoundationApi) {

Project.getProject($state.params.id)
.then(function(response){
  $scope.projectData = response.data;
  $scope.projectCreated = false;
  if($state.params.created || $scope.projectData.name === null){
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


$scope.displayRecordings = function(recordings){

};

$scope.displayNotes = function(notes){

};

$scope.displayLyrics = function (lyrics) {

};

$scope.displayStablature = function (stablature) {

};


}]);


