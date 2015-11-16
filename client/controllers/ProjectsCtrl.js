app.controller('ProjectsCtrl', ['$scope','$state', function($scope,$state) {

this.mockProjects = [ 
  { owner_id: 1, 
    id: 1,
    created_at: '13-NOV-2015',
    updated_at: '14-NOV-2015',
    name: 'November Rain',
    description: 'The Best Song Ever'
  }, 
  { owner_id: 2,
    id:2,
    created_at: '06-FEB-2015',
    updated_at: '03-MAR-2015',
    name: 'Mamma Mia',
    description: 'The Italian Macarena'
  } 
]; 

this.products = this.mockProjects;

this.getProjects = function () {
  //Ajax Call to get all the Projects
  //.then we get the response and set this.products
    // this.products = res.body;
};

this.getProject = function(id) {
  console.log('getting project from the server ID: ', id)
  //Ajax call to get indiidual project
  //.then
  //this.displayProject(res.body)
  this.displayProject();
};

this.displayProject = function(project){
  console.log('displaying project')
  $state.go('main.project_edit')

};



}]);
