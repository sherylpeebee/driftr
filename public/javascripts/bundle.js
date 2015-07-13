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
  .state('newProperty', {url: '/newProperty', templateUrl: '/templates/newProperty.html', controller: "PropCtrl"})
  .state('listing', {url: '/listing/:houseId', templateUrl: '/templates/listing.html', controller: "ListingCtrl"})
  .state('listings', {url: '/listings', templateUrl: '/templates/listings.html', controller: "ListingsCtrl"})
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
            $(".banner").animate({ top: -126 }, function(){
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
      }).catch(function(err){
        console.log(err);
      });
    }
  };
});

'use strict()';

angular.module('GriftrApp')
.controller('ListingCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {

    // console.log(house);
    $scope.params = $stateParams;
    Listing.getListing($stateParams.houseId)
    .then(function(data){
      console.log(data.data);
      $scope.houseInfo = data.data;
    })
    .catch(function(error){
      console.log(error);
    });

});
'use strict()';

angular.module('GriftrApp')
.controller('ListingsCtrl', function($scope, $http, $rootScope, $location, Listing, $stateParams) {
  console.log('Listings ctrl');
  $http.get("/listings").success(function(houses){
    // console.log(listings);
    $scope.houses = houses;
  });

});
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

'use strict()';

angular.module('GriftrApp')
.controller('NavCtrl', function($scope, $http, $rootScope) {
  console.log('nav ctrl');
  $http.get("/getUserData").success(function(userData){
    console.log(userData);
    $rootScope.currentUser = userData;
  });
});

angular.module('GriftrApp')
.factory("Listing", function($http){
  function Listing(){};
  Listing.test = function() {
    console.log('this is a test');
    // return 'this is a test';
  }
  Listing.getListing = function(houseId){
    console.log('house: ', houseId);
    return $http.get("/listing/" + houseId);
  }
  return Listing;
});