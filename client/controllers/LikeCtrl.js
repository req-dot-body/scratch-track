app.controller('LikeCtrl', ['$scope','$state', 'Like', function($scope, $state, Like) {

  $scope.buttonContent = 'thumb_up'
  $scope.textContent = "Like this project"

  $scope.contentToggle = function () {
    if ($scope.buttonContent === 'thumb_up') {
      $scope.buttonContent = 'thumb_down';
      $scope.textContent = "Un-like this project"
    } else {
      $scope.buttonContent = 'thumb_up';
      $scope.textContent = "Like this project"
    }
  }


  $scope.like = function () {
    //scope.project.liked will not exist if user isn't logged in; then just display likes
    /*if (!(liked in $scope.project)) {
      return $scope.buttonContent = 'thumb_up';
    } */

    if ($scope.project.liked === '1') {
      $scope.project.liked = '0';
      $scope.project.likes = parseInt($scope.project.likes) - 1;
      $scope.project.likes = $scope.project.likes.toString();
    } else {
      $scope.project.liked = '1';
      $scope.project.likes = parseInt($scope.project.likes) + 1;
      $scope.project.likes = $scope.project.likes.toString();
    }
    $scope.contentToggle();

    //send POST request to API endpoint
    Like.like($scope.project.id);
  }

  var init = function () {
    if ($scope.project.liked === '1') {
      $scope.buttonContent = 'thumb_down';
    } else {
      $scope.buttonContent = 'thumb_up';
    }
  }

  init();

}]);
