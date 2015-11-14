app.controller('ProjectEntryCtrl', ['$scope','Project', function($scope, Project) {
  $scope.projects = [{
    owner_id: 1231351 ,
    created_at: "06/06/06",
    updated_at: "11/10/15",
    name: "Demo project",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
  },{
    owner_id: 12312351 ,
    created_at: "06/16/06",
    updated_at: "11/9/15",
    name: "Demo project 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
  }];

  //$scope.projects should be populated by calling $scope.getProjectData()

  //this fn may need additional logic depending on final shape of data from server 
  var getProjectData = function () {
    Project.getProjects().
      success(function(projects){
        $scope.projects = projects;
      })
      .error(function(error){
        $scope.status = "Unable to load project data: " + error.message;
      });
  };

  getProjectData();
}]);
