'use strict()';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html', controller: "HomeCtrl"})
  .state('newProperty', {url: '/newProperty', templateUrl: '/templates/newProperty.html', controller: "PropCtrl"})
  .state('listing', {url: '/listing/:location', templateUrl: '/templates/listing.html', controller: "ListingsCtrl"})
  .state('listings', {url: '/listings', templateUrl: '/templates/listings.html', controller: "ListingsCtrl"})
  .state('info', {url: '', templateUrl: '/templates/info.html', abstract: true})
  .state('info.owner', {url: '/owner', templateUrl: '/templates/owner.html', controller: "InfoCtrl"})
  .state('info.traveller', {url: '/traveller', templateUrl: '/templates/traveller.html', controller: "InfoCtrl"});

})
.constant('urls',{
  'apiUrl': ''
});
