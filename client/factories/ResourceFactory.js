app.factory('Resource', ['$http', function($http) {


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
    console.log('sortField', sort.sortField);
    sort.sortDirection = true;
  }
};


return{
  moment: moment,
  formatDate: formatDate,
  sort: sort,
  sortBy: sortBy
}

  
}]);
