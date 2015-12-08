app.factory('Project', ['$http','$state', function($http,$state) {
  
  var endpoint = '/api/projects/';

  var getPublicProjects = function () {
    return $http.get(endpoint + 'public')
    .then((res) => res.data.projects)
    .catch((err) => console.log('Error getting public projects:', err));
  };

    // return $http.get(endpoint + 'projects')
    // .then(function (response) {
    //   console.log('Response:', response);
    //   return response.data;
    // })
    // .catch(function (err) {
    //   console.log('Error getting public projects:', err);
    // })

// api/projects/ - requires authentication, with exception of GET - :/
 
// GET - :/ - Retrieves all project files that can be accessed. If user is lacking authentication, will retrieve only public projects.
//  { projects: [{project object}, etc.]}

// POST - :/:id - Creates a new project

// GET - :/:id - Retrives info for a specific project. { id: owner_id: created_at: updated_at: name: description: }

// PUT - :/:id - Updates project info for a specific project. You may send just a name or just a description is the other is unchanged { name: description: }

// DELETE - :/:id - Deletes a specific project. Function it triggers will need logic to assess whether all collabos. have removed.

// GET - :/:id/recordings - Retrieves all recordings for a specific project { recordings: [ { id: project_id: url: created_at: name: description: }, ... ] }

// GET - :/:id/lyrics - Retrieves all lyrics for a specific project { lyrics: [ { id: project_id: text: created_at: name: }, ... ]
// }

// GET - :/:id/stablature - Retrieves all stabs for a specific project { stablature: [ { id: project_id: code: created_at: name: description: }, ... ]
// }

// GET - :/:id/notes - Retrieves all notes for a specific project { notes: [ { id: project_id: text: created_at: name: }, ... ]
// }

// if a project is just created this is set to true

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
    return $http.put('/api/projects/'+id,projectData)
    .then(function(response){

    })
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
