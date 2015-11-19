app.controller('StablatureCtrl', ['$scope', '$state', 'Stablature', 
	function($scope, $state, Stablature) {

	$scope.code = "tabstave notation=false \n notes 4-5/3";

	$scope.create = function(){
		console.log('id?', $state.params.id)
		var newStab = {
			code: $scope.code,
			project_id: $state.params.id
		};

		Stablature.create(newStab);
	}

}]);
