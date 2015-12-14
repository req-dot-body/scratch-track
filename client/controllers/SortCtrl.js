app.controller('SortCtrl', ['$scope', function($scope) {

  //starts tooltips on sort 

  $('a[title]').qtip({
    position: {
        my: 'top center',
        at: 'bottom center'
    },
    style: {
        classes: 'qtip-dark'
    }
  });

  $('.sort a[title]').qtip({
    position: {
        my: 'left center',
        at: 'right'
    },
    style: {
        classes: 'qtip-dark'
    }
  });

    $('.project-title[title]').qtip({
    position: {
        my: 'left center',
        at: 'right center'
    },
    style: {
        classes: 'qtip-dark'
    }
  });

}]);
