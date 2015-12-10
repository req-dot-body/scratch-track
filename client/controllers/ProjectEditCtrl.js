app.controller('ProjectEditCtrl', ['$scope','$state','Project','signedUp', function($scope,$state,Project,signedUp) {

  $scope.state = $state;

  $scope.public = false;


  if (!$state.current.authenticate) {
    $scope.public = true;
  }

  //getting current project id
  var id = $state.params.id;
  //get current project info
  Project.getProject(id)
  .then(function(response){
    $scope.projectData = response.data;
  }) 
  .catch(function(err){
    console.log('There was an error loading the project, id:', id);
  });

  if($state.is('main.project_edit')){
    $state.go('main.project_edit.dash');
  } else if ($state.is('main.public_view')) {
    $state.go('main.public_view.dash');
  }

}]);
