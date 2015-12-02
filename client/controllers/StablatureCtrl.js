var moment = require('moment/moment');

app.controller('StablatureCtrl', ['$scope', '$state', 'Stablature', 'Project',
	function($scope, $state, Stablature, Project) {

	$scope.stabList = [];

	var projectId = $state.params.id;
	
	//gets all stabs for this project from factory
	$scope.getAll = function(){
		Project.getProjectStablature(projectId)
		.then(function(stabRes){
			$scope.stabList = stabRes.data; 
		});
	}

	$scope.getAll();
	
var defaultStab = {
		code: "9/4 10/5 12/4 10/5 9/4 10/5 12/4 10/5 \n9/4 10/5 12/4 10/5 9h10p9h10p9/4" ,
		name: '',
		description: '' 
	};

	$scope.stabInfo = $.extend({}, defaultStab);

  $scope.formatDate = function(date) {
    return moment.unix(date).calendar();
  };

  //opens editor, optional info can be passed in
	$scope.openEditor = function(stabInfo){
		$scope.stabInfo = stabInfo || $.extend({}, defaultStab);
		$('.accordion div').addClass('is-active');
	};

	//closes editor and resets default tabs
	$scope.closeEditor = function(){
		$scope.stabInfo = $.extend({}, defaultStab);
		$('.accordion div').removeClass('is-active');
	};

	//enters a new project
	$scope.submit = function(){

		//checks for proper vex code
		if ($('vextab').hasClass('error')){
			//make modal appear here 
			return;
		}

		var stabInfo = $scope.stabInfo;

		//creates new stab object
		var newStab = {
			code: stabInfo.code,
			name: stabInfo.name,
			description: stabInfo.description,
			project_id: $state.params.id
		};

		$scope.closeEditor();

		//sends new stab to the factory
		Stablature.create(newStab)
		.then(function(){
			$scope.getAll();
		});
	};

	//deletes a project
	$scope.delete = function(id){
		Stablature.del(id)
		.then(function(){
			$scope.getAll();
		});
	};

}]);
