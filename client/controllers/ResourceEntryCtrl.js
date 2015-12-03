var moment = require('moment/moment');

app.controller('ResourceEntryCtrl', ['$scope', function($scope) {

	$scope.formatDate = function(date) {
	    return moment.unix(date).calendar();
	  };

	$scope.tooDamnLong = function(){
		if ($scope.resource.text) {
			return $scope.resource.text.length > 150;
		}
	}

	$scope.displayAll = !$scope.tooDamnLong();

	$scope.toggleDisplay = function(){
		$scope.displayAll = !$scope.displayAll;
	}

	$scope.truncate = function(){
	  if ($scope.resource.text){
	  	var lastIndex = $scope.resource.text.indexOf('\n', 150)

	  	if (lastIndex === -1) lastIndex = 150;

	  	return $scope.resource.text.substring(0, lastIndex) + '...';
	  }
	};

}]);
