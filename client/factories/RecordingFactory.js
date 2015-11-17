app.factory('Recording', ['$http', function($http) {

  var create = function(data){
  	return $http.post('api/recordings', data);
  }

	var select = function(id){
		return $http.get('api/recordings/'+id);
	}

	var edit = function(id, data){
		return $http.put('api/recordings/'+id, data);
	}

	var del = function(id){
		console.log('deleted!', id);
		// return $http.delete('api/recordings/'+id);
	}

	return {
		create: create,
		select: select,
		edit: edit,
		del: del
	}

}]);
