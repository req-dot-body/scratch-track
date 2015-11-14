app.factory('Project', ['$http', function($http) {

  var filepath = '/api/users' + userId;
  var userId;
  var projectDataFactory = {};

  projectDataFactory.getProjects = function(){
    return $http.get(filepath + '/projects');
  } 


  return projectDataFactory;
}]);
