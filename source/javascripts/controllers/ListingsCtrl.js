'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope, $location, Listing) {
  console.log('Listings ctrl');
  $http.get("/listings").success(function(houses){
    // console.log(listings);
    $scope.houses = houses;
  });

  $scope.viewListing = function(house){
    console.log(house);
    // console.log(Listing.test());
    Listing.getListing(house)
    .then(function(data){
      console.log(data.data);
      $rootScope.houseInfo = data.data;
    })
    .catch(function(error){
      console.log(error);
    });
  }
});