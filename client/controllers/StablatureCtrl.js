
app.controller('StablatureCtrl', ['$scope', '$state', '$timeout', 'Stablature', 'Project', 'Resource',
	function($scope, $state, $timeout, Stablature, Project, Resource) {

	$scope.stabList = [];

	$scope.sort = Resource.sort;

  $scope.public = true;
  
  if ($state.current.authenticate) {
    $scope.public = false;
  }

	var projectId = $state.params.id;

	
	//gets all stabs for this project from factory
	$scope.getAll = function(){
		Project.getProjectStablature(projectId)
		.then(function(stabRes){
			$scope.stabList = stabRes.data; 
		});
	}

	//intially retrieves all stabs for this project
	$scope.getAll();
	
	//displayed by default
	var defaultStab = {
		code: "9/4 10/5 12/4 10/5 9/4 10/5 12/4 10/5 \n9/4 10/5 12/4 10/5 9h10p9h10p9/4" ,
		notation: 0,
		name: '',
		description: '' 
	};

	//the stab that is being displayed in the editor
	$scope.stabInfo = $.extend({}, defaultStab);

	$scope.formatDate = function(date) {
	  return Resource.formatDate(date);
	};

  //provides sort functionality
  $scope.sortBy = function(field){
    Resource.sortBy(field);
  };

  // Makes textareas expand as you type
  $scope.autoExpand = function(e) {
    Resource.autoExpand(e);    
  };

  //opens editor, optional info can be passed in
	$scope.openEditor = function(stabInfo){
		$scope.stabInfo = stabInfo || $.extend({}, defaultStab);
		$('#create-resource > div').addClass('is-active');
	};

	//closes editor and resets default tabs
	$scope.closeEditor = function(){
		$scope.stabInfo = $.extend({}, defaultStab);
		Resource.closeAccordion();
	};

	$scope.editing = false;
	$scope.revising = false; 
	$scope.submitError = false;

	//model for stabs being edited
	$scope.tempStab = {};


	$scope.editStab = function(stab){
		$scope.editing = true;

		$scope.tempStab = {
			id: stab.id,
			name: stab.name,
			description: stab.description
		};
	} 

	$scope.closeEdit = function(){
		$scope.editing = false;
		$scope.tempStab = {};
	};

	$scope.update = function(){
		$scope.editing = false;
		var id = $scope.tempStab.id;

		Stablature.edit(id, $scope.tempStab)
		.then(function(){
			$scope.tempStab = {};
			$scope.getAll();
		})

	};

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
			notation: stabInfo.notation,
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
