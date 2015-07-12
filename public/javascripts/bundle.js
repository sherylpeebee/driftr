'use strict()';

var app = angular.module('GriftrApp', ['ui.router']);

app.run(function(){
  console.log('Griftr Online');
});

'use strict()';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html', controller: "HomeCtrl"})
  .state('info', {url: '', templateUrl: '/templates/info.html', abstract: true})
  .state('info.owner', {url: '/owner', templateUrl: '/templates/owner.html', controller: "InfoCtrl"})
  .state('info.traveller', {url: '/traveller', templateUrl: '/templates/traveller.html', controller: "InfoCtrl"});
})
.constant('urls',{
  'apiUrl': ''
});

angular.module('GriftrApp')
.controller("HomeCtrl", function(){
  console.log("HOME CONTROLLLLLL!!!");
  $(document).ready(function(){
    $('.light').textillate({ in: { effect: 'rollIn' } });

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function animateIntro (){
        $("#intro").addClass("animated bounceInRight").one(animationEnd, function(){
          //need to adjust times of these. too fast. kind funky looking
          $(this).removeClass("animated bounceInRight").addClass("animated slideOutUp").one(animationEnd, function(){
            $("#right-banner").animate({ top: -126 }, function(){
              $(".find").fadeIn();
              console.log("hey");
            });
          });
        });
    }
      animateIntro();

    function hide(){
      $("#intro").css("display", "none");
    }
  });
});

angular.module('GriftrApp')
.controller("InfoCtrl", function($scope, $rootScope){
  console.log("info here!!!");
  $scope.test = 43;
$scope.submitInfo = function(user){
  user.firstName = $rootScope.currentUser.twitter.displayName;

  // $http.post("/")
};
});

'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
});
