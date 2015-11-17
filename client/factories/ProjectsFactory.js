app.factory('Project', ['$http','$state', function($http,$state) {
  
//sends request to the server to get all projects
  var getAllProjects = function (){
    
    return $http.get('/api/projects')
    .then(function(response){
        console.log(response.body);
        return response.body;
    })
    .catch(function(err){
      return err;
    });
  
  };

//sends request to create a new project to the server 
  var createProject = function (){
    
    return $http.post('/api/projects')
    .then(function(response){
        return response;
    })
    .catch(function(err){
        return err;
    });
  };

  return {
    getAllProjects:getAllProjects,
    createProject:createProject
  }

}]);