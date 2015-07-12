'use strict()';

var app = angular.module('GriftrApp', ['ui.router']);

app.run(function(){
  console.log('Griftr Online');
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
.controller("InfoCtrl", function(){
  console.log("info CONTROLLLLLL!!!");

});

'use strict()';

angular.module('GriftrApp')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/templates/home.html', controller: "HomeCtrl"})
  .state('info', {url: '/info', templateUrl: '/templates/info.html', controller: "InfoCtrl"});
})
.constant('urls',{
  'apiUrl': ''
});
