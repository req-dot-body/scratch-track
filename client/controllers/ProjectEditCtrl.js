app.controller('ProjectEditCtrl', ['$scope','$state','Project','signedUp', function($scope,$state,Project,signedUp) {

  $scope.state = $state;
  $scope.public = false;
  $scope.showEdit = $state.params.created;

  $scope.tempProject = {};

  if (!$state.current.authenticate) {
    $scope.public = true;
  }

  //getting current project id
  var id = $state.params.id;

  //get current project info
 $scope.getProject = function(){
  
    Project.getProject(id)
    .then(function(response){
      $scope.projectData = response.data;

      $scope.tempProject.id = $scope.projectData.id;
      $scope.tempProject.private = $scope.projectData.private;
      $scope.tempProject.name = $scope.projectData.name;
      $scope.tempProject.description = $scope.projectData.description;
    }) 
    .catch(function(err){
      console.log('There was an error loading the project, id:', id);
    });

    if($state.is('main.project_edit')){
      $state.go('main.project_edit.dash');
    } else if ($state.is('main.public_view')) {
      $state.go('main.public_view.dash');
    }
  }

  $scope.getProject();

$scope.edit = function(){
  $scope.showEdit = true; 
}

//delets a project and redirects to main view
$scope.deleteProject = function(){
  var id = $scope.projectData.id

  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};
//saves the project
$scope.saveProjectInfo = function(){
  $scope.showEdit = false;

  console.log('saving', $scope.tempProject)

  return Project.editProject($scope.tempProject)
  .then(function(){
    $scope.getProject();
  })
}

  //starts tooltips

  $('a[title]').qtip({
    position: {
        my: 'top center',
        at: 'bottom center'
    },
    style: {
        classes: 'qtip-dark'
    }
  });

    $('.sort a[title]').qtip({
    position: {
        my: 'left center',
        at: 'right'
    },
    style: {
        classes: 'qtip-dark'
    }
  });

}]);
