'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
});
