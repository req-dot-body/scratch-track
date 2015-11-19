app.controller('StablatureCtrl', ['$scope', 'Stablature', function($scope, Stablature) {

	$scope.code = "tabstave notation=false \n notes "+$scope.userInput;

	$scope.submit = function(){
		Stablature.submit($scope.code);
	}

}]);
