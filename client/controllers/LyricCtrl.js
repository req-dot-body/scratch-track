app.controller('LyricCtrl', ['$scope', function($scope) {
  
  $scope.toggleEditable = function(id) {
    var el = document.getElementById(id);

    if (el.hasAttribute('readOnly')) {
      el.removeAttribute('readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Save";
    }
    else {
      el.setAttribute('readOnly', 'readOnly');
      document.getElementById('edit-lyrics-btn').innerHTML="Edit";
    }
  };

}]);
