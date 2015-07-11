'use strict()';

var app = angular.module('GriftrApp', ['ui.router']);

app.run(function(){
  console.log('Griftr Online');


  $(document).ready(function(){
    $('.light').textillate({ in: { effect: 'rollIn' } });

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function animateIntro (){
        $("#intro").addClass("animated bounceInRight").one(animationEnd, function(){
          $(this).removeClass("animated bounceInRight").addClass("animated slideOutUp").one(animationEnd, function(){
            $("#right-banner").animate({ top: -126 });
          });
        });
      // $("#intro").textillate({ in: {effect: "rollIn"} , out: {effect: "rollOut"} });
      // cb();
    }
      animateIntro();

    function hide(){
      $("#intro").css("display", "none");
    }
  });


});
