
/* Sticky haeder-menu */
$(window).scroll(function() {
if ($(this).scrollTop() > 565){  
    $('#nav-menu').addClass("sticky");
  }
  else{
    $('#nav-menu').removeClass("sticky");
  }
});

/*end sticky header*/


/* Active menu changer*/
var menu_selector = "#nav-menu";
 
function onScroll(){

    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a[href^='#']").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);

        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}
 
$(document).ready(function () {
 
    $(document).on("scroll", onScroll);
 
    $("#top-menu-wr a[href^='#'], footer a[href^='#']").click(function(e){
        e.preventDefault();
        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);
        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

        $('#top-menu-wr').removeClass('active-mob-menu');
    });
 
});
/* end active menu changer*/


/* hamburger on mobile phone */
$(document).ready(function () {
  $('#hamburger,.close-mobile-menu').click(function(){
    $('#top-menu-wr').toggleClass('active-mob-menu');
  });
});
/* end */

$(document).ready(function () {
  $('#team .worker-card').mouseenter(function(){
      $(this).children('.content-wrapper-text').toggleClass('show-biography');
      $(this).children('.photo-wrapper').removeClass('changed');
  });
  $('#team .worker-card').mouseleave(function(){
      $(this).children('.content-wrapper-text').toggleClass('show-biography');
      $(this).children('.photo-wrapper').addClass('changed');
  });
});
