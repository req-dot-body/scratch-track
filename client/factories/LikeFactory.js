app.factory('Like', ['$http', function ($http) {

  var getLikes = function (projectId) {
    return $http.get('api/projects/' + projectId + '/like');
  }

  var like = function (projectId) {
    return $http.post('api/projects/' + projectId + '/like');
  }

  return {
    getLikes: getLikes,
    like: like
  }
  
}]);
