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
      templateUrl: 'views/index.html',
      controller: 'HomeCtrl'      
    })

    .state('home.public', {
      // url: '/public',
      templateUrl: 'views/landing.html',
      template: 'Public',
      controller: 'LandingCtrl'
    })

    .state('home.loggedin', {
      // url: '/loggedin',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    .state('home.signedup', {
      // url:'/signedup',
      templateUrl: 'views/tour.html',
      controller: 'TourCtrl' 
    })

    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })

    .state('projects', {
      url: '/projects',
      templateUrl: 'views/projects.html',
      controller: ''
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signupForm.html',
      controller: ''
    })

    .state('signin', {
      url: '/signin',
      templateUrl: 'views/signinForm.html',
      controller: ''
    })

    .state('recordings', {
      url: '/recordings',
      templateUrl: 'views/recording.html',
      controller: 'RecordingCtrl'
    })

    .state('lyrics', {
      url: '/lyrics',
      templateUrl: 'views/lyric.html',
      controller: 'LyricCtrl'
    })

    .state('stablature', {
      url: '/stablature',
      templateUrl: 'views/stablature.html',
      controller: 'StablatureCtrl'
    })

    .state('notes', {
      url: '/notes',
      templateUrl: 'views/note.html',
      controller: 'NoteCtrl'
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
