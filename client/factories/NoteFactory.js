app.factory('Note', ['$http', function($http) {
  
var create = function(data) {
    console.log('data:', data);
    return $http.post('api/resources/notes', data);
  }


var edit = function(noteId) {

}

var del = function(noteId) {
  return $http.delete('api/resources/notes/' + noteId);
}


return {
  create: create,
  edit: edit,
  del: del
}
  

}]);
