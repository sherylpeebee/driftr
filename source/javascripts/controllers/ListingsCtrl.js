'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope, $location) {
  console.log('Listings ctrl');
  $http.get("/listings").success(function(houses){
    // console.log(listings);
    $scope.houses = houses;
  });

  $scope.viewListing = function(house){
    console.log(house);
    $http.get("/listing/" + house.location)
    .then(function(data){
      console.log(data);
    })
    .catch(function(error){
      console.log(error);
    });
  }
});
