app.directive('likebutton', function() {
  return  {
    restrict: 'E',
    templateUrl: '../views/likeButton.html',
    replace: true,
    scope: {
      projectId: '=projectid'
    },
    controller: 'LikeCtrl'
  };
});