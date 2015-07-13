'use strict()';

angular.module('GriftrApp')
.controller('ProfileCtrl', function($scope, $http, $rootScope) {
  console.log('Profile ctrl');
  $scope.test = 'Test!';
});
