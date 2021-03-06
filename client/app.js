var ngAnimate = require('angular-animate');
var ngAnimate_inOut = require('angular-ui-router-anim-in-out');
var ngCookies = require('angular-cookies');
var ngResource = require('angular-resource');
var ngMessages = require('angular-messages');
var ngSanitize = require('angular-sanitize');
var ngTouch = require('angular-touch');
var uiRouter = require('angular-ui-router');

window.app = angular.module('myApp', [
  'ngAnimate',
  'ngCookies',
  'ui.router',
  'ngMessages',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'foundation',
  // 'foundation.dynamicRouting',
  // 'foundation.dynamicRouting.animations',
  'angular-toArrayFilter',
  'nzTour'
]);

app.value('signedUp',{value:false});

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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
      controller: 'LandingCtrl',
      // animation: {
      // enter: 'fadeIn',
      // leave: 'fadeOut'
      // }
    })
  
    .state('public.signup', {  
      url: '/signup',
      authenticate: false,
      templateUrl: 'views/signupForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user',
      // animation: {
      // enter: 'fadeIn',
      // leave: 'fadeOut'
      // }
    })

    .state('public.signin', {
      url: '/signin',
      authenticate: false,
      templateUrl: 'views/signinForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user',
      // animation: {
      // enter: 'fadeIn',
      // leave: 'fadeOut'
      // }
    })

    .state('main', {
      authenticate: true,
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    .state('main.pubprojects', {
      url: '/public',
      authenticate: false,
      templateUrl: 'views/projects.html',
      controller: 'ProjectsCtrl',
      // controller: 'PublicProjectsCtrl',
    })

    .state('main.public_view', {
      url: '/public/{id:int}',
      authenticate: false,
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl'
    })

    .state('main.public_view.dash', {
      url: '/dash',
      authenticate: false,
      templateUrl: 'views/projectDash.html',
      controller: 'ProjectDashCtrl'
    })

    .state('main.public_view.lyrics', {
      url: '/lyrics',
      authenticate: false,
      templateUrl: 'views/lyricsView.html',
      controller: 'LyricCtrl'
    })

    .state('main.public_view.notes', {
      url: '/notes',
      authenticate: false,
      templateUrl: 'views/notesView.html',
      controller: 'NoteCtrl'
    })

    .state('main.public_view.recordings', {
      url: '/recordings',
      authenticate: false,
      templateUrl: 'views/recordingsView.html',
      controller: 'RecordingCtrl',
    })

    .state('main.public_view.stablature', {
      url: '/stablature',
      authenticate: false,
      templateUrl: 'views/stablatureView.html',
      controller: 'StablatureCtrl'
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
      authenticate: true,
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

    .state('main.team', {
      url: '/team',
      authenticate: false,
      templateUrl: 'views/team.html',
      controller: 'TeamCtrl'
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

require('./factories');
require('./controllers');
require('./directives');
