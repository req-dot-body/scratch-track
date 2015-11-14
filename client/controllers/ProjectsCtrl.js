app.controller('ProjectsCtrl', ['$scope', function($scope) {

this.mockProjects = [ 
  { owner_id: 1, 
    created_at: '13-NOV-2015',
    updated_at: '14-NOV-2015',
    name: 'November Rain',
    description: 'The Best Song Ever'
  }, 
  { owner_id: 2,
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
}



}]);
