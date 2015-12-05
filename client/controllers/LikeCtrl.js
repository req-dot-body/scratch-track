app.controller('LikeCtrl', ['$scope','$state', 'Like', function($scope, $state, Like) {


  $scope.likeCount;

  $scope.buttonContent = 'thumb_up'

  $scope.buttonToggle = function () {
    if ($scope.buttonContent === 'thumb_up') {
      $scope.buttonContent = 'thumb_down';
    } else {
      $scope.buttonContent = 'thumb_up';
    }
  }

  $scope.isLiked = function (id) {
    Like.likeCount()
    //call server via factory
    //if user hasn't liked, do nothing
    //if user has already liked, replace thumb_up with thumb_down
  }

  $scope.like = function (id) {
    //send GET request to API endpoint
    //retrieve like count
    //toggle buttons
  }


  $scope.isLiked();

}]);
