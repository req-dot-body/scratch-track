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
      templateUrl: 'views/landing.html',
      controller: 'HomeCtrl'      
    })

    .state('public', {
      templateUrl: 'views/public.html',
      controller: 'PublicCtrl'
    })

    .state('public.landing', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
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


    .state('edit', {
      url: '/edit',
      templateUrl: 'views/projectEdit.html',
      controller: 'ProjectEditCtrl'
    })

    .state('test', {
      url: '/test',
      templateUrl: 'views/testView.html',
    })
});

require('./factories');
require('./controllers');
require('./directives');
