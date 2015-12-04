app.directive('likebutton', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/likeButton.html',
    controller: 'LikeCtrl'
  };
});