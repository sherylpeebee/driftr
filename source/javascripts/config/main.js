'use strict()';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html', controller: "HomeCtrl"})
  .state('info', {url: '/info', templateUrl: '/templates/info.html'});
})
.constant('urls',{
  'apiUrl': ''
});
