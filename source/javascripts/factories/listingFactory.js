angular.module('GriftrApp')
.factory("Listing", function($http){
  function Listing(){};
  Listing.test = function() {
    console.log('this is a test');
    // return 'this is a test';
  }
  Listing.getListing = function(house){
    return $http.get("/listing/" + house.location);
  }
  return Listing;
});