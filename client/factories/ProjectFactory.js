app.factory('Project', ['$http','$state', function($http,$state) {
  
  var endpoint = '/api/projects/';

  var getPublicProjects = function () {
    return $http.get(endpoint + 'public')
    .then((res) => {
      return res.data.projects;
    })
    .catch((err) => console.log('Error getting public projects:', err));
  };

//sends request to the server to get all projects
  var getAllProjects = function (){
    
    return $http.get('/api/projects')
    .then(function(response){
        return response.data.projects;
    })
    .catch(function(err){
      console.log('getAllProjects err: ', err);
    });
  
  };

//sends request to create a new project to the server 
  var createProject = function (){
    
    return $http.post('/api/projects')
    .then(function(response){
      console.log('Project Created');
      return response;   
    })
    .catch(function(err){
      console.log('createProject err: ', err);
    });

  };

//gets individual project
  var getProject = function(projectId) {
    console.log('being called?')
    return $http.get('/api/projects/'+projectId)
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getProject err: ', err);
    });
  };

//edits current project
  var editProject = function(projectData) {
    var id = projectData.id;
    return $http.put('/api/projects/'+id, projectData)
    .catch(function(err){
      console.log('editProject err: ', err);
    });
  };

//deletes current project
  var deleteProject = function (projectId) {
    return $http.delete('/api/projects/' + projectId)
    .then(function(response){

    })
    .catch(function(err){
      console.log('deleteProject err: ', err);
    });
  };

//get current project recordings
  var getProjectRecordings = function(projectId) {
    return $http.get('/api/projects/'+projectId+'/recordings')
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getProjectRecordings err: ', err);
    });
  };

//get current project recordings
  var getProjectLyrics = function(projectId) {
    return $http.get('/api/projects/'+projectId+'/lyrics')
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getProjectLyrics err: ', err);
    });
  };

//get current project stablature
  var getProjectStablature = function(projectId) {
    return $http.get('/api/projects/'+projectId+'/stablature')
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getProjectStablature err: ', err);
    });
  };

//get current project notes
  var getProjectNotes = function(projectId) {
    return $http.get('/api/projects/'+projectId+'/notes')
    .then(function(response){
      return response;
    })
    .catch(function(err){
      console.log('getProjectNotes err: ', err);
    });
  };



  return {
    getPublicProjects: getPublicProjects,
    getAllProjects:getAllProjects,
    createProject:createProject,
    getProject:getProject,
    editProject:editProject,
    deleteProject:deleteProject,
    getProjectRecordings:getProjectRecordings,
    getProjectLyrics:getProjectLyrics,
    getProjectStablature:getProjectStablature,
    getProjectNotes:getProjectNotes
  };

}]);
