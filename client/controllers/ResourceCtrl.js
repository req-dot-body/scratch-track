var moment = require('moment/moment');

app.controller('ResourceCtrl', ['$scope', '$state', '$timeout', 'Project', function($scope, $state, $timeout, Project) {

  $scope.sortBy = function(field){
    if ($scope.sortField === field){
      $scope.sortDirection = !$scope.sortDirection;
    }
    else {
      $scope.sortField = field;
      $scope.sortDirection = true;  
    }
  };
  
 $scope.formatDate = function(date) {
   return moment.unix(date).calendar();
 };
  
}]);