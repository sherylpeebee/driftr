'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {

    // console.log(house);
    console.log($stateParams);
    // Listing.getListing(house)
    // .then(function(data){
    //   console.log(data.data);
    //   $rootScope.houseInfo = data.data;
    // })
    // .catch(function(error){
    //   console.log(error);
    // });

});