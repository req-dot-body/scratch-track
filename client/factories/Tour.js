app.factory('Tour', ['$state','nzTour','$q', function($state,nzTour,$q) {
  
// Project view Tour
var projectTour = {
    config: {dark:true}, 
    steps: [{
        target: '#tour1',
        content: 'This is your menu bar!',
    }, {
        target: '#tour2',
        content: 'Takes you to public projects',
    }, {
        target: '#tour3',
        content: 'Displays all your projects',
    },{
        target: '#tour4',
        content: 'Quick access search bar',
    },{
        target: '#tour5',
        content: 'This button lets you create a new project!',
    }, {
        target: '#tour6',
        content: 'This area will display all your projects!',
        after: function(){
            var d = $q.defer();
            alertify.logPosition("bottom right")
                    .success("Go ahead and create a new project! :)")           
                    .closeLogOnClick(true) 
            d.resolve(); // or d.reject()
            return d.promise
        }
    }]
};

var startProjectTour = function () {

  nzTour.start(Tour.projectTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });
}




  return {
    startProjectTour:startProjectTour,
    
  };
}]);
