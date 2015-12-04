app.factory('Like', ['$http', function($http) {

  var like = function (id) {
    

    return $http.post('api/resources/lyrics', data);
  }

  var unlike = function (id) {
    return $http.get('api/resources/lyrics/'+ id);
  }

  var hasLiked = function () {

  }


  return {
    like: like,
    unlike: unlike,
    hasLiked: hasLiked
  }
  
}]);
