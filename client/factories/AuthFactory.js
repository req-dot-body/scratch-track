app.factory('Auth', ['$state', '$cookies', function($state, $cookies) {
  var isLoggedIn = function () {
    var cookie = $cookies.get('isLoggedIn');
    console.log('Cookie loggedIn:', cookie);
    return cookie === 'true';
  };

  return {
    isLoggedIn: isLoggedIn
  };
}]);
