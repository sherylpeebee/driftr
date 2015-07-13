'use strict()';

angular.module('GriftrApp')
.controller('PropCtrl', function($scope, $http, $rootScope) {
  console.log('Prop ctrl');
  $scope.test = 'Test!';
  $scope.submitProperty = function(house){
    house.user = $rootScope.currentUser.twitter.id;
    house.image = 'http://www.keralahouseplanner.com/wp-content/uploads/2012/09/kerala-house-plan-duplex1.jpg';
    // house.user = currentUser;
    console.log(house);
    $http.post("/house", house).success(function(data, status){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });


    // if($state.current.name === "info.owner"){
    //   currentUser.userType = 'owner';      
    //   currentUser.owner = user;
    //   console.log(currentUser);

    //   $http.post("/userinfo", currentUser).success(function(data, status){
    //     console.log(data);
    //   }).catch(function(err){
    //     console.log(err);
    //   });
    // }
    // else if($state.current.name === "info.traveller"){
    //   currentUser.userType = 'traveller';
    //   currentUser.traveller = user;
    //   console.log(currentUser);
    //   $http.post("/userinfo", currentUser).success(function(data, status){
    //     console.log(data);
    //   }).catch(function(err){
    //     console.log(err);
    //   });
    // }
  };


});
