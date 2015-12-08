
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q', function($scope,$state,Project, FoundationApi, nzTour, $q) {

projectId = $state.params.id; 

Project.getProject(projectId)
.then(function(response){
  $scope.projectData = response.data;
  
  if ($scope.projectData.name === null){
    $scope.projectData.name = 'MyProject: '+ projectId;
    $scope.saveProjectInfo($scope.projectData);
  }

  $scope.projectCreated = false;
  if($state.params.created){
    $scope.projectCreated = true;
  }
})


$scope.formatDate = function(date) {
  return moment.unix(date).calendar();
};

$scope.deleteProject = function(id){
  Project.deleteProject(id)
  .then(function(){
    $state.go('main.projects')
  })
};


$scope.saveProjectInfo = function(){
  Project.editProject($scope.projectData)
};

//gets all recordings 
  Project.getProjectRecordings(projectId)
  .then(function(response){
    $scope.projectRecordings = response.data;
    // console.log('recordings: ', response.data)
  })
//gets all notes 
  Project.getProjectNotes(projectId)
  .then(function(response){
    $scope.projectNotes = response.data;
      // console.log('notes: ', response.data)

  })

//gets all lyrics 
  Project.getProjectLyrics(projectId)
  .then(function(response){
    $scope.projectLyrics = response.data;
      // console.log('lyrics: ', response.data)

  })

//gets all stablatures 
  Project.getProjectStablature(projectId)
  .then(function(response){
    $scope.projectStablature = response.data;
      // console.log('stablature: ', response.data)
  })


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

// var newProjectTour = {
//     config: {dark:true}, 
//     steps: [{
//         target: '#tour7',
//         content: 'Awsome you are rocking!',
//     }, {
//         target: '#tour8',
//         content: 'You can make your project Public watchout! other users can edit it! default is Private',
//     }, {
//         target: '#tour9',
//         content: 'Change the name!',
//     },{
//         target: '#tour10',
//         content: 'Add... a description and Save when you Finish!',
//         after: function(){
//             var d = $q.defer();
//             alertify.logPosition("bottom right")
//                     .log("Save Your changes!")           
//                     .closeLogOnClick(true) 
//             d.resolve(); // or d.reject()
//             return d.promise
//         }
//     }]
// };

//Tour is only triggered if the user is just signed in
  if(!$state.params.signedUp){

    nzTour.start(newProjectTour)
        .then(function() {
          nzTour(dashTour)
            console.log('Tour Finished!');
        })
        .catch(function() {
            console.log('Tour Aborted!')
        });
  }


}]);


