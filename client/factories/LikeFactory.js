app.factory('Like', ['$http', function ($http) {

  var like = function (projectId) {
    return $http.post('api/projects/', + projectId + '/like');
  }

  return {
    like: like
  }
  
}]);
