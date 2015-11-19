// var vextab = require('vextab');
app.controller('ProjectEditCtrl', ['$scope','$state','Project', function($scope,$state,Project) {

//getting current project id
var id = $state.params.id

//get current project info
Project.getProject(id)
.then(function(response){
  $scope.pdata = response.data;
}) 
.catch(function(err){
  console.log('there was an error loading the project, id: ', id);
})

$state.go('main.project_edit.dash');


$scope.deleteProject = function(id){

};

$scope.displayRecordings = function(recordings){

};

$scope.displayNotes = function(notes){

};

$scope.displayLyrics = function (lyrics) {

};

$scope.displayStablature = function (stablature) {

};


// VexTab = vextab.VexTab;
// Artist = vextab.Artist;
// Renderer = vextab.Vex.Flow.Renderer;

// // Create VexFlow Renderer from canvas element with id #boo.
// renderer = new Renderer($('#boo')[0], Renderer.Backends.CANVAS);

// // Initialize VexTab artist and parser.
// artist = new Artist(10, 10, 600, {scale: 0.8});
// vextab = new VexTab(artist);

// try {
//   // Parse VexTab music notation passed in as a string.
//   vextab.parse("tabstave notation=true\n notes :q 4/4\n")

//   // Render notation onto canvas.
//   artist.render(renderer);
// } catch (e) {
//   console.log(e);
// }


}]);
