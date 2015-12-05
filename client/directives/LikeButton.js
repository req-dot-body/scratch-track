app.directive('likebutton', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/likeButton.html',
    replace: true,
    controller: 'LikeCtrl'
  };
});