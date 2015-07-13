'use strict()';

angular.module('GriftrApp')
.controller('TravellersCtrl', function($scope, $http, $rootScope) {
  $http.get("/travellers").success(function(travellers){
    // console.log(listings);
    $scope.travellers = travellers;
  });  
});
