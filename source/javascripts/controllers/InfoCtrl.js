angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope){
  console.log("info here!!!");
  $scope.test = 43;
$scope.submitInfo = function(user){
  user.firstName = $rootScope.currentUser.twitter.displayName;

  // $http.post("/")
};
});
