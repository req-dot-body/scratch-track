var angular = require('angular');
var ngCookies = require('angular-cookies');
var ui = require('angular-ui-router');

window.app = angular.module('myApp', [
  'ngCookies',
  'ui.router',
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/landing.html',
      controller: 'HomeCtrl'      
    })

    .state('public', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    })

    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

  
     .state('main.projects', {
      url:'/projects',
      templateUrl: 'views/projects.html',
      controller: 'ProjectsCtrl',
      controllerAs:'projects' 
    })

    .state('main.project_edit', {
      url:'/{id:int}/edit',
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl' 
    })

    .state('main.project_edit.lyrics', {
      url: '/{id:int}/edit/lyrics',
      templateUrl: 'views/lyricsView.html',
      controller: 'LyricCtrl'
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
      templateUrl: 'views/projectEntry.html',
      controller: 'ProjectEntryCtrl' 
    })

    .state('logout', {
      url: '',
      templateUrl: 'views/landing.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })

    .state('public.signup', {
      url: '/signup',
      templateUrl: 'views/signupForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })

    .state('public.signin', {
      url: '/signin',
      templateUrl: 'views/signinForm.html',
      controller: 'UserCtrl',
      controllerAs: 'user'

    })

    .state('edit', {
      url: '/edit',
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl'
    })
});

require('./factories');
require('./controllers');
require('./directives');
