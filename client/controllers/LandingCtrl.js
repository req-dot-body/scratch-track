app.controller('LandingCtrl', ['$scope', function($scope) {
  console.log('Lading Controller hitted')

  $scope.code = "tabstave notation=false \n notes 4-5/3";
  $scope.message = "But, at last, when turning to the eastward," + 
    "the Cape winds began howling around us, and we rose and fell upon the long, " +
    "troubled seas that are there; when the ivory-tusked Pequod sharply bowed to the blast, " +
    "and gored the dark waves in her madness, till, like showers of silver chips, " +
    "the foam-flakes flew over her bulwarks; then all this desolate vacuity of life went away, " +
    "but gave place to sights more dismal than before.";
}]);