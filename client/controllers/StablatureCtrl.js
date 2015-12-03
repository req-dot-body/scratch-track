var moment = require('moment/moment');

app.controller('StablatureCtrl', ['$scope', '$state', '$timeout', 'Stablature', 'Project',
	function($scope, $state, $timeout, Stablature, Project) {

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

	$scope.submitError = false; 

	//enters a new project
	$scope.submit = function(){

		//checks for proper vex code
		if ($('vextab').hasClass('error')){
			$scope.submitError = true;

			$timeout(function(){
				$scope.submitError = false; 
			}, 2000);

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

	$scope.tabExplanation = 
	"Scratch-Track utilizes an easy-to-use language called VexTab for instantly rendering tablature as you write it. "
	+ "The basics are simple. For example, to render frets 2, 4, and 7 on the 5th (A) string, just type '2-4-7/5'. "
	+"\nFor more examples, click the tutorial link below. However, keep in mind that when using Scratch-Track's editor "
	+"you do not need to write out any of the VexTab keywords such as 'tabstave', 'notation', or 'notes'."

}]);
