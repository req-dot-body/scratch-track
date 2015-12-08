var moment = require('moment/moment');

app.controller('ResourceEntryCtrl', ['$scope', function($scope) {

	$scope.formatDate = function(date) {
	   return moment.unix(date).calendar();
	 };

	//checks to see if stabs are too long
	$scope.tooDamnLong = function(){
		if($scope.resource.code){
			return ($scope.resource.code.indexOf('\n') > -1)
		}
	}

	$scope.displayAll = !$scope.tooDamnLong();

	$scope.toggleDisplay = function(){
		$scope.displayAll = !$scope.displayAll;
	}

	$scope.moreOrLess = function(){
		if ($scope.displayAll) return 'Less';

		return 'More';
	}

	//shortened version of stabs 
	$scope.truncated = '';

	//assigns truncated to its proper value
	if ($scope.tooDamnLong()){
	  var lastIndex = $scope.resource.code.indexOf('\n');
	  $scope.truncated = $scope.resource.code.substring(0, lastIndex);
	};

}]);
