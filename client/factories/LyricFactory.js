app.factory('Lyric', ['$http', function($http) {
  
  var testProject = function(){
    console.log('hitting factory');
    return $http.post('api/projects');
  }

  var create = function(data) {
    return $http.post('api/lyrics', data);
  }

  var select = function(id) {
    return $http.get('api/lyrics'+ id);
  }

  var edit = function(id) {
    return $http.put('api/lyrics/' + id);
  }

  var del = function(id) {
    console.log('deleted the thing.', id);
    // return $http.delete('api/lyrics/' + id);
  }

  return {
    create: create,
    select: select,
    edit: edit,
    del: del,
    testProject: testProject

  }
  
}]);
