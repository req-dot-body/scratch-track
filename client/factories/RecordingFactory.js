app.factory('Recording', ['$http', function($http) {

  var create = function(data){
  	console.log('data:', data);
  	return $http.post('/api/resources/recordings/', data);
  };

	var select = function(id){
		return $http.get('/api/resources/recordings/' + id);
	};

	var edit = function(id, data){
		return $http.put('/api/resources/recordings/' + id, data);
	};

	var del = function(id){
		console.log('deleted!', id);
		return $http.delete('/api/resources/recordings/' + id);
	};

	return {
		create: create,
		select: select,
		edit: edit,
		del: del
	};

}]);
