var angular = require('angular');
var ngCookies = require('angular-cookies');
var ui = require('angular-ui-router');

window.app = angular.module('myApp', [
  'ngCookies',
  'ui.router',
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    });
});

require('./factories');
require('./controllers');
require('./directives');
