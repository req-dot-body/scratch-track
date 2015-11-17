app.controller('LyricCtrl', ['$scope', function($scope) {
  
  $scope.mockLyrics = [ 

   {
      project_id: 97,
      text:  'this is lyrics',
      name: 'draft1'
    },
    {
       project_id: 98,
       text:  'this is also lyrics',
       name: 'draft2'
     }
  ]; 


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


  $(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.collapsible').collapsible({
          accordion : true
    });
  });

}]);
