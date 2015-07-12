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
          //need to adjust times of these. too fast. kinda funky looking
          $(this).removeClass("animated bounceInRight").addClass("animated slideOutUp").one(animationEnd, function(){
            $("#right-banner").animate({ top: -126 }, function(){
              $(".find").fadeIn();
              console.log("hey");
            });
          });
        });
    }
      animateIntro();

    function prompt(){
      setInterval(function(){
        $(".find").addClass("animated shake").one(animationEnd, function(){
          $(".find").removeClass("animated shake");
        });
      }, 8000);
    }
      for (var i=0; i<100; i++){
        prompt();
      }

    function hide(){
      $("#intro").css("display", "none");
    }
  });
});

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
      $http.post("/userinfo", currentUser).success(function(data, status){
        console.log(data);
      }).catch(function(err){
        console.log(err);
      });

    }
    else if($state.current.name === "info.traveller"){
      $rootScope.currentUser.owner = user;
      user.firstName = firstName;
      console.log(user);
      $http.post("/userinfo", user).success(function(data, status){
        console.log(data);
      }).catch(function(err){
        console.log(err);
      });
    }
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
