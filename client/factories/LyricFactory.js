app.factory('Lyric', ['$http', function($http) {
  
  // var testProject = function(data){
  //   console.log('hitting factory:', data);
  //   return $http.post('api/lyrics', data);
  // }

  var create = function(data) {
    console.log('data:', data);
    return $http.post('api/lyrics', data);
  }

  var select = function(id) {
    return $http.get('api/lyrics/'+ id);
  }

  var edit = function(id, data) {
      console.log(true);
      console.log(data);
      return $http.put('api/lyrics/' + id, data);
  }

  var del = function(id) {
    console.log('deleted the thing.', id);
    return $http.delete('api/lyrics/' + id);
  }

  return {
    create: create,
    select: select,
    edit: edit,
    del: del
    // testProject: testProject

  }
  
}]);
