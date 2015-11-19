app.factory('Stablature', ['$http', function($http) {

  var create = function(stabInfo){
  	return $http.post('api/stablature', stabInfo)
  	.catch(function(err){
  		console.log('could not create new stab', err);
  	})
  };

  var edit = function(stabId, stabInfo){
  	return $http.put('api/stablature/'+stabId, stabInfo)
  	.catch(function(err){
  		console.log('could not updated stab', err);
  	})
  };

  var del = function(stabId){
  	return $http.delete('api/stablature/'+stabId)
  	.catch(function(err){
  		console.log('could not delete stab', err);
  	})
  };

  return {
  	create: create,
  	edit: edit,
  	del: del
  };

}]);
