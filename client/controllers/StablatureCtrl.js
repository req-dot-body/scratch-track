var moment = require('moment/moment');

app.controller('StablatureCtrl', ['$scope', '$state', 'Stablature', 'Project',
	function($scope, $state, Stablature, Project) {

	$scope.stabList = [];

	var projectId = $state.params.id;
	
	$scope.getAll = function(){
		Project.getProjectStablature(projectId)
		.then(function(stabRes){
			$scope.stabList = stabRes.data; 
		});
	}

	$scope.getAll();
	
var defaultStab = {
		code: "12/3",
		name: '',
		description: '' 
	};

	$scope.stabInfo = defaultStab;
	$scope.editing = false;

  $scope.formatDate = function(date) {
    return moment.unix(date).calendar();
  };

	$scope.openAccordion = function(stabInfo){
		$scope.stabInfo = stabInfo || defaultStab;
		$('.accordion div').addClass('is-active');
	};

	$scope.closeAccordion = function(){
		$scope.stabInfo = defaultStab;
		console.log('stabInfo', $scope.stabInfo)
		$('.accordion div').removeClass('is-active');
	};

	$scope.submit = function(){
		//ideally some sort of validation here

		var stabInfo = $scope.stabInfo;

		var newStab = {
			code: stabInfo.code,
			name: stabInfo.name,
			description: stabInfo.description,
			project_id: $state.params.id
		};

		$scope.closeAccordion();

		Stablature.create(newStab)
		.then(function(){
			$scope.getAll();
		});
	};

	$scope.delete = function(id){
		Stablature.del(id)
		.then(function(){
			$scope.getAll();
		});
	};

}]);
