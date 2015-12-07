app.factory('Resource', ['$http', function($http) {


var moment = require('moment/moment');

var formatDate = function(date) {
  return moment.unix(date).calendar();
};

return{
  moment: moment,
  formatDate: formatDate
}

  
}]);
