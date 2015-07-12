angular.module('GriftrApp')
.controller("InfoCtrl", function($scope){
  console.log("info here!!!");
  $scope.test = 43;
$scope.submitInfo = function(user){
  user.firstName = $rootScope.currentUser.twitter.displayName;
  
  // $http.post("/")
};
});
