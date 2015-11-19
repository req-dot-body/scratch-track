app.controller('ProjectDashCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//load delete modal
$('.modal-trigger').leanModal();

$scope.deleteProject = function(id){

  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
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


