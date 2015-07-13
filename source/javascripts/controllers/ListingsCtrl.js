'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope) {
  console.log('Listings ctrl');
  $http.get("/listings").success(function(listings){
    console.log(listings);
    $scope.listings = listings;
  });
});
