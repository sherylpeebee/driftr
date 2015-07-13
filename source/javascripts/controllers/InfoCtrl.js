angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope, $state, $location, $http){
console.log("get dat info");

  if($rootScope.currentUser){
    currentUser = $rootScope.currentUser;
  } else{
    currentUser = null; // Add more to catch null?
  }

  $scope.submitInfo = function(user){
    if($state.current.name === "info.owner"){
      currentUser.userType = 'owner';
      currentUser.owner = user;
      console.log(currentUser);

      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
        $scope.user = {};
      }).catch(function(err){
        console.log(err);
      });
    }
    else if($state.current.name === "info.traveller"){
      currentUser.userType = 'traveller';
      currentUser.traveller = user;
      console.log(currentUser);
      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
        $scope.traveller = {};
      }).catch(function(err){
        console.log(err);
      });
    }
  };

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
  };
});
