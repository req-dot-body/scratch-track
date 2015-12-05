
var moment = require('moment/moment');

app.controller('ProjectDashCtrl', ['$scope','$state','Project', 'FoundationApi', 'nzTour','$q', function($scope,$state,Project, FoundationApi, nzTour, $q) {

projectId = $state.params.id; 

$scope.testRecording = {
  name: "a recording",
  description: "that's pretty much all there is to it",
  url: "https://scratch-track.s3.amazonaws.com/recordings/a39c9438-00e2-4f44-9261-36044cce02fb.wav"
}

$scope.testLyrics = { 
  text: 'Darkness at the break of noon'+
'\nShadows even the silver spoon'+
'\nThe handmade blade, the child\'s balloon'+
'\nEclipses both the sun and moon' +
'\nTo understand you know too soon' +
'\nThere is no sense in trying.'+
'\n '+
'\nPointed threats, they bluff with scorn'+
'\nSuicide remarks are torn'+
'\nFrom the fools gold mouthpiece'+
'\nThe hollow horn plays wasted words'+
'\nProved to warn'+
'\nThat he not busy being born'+
'\nIs busy dying.'+
'\n'+
'\nTemptation\'s page flies out the door'+
'\nYou follow, find yourself at war'+
'\nWatch waterfalls of pity roar'+
'\nYou feel to moan but unlike before'+
'\nYou discover'+
'\nThat you\'d just be'+
'\nOne more person crying.'+
'\n'+
'\nSo don\'t fear if you hear'+
'\nA foreign sound to you ear'+
'\nIt\'s alright, Ma, I\'m only sighing.',
  created_at: 150817546,
  name: 'It\'s Alright Ma',
  description: 'a little something I came up with'    
};


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


//Tour

var tour = {
    config: {dark:true}, 
    steps: [{
        target: '#tour6',
        content: 'Your project can be either Public(anybody can see it) or Private, Default is private',
    }, {
        target: '#tour7',
        content: 'Put A name and description!, then click next...',
    }, {
        target: '#tour8',
        content: 'And here you can see your projects at any time',
    },{
        target: '#tour9',
        content: 'This is your Project Search Bar',
    }, {
        target: '#tour10',
        content: 'Here You Create a new Project!, I am going to create one for you! Enjoy!',
        before: function() {
                    var d = $q.defer();
                    d.resolve();
                    return d.promise;
                },
        after: function() {
            var d = $q.defer();
            $scope.createProject();
            d.resolve();
            return d.promise;
        }
    }]
};

nzTour.start(tour)
    .then(function() {
        console.log('Tour Finished!');
    })
    .catch(function() {
        console.log('Tour Aborted!')
    });



}]);


