app.controller('ProjectDashCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//load delete modal
$('.modal-trigger').leanModal();

//if the project is just created show info-Form
if($state.params.created){
  $('#info-form').toggle();
  $('#info-display').toggle();
}

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


