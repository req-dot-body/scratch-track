app.factory('Resource', ['$http', '$timeout', function($http, $timeout) {


var moment = require('moment/moment');

var sort = {
  sortField: '',
  sortDirection: false
}

var formatDate = function(date) {
  return moment.unix(date).calendar();
};


var sortBy = function(field){
  if (sort.sortField === field){
    sort.sortDirection = !sort.sortDirection;
  }
  else {
    sort.sortField = field;
    sort.sortDirection = true;
  }
};


var closeAccordion = function(){
  $timeout(function() {
    $('#create-resource .accordion-title').trigger('click');
  }, 500);
};


return{
  moment: moment,
  formatDate: formatDate,
  sort: sort,
  sortBy: sortBy,
  closeAccordion: closeAccordion
}

  
}]);
