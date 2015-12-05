app.factory('Like', ['$http', function($http) {

  var likeCount = function (userId, projectId) {
    //retrieves total like count for a project 
    //& whether the specific user has liked this project
    //return $http.get('api/projects/public')
    /*return {
      project_id: ,
      created_at: 91283144,
      likeCount: 42
    };*/
  }

  var like = function (userId, projectId) {
    //if hasLiked=true, decrement
    //else, increment
    //disable button

    return $http.post('api/projects/', + projectId + '/like');
  }

  return {
    likeCount: likeCount,
    like: like
  }
  
}]);
