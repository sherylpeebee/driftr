console.log('Griftr online!!');

$(document).ready(function(){
  $('.light').textillate({ in: { effect: 'rollIn' } });

  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  function animateIntro (cb){
    $("#intro").addClass("animated bounceInRight").one(animationEnd, function(){
      $(this).removeClass("animated bounceInRight").addClass("animated slideOutUp");
      cb();
    });
  }
  animateIntro(hide);
  function hide(){
    $("#intro").css("display", "none");
  }
});
