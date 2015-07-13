'use strict()';

angular.module('GriftrApp')
.controller('PropCtrl', function($scope, $http, $rootScope) {
  console.log('Prop ctrl');
  // $scope.submitInfo = function(user){
  //   if($state.current.name === "info.owner"){
  //     currentUser.userType = 'owner';      
  //     currentUser.owner = user;
  //     console.log(currentUser);

  //     $http.post("/userinfo", currentUser).success(function(data, status){
  //       console.log(data);
  //     }).catch(function(err){
  //       console.log(err);
  //     });
  //   }
  //   else if($state.current.name === "info.traveller"){
  //     currentUser.userType = 'traveller';
  //     currentUser.traveller = user;
  //     console.log(currentUser);
  //     $http.post("/userinfo", currentUser).success(function(data, status){
  //       console.log(data);
  //     }).catch(function(err){
  //       console.log(err);
  //     });
  //   }
  // };

  
});
