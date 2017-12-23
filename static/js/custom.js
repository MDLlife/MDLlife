
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

$(document).ready(function () {
  $('#video-btn').click(function(){
      $(this).toggleClass('stoped');
      if($(this).hasClass('stoped')){
        $(this).parent().find('video').each(function() {
            this.pause();
        });
        $(this).removeClass('fa-pause-circle-o');
        $(this).addClass('fa-play-circle-o');
      } else{
          $(this).parent().find('video').each(function() {
                this.play();
          });
          $(this).removeClass('fa-play-circle-o');
          $(this).addClass('fa-pause-circle-o');
      }
      return false;
  });
});


Number.prototype.format = function(n, x, s, c, pre, post) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return pre + (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')) + post;
};
/*raised line*/
$(document).ready(function () {


  var max = $('.raised-line').attr('data-max');
  var cur = $('.raised-line').attr('data-current');
  var percent = (cur/max)*100;
  $('.raised-percent').html(percent.toFixed(3) + '%');
  $('.raised-end_score').html(parseFloat(max).format(0,3,",",".", "$", " USD"));
  $('.raised_raised-money').html(parseFloat(cur).format(2,3,",",".", "$", " USD"));
  $('.raised_raised-distributed').html(parseFloat(cur * 100).format(0,3,",",".", "", " MDL"));
  $('#progress-line').css('width',percent + '%');
  //$('.raised-total').html();
});

$(document).ready(function () {
  $('.mentor-board_item').mouseenter(function(){
      $(this).children('.mentor-photo-wrapper').removeClass('changed');
  });
  $('.mentor-board_item').mouseleave(function(){
      $(this).children('.mentor-photo-wrapper').addClass('changed');
  });
});
