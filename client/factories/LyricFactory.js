app.factory('Lyric', ['$http', function($http) {

  var create = function(data) {
    console.log('data:', data);
    return $http.post('/api/resources/lyrics', data);
  };

  var select = function(id) {
    return $http.get('/api/resources/lyrics/'+ id);
  };

  var edit = function(id, data) {
      console.log(true);
      console.log(data);
      return $http.put('/api/resources/lyrics/' + id, data);
  };

  var del = function(id) {
    console.log('deleted the thing.', id);
    return $http.delete('/api/resources/lyrics/' + id);
  };

  return {
    create: create,
    select: select,
    edit: edit,
    del: del
  };
  
}]);
