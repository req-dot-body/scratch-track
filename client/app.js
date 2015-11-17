var angular = require('angular');
var ngCookies = require('angular-cookies');
var ui = require('angular-ui-router');
var ngMessages = require('angular-messages');

window.app = angular.module('myApp', [
  'ngCookies',
  'ui.router',
  'ngMessages'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

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
      url: '/main',
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
      url:'/{id:int}/edit',
      authenticate: true,
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl' 
    })

    .state('main.project_edit.lyrics', {
      url: '/{id:int}/edit/lyrics',
      templateUrl: 'views/lyricsView.html',
      controller: ''
    })

    .state('main.project_edit.notes', {
      url: '/{id:int}/edit/notes',
      templateUrl: 'views/notesView.html',
      controller: 'NoteCtrl'
    })

    .state('main.project_edit.recordings', {
      url: '/{id:int}/edit/recordings',
      templateUrl: 'views/recordingsView.html',
      controller: 'RecordingCtrl'
    })

    .state('main.project_edit.stablature', {
      url: '/{id:int}/edit/stablature',
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
    if (next.authenticate && Auth.isLoggedIn() === false) {
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
