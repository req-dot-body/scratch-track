var moment = require('moment/moment');

app.controller('StablatureCtrl', ['$scope', '$state', 'Stablature', 'Project',
	function($scope, $state, Stablature, Project) {

	$scope.stabList = [];

	var projectId = $state.params.id;
	
	Project.getProjectStablature(projectId)
	.then(function(stabRes){
		$scope.stabList = stabRes.data; 
	})
	
var defaultStab = {
		code: "tabstave notation=false \n notes 4-5/3",
		name: '',
		description: '' 
	};

	$scope.stabInfo = defaultStab;
	$scope.editing = false;

	$scope.print = console.log("clicked");

  
  $scope.formatDate = function(date) {
    return moment.unix(date).calendar();
  };

	$scope.openEditor = function(){
		// angular.element(document).find('textarea.editor').val(defaultStab.code);
		$scope.editing = true;
	};

	$scope.closeEditor = function(){
		$scope.editing = false;
	}

	$scope.submit = function(){
		//ideally some sort of validation here
		// console.log('error', angular.element(document).find('div.text').val());

		var stabInfo = $scope.stabInfo;
	
		//hacky nonsense to grab the textarea input
		//because vex sucks
		stabInfo.code = angular.element(document).find('textarea.editor').val()

		var newStab = {
			code: stabInfo.code,
			name: stabInfo.name,
			description: stabInfo.description,
			project_id: $state.params.id
		};

		$scope.editing = false;
		Stablature.create(newStab);
	};

	$scope.delete = function(id){
		Stablature.del(id);
	};

}]);
