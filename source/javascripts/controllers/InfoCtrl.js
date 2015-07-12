angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope, $state, $location, $http){
console.log("get dat info");

  if($rootScope.currentUser){
    currentUser = $rootScope.currentUser;
    firstName = $rootScope.currentUser.twitter.displayName;
  } else{
    currentUser = null;
    firstName = null;
  }

  $scope.submitInfo = function(user){
    if($state.current.name === "info.owner"){
      console.log(firstName);
      currentUser.owner = user;
      currentUser.owner.firstName = firstName;
      console.log(currentUser);
<<<<<<< HEAD
      $http.post("/userInfo", currentUser).success(function(data, status){
        console.log("done");
=======
      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
>>>>>>> daf840b1cb072454e75b7b765f2003207cb58456
      }).catch(function(err){
        console.log(err);
      });

    }
    else if($state.current.name === "info.traveller"){
      $rootScope.currentUser.owner = user;
      user.firstName = firstName;
      console.log(user);
<<<<<<< HEAD
      $http.post("/userInfo", user).success(function(data, status){
        console.log("done");
=======
      $http.post("/userinfo", user).success(function(data, status){
        console.log(data);
>>>>>>> daf840b1cb072454e75b7b765f2003207cb58456
      }).catch(function(err){
        console.log(err);
      });
    }
  };
});
