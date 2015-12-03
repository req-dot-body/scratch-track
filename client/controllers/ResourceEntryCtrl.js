var moment = require('moment/moment');

app.controller('ResourceEntryCtrl', ['$scope', function($scope) {

	$scope.formatDate = function(date) {
	    return moment.unix(date).calendar();
	  };

	//checks to see if lyrics/notes/stabs are too long 
	//to by default be fulled displayed
	$scope.tooDamnLong = function(){
		//for lyrics/notes
		if ($scope.resource.text) {
			return $scope.resource.text.length > 150;
		}
		//for stabs
		else if ($scope.resource.code){
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

	//shortened version of lyrics/notes/stabs 
	$scope.truncated = '';

	//assigns truncated to its proper value
	if ($scope.tooDamnLong()){
		//for lyrics/notes
	  if ($scope.resource.text){
	  	var lastIndex = $scope.resource.text.indexOf('\n', 150);

	  	if (lastIndex === -1) lastIndex = 150;

	  	$scope.truncated = $scope.resource.text.substring(0, lastIndex) + '...';
	  }
	  //for stabs
	  else if ($scope.resource.code){
	  	var lastIndex = $scope.resource.code.indexOf('\n');
	  	$scope.truncated = $scope.resource.code.substring(0, lastIndex);
	  }
	};

}]);
