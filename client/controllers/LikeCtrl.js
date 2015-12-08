app.controller('LikeCtrl', ['$scope','$state', 'Like', '$http', 
  function($scope, $state, Like, $http) {

  $http.put('api/projects/' + $scope.project.id, {private: 0})

  $scope.buttonContent = 'thumb_up'
  $scope.textContent = "Like this project"
  $scope.textContent2 = "likes"

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
    $scope.contentToggle();

    if ($scope.project.likes === "1") {
      $scope.textContent2 = "like";
    } else {
      $scope.textContent2 = "likes";
    }
    //send POST request to API endpoint
    return Like.like($scope.project.id)
    .then(function(){
      return Like.getLikes($scope.project.id)
    })
    .then(function(res){
      var info = res.data[0]
      console.log('info', info);
      $scope.project.likes = info.likes;
      $scope.project.liked = info.liked;
    })
  }

  var init = function () {
    if ($scope.project.likes === "1") {
      $scope.textContent2 = "like";
    }

    if ($scope.project.liked === '1') {
      $scope.buttonContent = 'thumb_down';
    } else {
      $scope.buttonContent = 'thumb_up';
    }
  }

  init();

}]);
