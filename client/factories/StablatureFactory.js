app.factory('Stablature', ['$http', function($http) {


  var create = function(stabInfo){
  	return $http.post('api/stablature', stabInfo);
  };

  var edit = function(stabId, stabInfo){
  	return $http.put('api/stablature/+'stabId, stabInfo);
  };

  var del = function(stabId){
  	return $http.delete('api/stablature/+'stabId)
  };

  return {
  	create: create,
  	edit: edit,
  	del: del
  };

}]);
