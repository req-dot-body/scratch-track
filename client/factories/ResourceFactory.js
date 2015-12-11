app.factory('Resource', ['$http', '$timeout', function($http, $timeout) {


var moment = require('moment/moment');

var sort = {
  sortField: 'created_at',
  sortDirection: true
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

var autoExpand = function(e) {
  var element = typeof e === 'object' ? e.target : document.getElementById(e);
  var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
  element.style.height =  scrollHeight + "px";    
};


return{
  moment: moment,
  formatDate: formatDate,
  sort: sort,
  sortBy: sortBy,
  closeAccordion: closeAccordion,
  autoExpand: autoExpand
}

  
}]);
