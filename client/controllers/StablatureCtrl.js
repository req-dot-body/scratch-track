app.controller('StablatureCtrl', ['$scope', '$state', 'Stablature', 'Project',
	function($scope, $state, Stablature, Project) {

	$scope.stabList = [];

	var projectId = $state.params.id;
	
	Project.getProjectStablature(projectId)
	.then(function(stabRes){
		$scope.stabList = stabRes.data; 
	})

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
