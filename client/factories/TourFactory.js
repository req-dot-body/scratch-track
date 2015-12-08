app.factory('Tour', ['$state','nzTour','$q','signedUp', function($state,nzTour,$q,signedUp) {

  //MAIN TOUR
  var mainTour = {
      config: {dark:false}, 
      steps: [{
          target: '#tour0',
          content: 'Hello There!, this is Scratch.Track',
      }, {
          target: '#tour1',
          content: 'We have prepared a Tour thru our app, if you feel lost jus click here!',
          after: function(){
              var d = $q.defer();
              alertify.logPosition("bottom right")
                      .success("Thanks for becoming a member, we hope you enjoy the App")           
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
      config: {dark:false}, 
      steps: [{
          target: '#tour3',
          content: 'This is your menu bar!',
      }, {
          target: '#tour4',
          content: 'There are two kinds of projects, Public, wich are shared across all the users',
      }, {
          target: '#tour5',
          content: 'And Private where we are right now!, these projects only belong to you',
      },{
          target: '#tour6',
          content: 'This is the working area, you can find all your projects here',
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

  // PUBLIC PROJECT VIEW TOUR
  var publicProjectTour = {
      config: {dark:false}, 
      steps: [{
          target: '#tour3',
          content: 'This is your menu bar!',
      }, {
          target: '#tour4',
          content: 'There are two kinds of projects, Public, wich are shared across all the users',
      }, {
          target: '#tour5',
          content: 'And Private wich only belong to you',
      },{
          target: '#tour6',
          content: 'All the public projects are displayed here',
      },{ 
          target: '#search-input',
          content: 'You can search them here!, go ahead and look around!', 
      }]
  };


  var startPublicProjectTour = function () {

    nzTour.start(publicProjectTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });
  };

  //DASH VIEW TOURS

  var dashTour = {
      config: {dark:false}, 
      steps: [{
          target: '#tour6',
          content: 'The Dash Board, the home of each project'
      }, {
          target: '#tour7',
          content: 'The control bar allows you to edit your project info or delete it',
      }, {
          target: '#tour8',
          content: 'Record your music in audio files, this is where you Rock & Roll',
      }, {
      target: '#tour9',
          content: 'Lyrics, write down those vocals',
      }, {
      target: '#tour10',
          content: 'Notes, Basically a Notepad where you keep track of your thoughts',
      }, {
      target: '#tour11',
          content: 'The "Stablature" creating music tabs have never been easier! Check this out! ',  
      }]
  };

  var startDashTour = function () {

    nzTour.start(dashTour)
          .then(function() {
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });

  }

  //DASH VIEW TOURS

  var editProjectTour = {
      config: {dark:false}, 
      steps: [{
          target: '#tour12',
          content: 'This control bar allows you to move between the elements of your project when not in the dash'
      }, {
          target: '#tour13',
          content: 'Here you can go back to you dash at anytime',
      }, {
          target: '#tour6',
          content: "Lastly this is your working area, is pretty similar among the different tools!, that's it! Enjoy Scratch.Track",
      }]
  };

  var startEditProjectTour = function () {

    nzTour.start(editProjectTour)
          .then(function() {
              signedUp.value = false;
              console.log('Tour Finished!');
          })
          .catch(function() {
              console.log('Tour Aborted!')
          });

  }

  return {
    startProjectTour:startProjectTour,
    startPublicProjectTour:startPublicProjectTour,
    startDashTour:startDashTour,
    startMainTour:startMainTour,
    startEditProjectTour:startEditProjectTour    
  }

}]);
