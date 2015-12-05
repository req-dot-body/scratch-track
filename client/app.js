var ngAnimate = require('angular-animate');
var ngAnimate_inOut = require('angular-ui-router-anim-in-out');
var ngCookies = require('angular-cookies');
var ngResource = require('angular-resource');
var ngMessages = require('angular-messages');
var ngSanitize = require('angular-sanitize');
var ngTouch = require('angular-touch');
var uiRouter = require('angular-ui-router');

angular.module('angular-toArrayFilter', []).filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
});


window.app = angular.module('myApp', [
  'ngAnimate',
  'ngCookies',
  'ui.router',
  'ngMessages',
  // 'anim-in-out',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'foundation',
  'angular-toArrayFilter',
  'nzTour'
  // 'foundation.dynamicRouting',
  // 'foundation.dynamicRouting.animations'
  // ngAnimate,
  // ngAnimate_inOut,
  // ngCookies,
  // ngMessages,
  // ngResource,
  // ngSanitize,
  // ngTouch,
  // uiRouter,
]);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      authenticate: false,
      templateUrl: 'views/landing.html',
      controller: 'HomeCtrl'
    })

    .state('public', {
      authenticate: false,
      templateUrl: 'views/public.html',
      controller: 'PublicCtrl'
    })

    .state('public.landing', {
      authenticate: false,
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    })
  
    .state('public.signup', {  
      url: '/signup',
      authenticate: false,
      templateUrl: 'views/signupForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })

    .state('public.signin', {
      url: '/signin',
      authenticate: false,
      templateUrl: 'views/signinForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })

    .state('main', {
      authenticate: true,
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

     .state('main.projects', {
      url:'/projects',
      authenticate: true,
      templateUrl: 'views/projects.html',
      controller: 'ProjectsCtrl',
      controllerAs:'projects'
    })

    .state('main.project_edit', {
      url:'/projects/{id:int}/edit',
      authenticate: true,
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl' 
    })

    .state('main.project_edit.dash', {
      url:'/dash',
      authenticate: true,
      params:{created:false},
      templateUrl: 'views/projectDash.html',
      controller: 'ProjectDashCtrl' 
    })

    .state('main.project_edit.lyrics', {
      url: '/lyrics',
      authenticate: true,
      templateUrl: 'views/lyricsView.html',
      controller: 'LyricCtrl'
    })

    .state('main.project_edit.notes', {
      url: '/notes',
      authenticate: true,
      templateUrl: 'views/notesView.html',
      controller: 'NoteCtrl'
    })

    .state('main.project_edit.recordings', {
      url: '/recordings',
      authetnicate: true,
      templateUrl: 'views/recordingsView.html',
      controller: 'RecordingCtrl',
    })

    .state('main.project_edit.stablature', {
      url: '/stablature',
      authenticate: true,
      templateUrl: 'views/stablatureView.html',
      controller: 'StablatureCtrl'
    })

    .state('main.project_entry', {
      url:'/entry',
      authenticate: true,
      templateUrl: 'views/projectEntry.html',
      controller: 'ProjectEntryCtrl' 
    })

    .state('logout', {
      url: '',
      authenticate: true,
      templateUrl: 'views/landing.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })

    .state('edit', {
      url: '/edit',
      authenticate: true,
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl'
    })

    .state('test', {
      url: '/test',
      templateUrl: 'views/testView.html',
    })
})
.run(function ($timeout, $rootScope, $location, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function (evt, next, current) {
    // If the next state has an authenticate param that is truthy, or
    // If the authenticate param is undefined, we default to the page
    // requiring the user to be authenticated in order to view
    if ((next.authenticate || typeof next.authenticate === 'undefined') && Auth.isLoggedIn() === false) {
      // Stop state from trying to change to the next one
      // Instead send it to the home state
      evt.preventDefault();
      $state.go('home');
    }
  });
});

require('./factories');
require('./controllers');
require('./directives');
