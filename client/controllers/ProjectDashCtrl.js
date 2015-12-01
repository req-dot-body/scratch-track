var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//load delete modal
// TODO : commented out because of foundation
// $('.modal-trigger').leanModal();

//if the project is just created show info-Form
if($state.params.created){
  $('#info-form').toggle();
  $('#info-display').toggle();
}

$scope.formatDate = function(date) {
  return moment.unix(date).calendar();
};

$scope.deleteProject = function(id){

  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};

$scope.toggleInfoForm = function(){
  $('#info-form').toggle();
  $('#info-display').toggle();
};

$scope.saveProjectInfo = function(){
  Project.editProject($scope.projectData)
  .then(function(){
    $('#info-form').toggle();
    $('#info-display').toggle();    
  })

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


