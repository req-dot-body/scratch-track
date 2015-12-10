app.controller('LikeCtrl', ['$scope','$state', 'Like', 'Auth',
  function($scope, $state, Like, Auth) {

  $scope.buttonStyle = "active"
  $scope.textContent = "Like this project"
  $scope.textContent2 = "likes"
  $scope.loggedIn = Auth.isLoggedIn();

  $scope.project = {};

  var setDisplay = function(){
    if ($scope.project.likes === "1") {
      $scope.textContent2 = "like";
    } else {
      $scope.textContent2 = 'likes';
    }

    if ($scope.project.liked === '1') {
      $scope.buttonStyle = "inactive"
      $scope.textContent = "Un-like this project"
    } else {
      $scope.buttonStyle = "active"
      $scope.textContent = "Like this project"
    }
  }

  var getLikeData = function () {
    return Like.getLikes($scope.projectId)
    .then(function(res){
      var info = res.data;

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
