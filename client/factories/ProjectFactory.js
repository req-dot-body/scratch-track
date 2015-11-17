app.factory('Project', ['$http','$state', function($http,$state) {
  
//sends request to the server to get all projects
  var getAllProjects = function (){
    
    return $http.get('/api/projects')
    .then(function(response){
      if (response.status === 200) { 
        return response.body;
      } else {
        return false;
      }
    });
  
  };

//sends request to create a new project to the server 
  var createProject = function (){
    
    return $http.post('/api/projects')
    .then(function(response){
      console.log('Creating Project', response);
      if (response.status === 200) {
        console.log('Project Created')
        return response;
      } else {
        return false;
      }
    });
  
  };

  return {
    getAllProjects:getAllProjects,
    createProject:createProject
  }

}]);

