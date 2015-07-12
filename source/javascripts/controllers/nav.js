'use strict';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $scope.currentUser = userData;
  })
});

