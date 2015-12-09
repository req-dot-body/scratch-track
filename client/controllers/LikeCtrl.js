app.controller('LikeCtrl', ['$scope','$state', 'Like', '$http', 
  function($scope, $state, Like, $http) {

  $scope.buttonContent = 'thumb_up'
  $scope.textContent = "Like this project"
  $scope.textContent2 = "likes"

  $scope.project = {};

  var setDisplay = function(){
    if ($scope.project.likes === "1") {
      $scope.textContent2 = "like";
    } else {
      $scope.textContent2 = 'likes';
    }

    if ($scope.project.liked === '1') {
      $scope.buttonContent = 'thumb_up';
      $scope.textContent = "Unlike this project"
    } else {
      $scope.buttonContent = 'thumb_down';
      $scope.textContent = "Like this project"
    }
  }

  var getLikeData = function () {
      console.log('about to get like data')
    return Like.getLikes($scope.projectId)
    .then(function(res){
      var info = res.data[0];

      $scope.project.likes = info.likes;
      $scope.project.liked = info.liked;

      setDisplay();
    })
  }

  $scope.like = function () {
    //send POST request to API endpoint
    return Like.like($scope.projectId)
    .then(function(){
      return getLikeData();
    })
  }

  getLikeData();
}]);
