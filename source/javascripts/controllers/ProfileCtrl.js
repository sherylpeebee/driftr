'use strict()';

angular.module('GriftrApp')
.controller('ProfileCtrl', function($scope, $http, $rootScope) {
  console.log('Profile ctrl');
  // $http.get("/ownerProfile")
  // .success(function(houses){
  //   $scope.houses = houses;
  // });
  $scope.houses = [
{image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
{image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
{image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
{image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14},
{image: "http://www.loghouse.fi/wp-content/uploads/2011/11/log-house-5.jpg", squareFoot: 8788, bedrooms: 12, bathrooms: 14}
];
});
