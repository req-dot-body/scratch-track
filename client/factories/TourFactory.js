app.factory('Tour', ['$state','nzTour','$q', function($state,nzTour,$q) {
  
  
  //MAIN TOUR
  var mainTour = {
      config: {dark:false}, 
      steps: [{
          target: '',
          content: 'Hello There!, Thanks for being part the Scratch.Track Comunity',
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


  var startMainTour = function () {

    nzTour.start(mainTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });
  };



  // PROJECT VIEW TOUR
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

    nzTour.start(projectTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });
  };

  //DASH VIEW TOURS
  var newProjectTour = {
      config: {dark:true}, 
      steps: [{
          target: '#tour7',
          content: 'Awsome you are rocking!',
      }, {
          target: '#tour8',
          content: 'You can make your project Public watchout! other users can edit it! default is Private',
      }, {
          target: '#tour9',
          content: 'Change the name!',
      },{
          target: '#tour10',
          content: 'Add... a description and Save when you Finish!',
    
      }]
  };

  var dashTour = {
      config: {dark:false}, 
      steps: [{
          target: '#tour11',
          content: 'This is your Project Dash'
      }, {
          target: '#tour12',
          content: 'New Controls you can edit your project at any time or delete it',
      }, {
          content: 'Navigate thru the components, Recordings, Lyrics, Notes and of course the "Stablature"',
          after: function(){
              var d = $q.defer();
              alertify.logPosition("bottom right")
                      .success("Go ahead and explore...")           
                      .closeLogOnClick(true) 
              d.resolve(); // or d.reject()
              return d.promise
          }
      }]
  };

  var startDashTour = function () {

    nzTour.start(newProjectTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });

  }


// var projectEditTour = {
//     config: {dark:true}, 
//     steps: [{
//         target: '#tour13',
//         content: 'Look! a control bar, You can jump from one component to the other or go back to the dash',
//     }, {
//         target: '#tour14',
//         content: 'This is your main working area!',
//         after: function(){
//             var d = $q.defer();
//             alertify.logPosition("bottom right")
//                     .success("Thanks, We hope you enjoy the Scratch.Track ;)")           
//                     .closeLogOnClick(true) 
//             d.resolve(); // or d.reject()
//             return d.promise
//         }
        
//     }]
// };


  return {
    startProjectTour:startProjectTour,
    startDashTour:startDashTour,
    startMainTour:startMainTour
    
  }

}]);
