// Initialization
$(document).ready(function(){
    setRaisedLegend();
    jumpingArrow();
    customScrolling();
    updateForm();
    videoControllers();
    windowOnSroll();
    initScrambleText();
    initSiteNav();
    mentorsPopup();
    teamPopup();
    get_timer();
    showInstruments();
    burger();
    rpModal();
    formInit();
    customizeSelect($('#langs-list'));
    circleLang();
    incomeCards($('.income-cards'));
    incomeEvents();
    checkGetMDL();
    AOS.init({
      once: true,
      delay: 100
  });
    $(".roadmap-slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        vertical: !0,
        swipe: !1,
        focusOnSelect: !0,
        centerMode: !0,
        centerPadding: "0",
        asNavFor: ".roadmap-slider-nav",
        arrows: !0,
        dots: !0,
        infinite: !1,
        dotsClass: "custom_paging",
        customPaging: function(e, t) {
            var n = t + 1
            , o = e.slideCount;
            return '<a class="custom-dot" role="button" title="' + n + " of " + o + '"><span class="slide-number">' + n + "</span>/" + o + "</a>"
        },
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                centerMode: !1,
                vertical: !1,
                swipe: !0,
                adaptiveHeight: !0,
                dots: !1
            }
        }]
    });
    $(".roadmap-slider-nav").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        focusOnSelect: !0,
        centerMode: !0,
        vertical: !0,
        centerPadding: 0,
        swipe: !1,
        asNavFor: ".roadmap-slider-for",
        arrows: !1,
        dots: !1,
        infinite: !1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                centerMode: !1,
                vertical: !1,
                swipe: !0,
                arrows: !1
            }
        }]
    });
    setRaisedLegend();
});
/*---------------------*/
/*---------------------*/
/*---------------------*/
/*----------Variables-----------*/
// Form select birthday English
const en_year = ['Year','1950','1951','1952','1953','1954','1955','1956','1957','1958','1959','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969','1970','1971','1972','1973','1974','1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'], 
en_month = ['Month','January','February','March','April','May','June','July','August','September','October','November','December'],
en_days = ['Day','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  // Countries
  const country_arr = ["","Afghanistan", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lesotho", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Georgia and South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Zambia"];
  const captcha_arr = ['1','2','3','4','5','6','7','8','9','0','a','b','c','q','w','e','r','t','y','u','i','o','p','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
  /*---------------------*/
  /*---------------------*/
  /*---------------------*/
  /*----------EVENTS-----------*/
  var showForm = true;
  var menu_selector = "#site-nav";
  function updateForm(){
    if(showForm){
        $('#header__link').click(function(){
            $('#sib_embed_signup').animate({
                width: "331px",
                opacity: "1"
            },700);
            $(this).hide();
        });
    }
}
function jumpingArrow(){
    $('#header__arrow').mouseenter(function(){
        $(this).find('.header__arrow--img').css('top','-25px');
        $(this).find('.header__arrow--img').animate({
            top: '0'
        },300);
    });
}

function customScrolling(){
    $('#nav-main .nav__logo').on('click',function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
}
function circleLang(){
    $('#nav-main .nav__links-lang .nav__link-lang--lang .select-styled').click(function(){
        $(this).parent('.select').siblings('.base').addClass('clicked');
    });
    $('#nav-main .nav__links-lang .nav__link-lang--lang').mouseleave(function(){
        $('#nav-main .nav__links-lang .select-options').hide();
        $('#nav-main .nav__links-lang .select-styled').removeClass('active');
        $('#nav-main .nav__links-lang .nav__link-lang--lang .base').removeClass('clicked');
    });
    $('#nav-main .nav__links-lang .nav__link-lang--lang .base, body').click(function(){
        $('#nav-main .nav__links-lang .nav__link-lang--lang .base').removeClass('clicked');
    });
    $('#nav-main .nav__links-lang .select-options').mouseleave(function(){
        $(this).hide();
        $('#nav-main .nav__links-lang .select-styled').removeClass('active');
        $('#nav-main .nav__links-lang .nav__link-lang--lang .base').removeClass('clicked');
    });
}
function videoControllers(){
    $('.about__video-block--btn-play').click(function(){
        if($(this).hasClass('play')){
            $('#video-preview').get(0).play();
            $(this).addClass('stop').removeClass('play');
            $(this).find('img').attr('src','/img/stop.svg');
            return;
        }

        if($(this).hasClass('stop')){
            $('#video-preview').get(0).pause();
            $(this).addClass('play').removeClass('stop');
            $(this).find('img').attr('src','/img/play.svg');
            return;
        }
    });
}
function windowOnSroll(){
    $(window).scroll(function(){
        if(window.screen.width > 768 || window.innerWidth>768 || window.screen.availWidth>768){
            if($(this).scrollTop() > 1200)
                $('#main-header').css('position','absolute');
            else
                $('#main-header').css('position','fixed');
        }
    });
}

function checkGetMDL(){
    $('#get-mdl-modal').mousemove(function(){
        if($('.term-checkbox-one').is(':checked') && $('.term-checkbox-two').is(':checked') && $('.term-checkbox-three').is(':checked') && $('.term-checkbox-four').is(':checked') && $('.term-checkbox-five').is(':checked')){
            $('#dropdownMenuLink').addClass('active');
        } else {
            $('#dropdownMenuLink').removeClass('active');
        }
    });
}

function setRaisedLegend(){
    $.getJSON("/ito-stats", function(data){
        var mdl = Number(data.mdl).toFixed(2);
        var usd = Number(data.usd).toFixed(2);
        $('#raised-dollars').text(usd);
        $('#raised-mdl').text(mdl);
        var line_percent = (data.usd / 10000000) * 100;
        $('#pink-line').css('width',line_percent + "%");
    });
}

function doScrambleText(element,phrase){ 
  const el = document.querySelector(element);
  const fx = new TextScramble(el);
  fx.setText(phrase);
}
function initScrambleText(){
    $('#nav__link-lang--blog').mouseenter(function(){
        doScrambleText('#nav__link-lang--blog','BLOG')
    });
}
function initSiteNav() {

    $(document).on("scroll", onScroll);

    $("#site-nav .site-nav__item").click(function(e){
        e.preventDefault();
        $(document).off("scroll");
        $("#site-nav .site-nav__item.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).find('.site-nav__link').attr("href");
        var target = $(hash);
        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });
    });

}
function onScroll(){
    if($(document).scrollTop() > 830){
        $('#site-nav').css('z-index','5000000');
    }
    var scroll_top = $(document).scrollTop();
    $("#site-nav .site-nav__item").each(function(){
        var hash = $(this).find('.site-nav__link').attr("href");
        var target = $(hash);
        if(window.screen.width > 768 || window.innerWidth>768 || window.screen.availWidth>768){
            if ($('#wallet').position().top <= scroll_top && $('#wallet').position().top + $('#wallet').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").addClass('white');
            } else if($('#about').position().top && $('#about').position().top + $('#solution').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").removeClass('white');
            } else if($('.section-wrapper-second').position().top <= scroll_top && $('.section-wrapper-second').position().top + $('.section-wrapper-second').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").removeClass('white');
            } else if($('#roadmap').position().top <= scroll_top && $('#roadmap').position().top + $('#roadmap').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").removeClass('white');
            } else if($('.section-wrapper-third').position().top <= scroll_top && $('.section-wrapper-third').position().top + $('.section-wrapper-third').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").removeClass('white');
            } else if($('#team').position().top <= scroll_top && $('#team').position().top + $('#team').outerHeight() > scroll_top){
                $("#site-nav .site-nav__link").addClass('white');
            }
            if($('#about').position().top <= scroll_top && $('#about').position().top + $('#about').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#about"]').parent('.site-nav__item').addClass('active');
            } else if($('#wallet').position().top <= scroll_top && $('#wallet').position().top + $('#wallet').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#wallet"]').parent('.site-nav__item').addClass('active');
            } else if($('#problem').position().top + $('.section-wrapper-second').position().top <= scroll_top && $('#problem').position().top + $('.section-wrapper-second').position().top + $('#problem').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#problem"]').parent('.site-nav__item').addClass('active');
            } else if($('#solution').position().top + $('.section-wrapper-second').position().top <= scroll_top && $('#solution').position().top + $('.section-wrapper-second').position().top + $('#solution').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#solution"]').parent('.site-nav__item').addClass('active');
            } else if($('#instruments').position().top + $('.section-wrapper-second').position().top <= scroll_top && $('#instruments').position().top + $('.section-wrapper-second').position().top + $('#instruments').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#instruments"]').parent('.site-nav__item').addClass('active');
            } else if($('#roadmap').position().top <= scroll_top && $('#roadmap').position().top + $('#roadmap').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#roadmap"]').parent('.site-nav__item').addClass('active');
            } else if($('#team').position().top <= scroll_top && $('#team').position().top + $('#team').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#team"]').parent('.site-nav__item').addClass('active');
            } else if($('#mentors').position().top + $('.section-wrapper-third').position().top <= scroll_top && $('#mentors').position().top + $('.section-wrapper-third').position().top + $('#mentors').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#mentors"]').parent('.site-nav__item').addClass('active');
            } else if($('#media').position().top + $('.section-wrapper-third').position().top <= scroll_top && $('#media').position().top + $('.section-wrapper-third').position().top + $('#media').outerHeight() > scroll_top){
                $("#site-nav .site-nav__item.active").removeClass("active");
                $('#site-nav .site-nav__link[href$="#media"]').parent('.site-nav__item').addClass('active');
            } 
            else{
                $('#site-nav .site-nav__link').removeClass("active");
            }
        }
    });
}
function mentorsPopup(){
    $('.mentor__item').click(function(){
        $('#mentorsModal .modal-body').html($(this).find('.mentor__item--desc').html());
        $('#mentorsModal .modal--linkin').remove();
        var path = $(this).find('.mentor__item--linkin').attr('href');
        var linked_template = '<a href="'+path+'" class="modal--linkin" ><img src="img/linkedin-logo.svg" alt=""></a>';
        $('#mentorsModal .modal-body').html($(this).find('.mentor__item--desc').html());
        if( path.length > 2){
          $('#mentorsModal .modal-content').append(linked_template);
      } 
  })
}
function teamPopup(){
  $('.team__item').click(function(){
    $('#teamModal .modal--linkin').remove();
    var path = $(this).find('.team__item--link').attr('href');
    var linked_template = '<a href="'+path+'" class="modal--linkin" ><img src="img/linkedin-logo.svg" alt=""></a>';
    $('#teamModal .modal-body').html($(this).find('.team__item--desc').html());
    if(path){
      $('#teamModal .modal-content').append(linked_template);
  } 
});
}
function showInstruments(){
  $('#in-vm').click(function(){
      $('.instruments__box').removeClass('hide-on-mobile');
      $(this).hide();
  });
}
function burger(){
  $('.nav__burger').click(function(){
    $(this).toggleClass('click');
    $('#menu').toggleClass('open');
    $('#menu').addClass('opening');
    $('body').toggleClass('menu_open');
    $('.nav__links-lang,.nav__logo,#nav-main').toggleClass('menu-open')
    if(!$('#menu').hasClass('open')){
      setTimeout(function(){
        $('#menu').removeClass('opening');
    },500);
  }
});
  $('.menu-list__link').click(function(){
    $('.nav__burger').removeClass('click');
    $('#menu').removeClass('open');
    $('#menu').removeClass('opening');
    $('body').removeClass('menu_open');
    $('.nav__links-lang,.nav__logo,#nav-main').removeClass('menu-open')
})
}
function rpModal(){
  $('.rp-video-link').click(function(e){
    e.preventDefault();
    var path = $(this).attr('data-media');
    var video_template = '<video class="video_in-modal" preload = "metadata" controls src="'+path+'"></video>'
    $('.modal-body').html(video_template);
});
  $('.rp-image-link').click(function(e){
    e.preventDefault();
    var path = $(this).attr('data-media');
    var video_template = '<img class="image_in-modal" src="'+path+'">'
    $('#rp-modal .modal-body').html(video_template);
});

  $("#rp-modal").on('hidden.bs.modal', function () {
      if($('#rp-modal .video_in-modal').length > 0)
        $('#rp-modal .video_in-modal').get(0).pause();
}); 
}
function incomeCards(element){

  return element.each(function(){

    var $this = $(this),
    $cards = $this.find('.income-card'),
    $current = $cards.filter('.card--current'),
    $next;

    $cards.on('click',function(){
      if ( !$current.is(this) ) {
        $cards.removeClass('card--current card--out card--next');
        $current.addClass('card--out');
        $current = $(this).addClass('card--current');
        $next = $current.next();
        $next = $next.length ? $next : $cards.first();
        $next.addClass('card--next');
        if($('.income-card.card--current').hasClass('first')){
            $('#income-menu li.second').addClass('active');
            $('#income-menu li.first').removeClass('active');
        }
        if($('.income-card.card--current').hasClass('second')){
           $('#income-menu li.first').addClass('active');
           $('#income-menu li.second').removeClass('active');
       }
   }
});
    if ( !$current.length ) {
      $current = $cards.last();
      $cards.first().trigger('click');
  }

  $this.addClass('cards--active');
})
};
function incomeEvents(){
    $('.income-arrow.purple,.income-legend.purple').hover(
        function(){
            $('.income-legend.purple').find('.income-legend-image').css('transform','scale(1.1)');
            $('.income-legend.purple').css({'font-size':'16px','font-weight':'600'});
            $('.income-arrow.purple').css('transform','scale(1.1)');
        }, function(){
            $('.income-arrow.purple').css('transform','scale(1)');
            $('.income-legend.purple').find('.income-legend-image').css('transform','scale(1)');
            $('.income-legend.purple').css({'font-size':'14px','font-weight':'400'});
        }
    );
    $('.income-arrow.pink,.income-legend.pink').hover(
        function(){
            $('.income-legend.pink').find('.income-legend-image').css('transform','scale(1.1)');
            $('.income-legend.pink').css({'font-size':'16px','font-weight':'600'});
            $('.income-arrow.pink').css('transform','scale(1.1)');
        }, function(){
            $('.income-arrow.pink').css('transform','scale(1)');
            $('.income-legend.pink').css({'font-size':'14px','font-weight':'400'});
            $('.income-legend.pink').find('.income-legend-image').css('transform','scale(1)');
        }
    );
    $('.income-arrow.blue,.income-legend.blue').hover(
        function(){
            $('.income-legend.blue').find('.income-legend-image').css('transform','scale(1.1)');
            $('.income-legend.blue').css({'font-size':'16px','font-weight':'600'});
            $('.income-arrow.blue').css('transform','scale(1.1)');
        }, function(){
            $('.income-arrow.blue').css('transform','scale(1)');
            $('.income-legend.blue').css({'font-size':'14px','font-weight':'400'});
            $('.income-legend.blue').find('.income-legend-image').css('transform','scale(1)');
        }
    );
    $('.income-arrow.yellow,.income-legend.yellow').hover(
        function(){
            $('.income-legend.yellow').find('.income-legend-image').css('transform','scale(1.1)');
            $('.income-legend.yellow').css({'font-size':'16px','font-weight':'600'});
            $('.income-arrow.yellow').css('transform','scale(1.1)');
        }, function(){
            $('.income-arrow.yellow').css('transform','scale(1)');
            $('.income-legend.yellow').css({'font-size':'14px','font-weight':'400'});
            $('.income-legend.yellow').find('.income-legend-image').css('transform','scale(1)');
        }
    );
    $('.income-arrow.dark-blue,.income-legend.dark-blue').hover(
        function(){
            $('.income-legend.dark-blue').find('.income-legend-image').css('transform','scale(1.1)');
            $('.income-legend.dark-blue').css({'font-size':'16px','font-weight':'600'});
            $('.income-arrow.dark-blue').css('transform','scale(1.1)');
        }, function(){
            $('.income-arrow.dark-blue').css('transform','scale(1)');
            $('.income-legend.dark-blue').css({'font-size':'14px','font-weight':'400'});
            $('.income-legend.dark-blue').find('.income-legend-image').css('transform','scale(1)');
        }
    );
    $('#income-menu li').click(function(){
        if($(this).hasClass('first')){
            $('.income-card:eq(0)').trigger('click');
            $(this).addClass('active');
            $('#income-menu li.second').removeClass('active');
            $('#income-menu li.third').removeClass('active');
        }
        if($(this).hasClass('second')){
            $('.income-card:eq(1)').trigger('click');
            $(this).addClass('active');
            $('#income-menu li.first').removeClass('active');
            $('#income-menu li.third').removeClass('active');
        }
        if($(this).hasClass('third')){
            $('.income-card:eq(2)').trigger('click');
            $(this).addClass('active');
            $('#income-menu li.first').removeClass('active');
            $('#income-menu li.second').removeClass('active');
        }
    });
}
// --- FORM ----  --- FORM ---- --- FORM ----  --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----    --- FORM ----   --- FORM ----
// Cписок инпутов (где без префикса пи инпут селекты)  $('#pi-input--name') $('#pi-input--day') $('#month') $('#pi-input--year')
// $('#pi-input--email')  $('#country')  $('#pi-input--passport')
// так же добавил скрытую кнопку сабмита(если надо) $('#hidden-submit-form')
// addOptionToBirthSelect(arr,select) - добавляет значения в селект 
// --- FORM ----  --- FORM ---- --- FORM ----  --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----   --- FORM ----    --- FORM ----   --- FORM ----
///submitting form
function submitAllForm(){
    $('#submit-btn').click(function(e){
        e.preventDefault();
        if($(this).hasClass('disabled')){
            return;
        }
        var formData = new FormData($('#main-whitelist-form')[0]);
        $.ajax({
            url: "/ajax/whitelist/request",
            type: "POST",
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                $('#error-send').hide();
                $('#whitelist-waiting-send').removeClass('loaded');
                setCaptcha();
            },
            success: function (data) {
                if (data.success) {
                    ga('send', 'event', 'Whitelist-Form', 'Submit', 'Successful submitting of whitelist form');
                    $('.white-list--btn').removeClass('disabled');
                    $('.white-list--dot[data-dot = "4"]').removeClass('disabled');
                    setTimeout(function(){
                        $('#confirm').addClass('active');
                    },60000);
                    $('#whitelist-waiting-send').addClass('loaded');
                    clickOnChosenDot(4);
                }
            },
            error: function (xhr, exception) {
             if (xhr.status === 0) {
                $('#error-send').html('Your form was not sent, please try to send later');
                $('#error-send').show();
                setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
                },600);
                console.log('Not connected.\nPlease verify your network connection.');
             } else if (xhr.status == 404) {
             $('#error-send').html('Your form was not sent, please try to send later');
             $('#error-send').show();
             setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
             },600);
             console.log('The requested page not found. [404]');
             } else if (xhr.status == 500) {
             $('#error-send').html('Your form was not sent, please try to send later');
             $('#error-send').show();
             setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
             },600);
             console.log('Internal Server Error [500].');
             } else if (xhr.status == 422) {
               var json = JSON.parse(xhr.responseText);
               if(json && json.errors) {
                 setTimeout(function(){
                   clickOnChosenDot(2);
                   $.each(json.errors, function (key, err) {
                     applyError(key, err);
                   })
                 },600);
               } else {
                 $('#error-send').html('Your form was not sent, please try to send later');
                 $('#error-send').show();
               }
             } else if (xhr.status == 413) {
                 $('#error-send').html('Maximum size of attachment - 15mb');
                 $('#error-send').show();
                  setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--passport').val('');
                    applyError('passport', 'Maximum size of attachment - 15mb')
                 },600);
                 console.log('Big file size [413].');
             } else if (exception === 'parsererror') {
                 $('#error-send').html('Your form was not sent, please try to send later');
                 $('#error-send').show();
                 setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
                 },600);
                 console.log('Requested JSON parse failed.');
             } else if (exception === 'timeout') {
                 $('#error-send').html('Your form was not sent, please try to send later');
                 $('#error-send').show();
                 setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
                 },600);
                 console.log('Time out error.');
             } else if (exception === 'abort') {
                 $('#error-send').html('Your form was not sent, please try to send later');
                 $('#error-send').show();
                 setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
                 },600);
                 console.log('Ajax request aborted.');
             } else {
                 $('#error-send').html('Your form was not sent, please try to send later');
                 $('#error-send').show();
                 setTimeout(function(){
                    clickOnChosenDot(2);
                    $('#pi-input--captchaSolution').val('');
                    $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
                 },600);
                 console.log('Uncaught Error.\n' + xhr.responseText);
             }
            $('#whitelist-waiting-send').addClass('loaded');
    }
});
    });

}

function applyError(fieldName, err) {
  fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  var
    $input = $('#main-whitelist-form').find('[name="'+ fieldName +'"]'),
    $container = $input.closest('.pi-input--wrapper'),
    $helper = $container.find('.helper');

  if(!$helper.length) {
    $helper = $('<span class="helper"/>');
    $container.append($helper);
  }

  $helper.text(err);
  $container.addClass('has-error');
}

function removeErrorsOnChange() {
  var $form = $('#main-whitelist-form'),
    removeErrorClass = function() {
      var $this = $(this);
      $this.closest('[class*="--wrapper"]').removeClass('has-error')
    };

  $form.find('input').on('click', removeErrorClass);
  $form.find('select').on('click change', removeErrorClass);
}

var captcha_id = '';
function initBirthSelect(){
	var name = $('#pi-input--name');
	var country = $('#country'),
	citizen = $('#citizen'),
	phone = $('#pi-input--phone');
	addOptionToCountrySelect(country_arr,country);
	customizeSelect(country);
	addOptionToCountrySelect(country_arr,citizen);
	customizeSelect(citizen);
	forceLetter(name);
	setFileInput();
	setCaptcha();
	searchSelect();
	blurCheck();
	clickOnConfirm();
	$('.input-group.date').datepicker({
		format: "yyyy-mm-dd",
		startView: 2,
		maxViewMode: 2,
		autoclose: true,
		startDate: "1950y 1m 0d",
		endDate: "2001y 1m 0d"
	});
	phone.intlTelInput({
		initialCountry: "auto",
		geoIpLookup: function(callback) {
			$.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
				var countryCode = (resp && resp.country) ? resp.country : "";
				callback(countryCode);
			});
		},
    utilsScript: "../js/utils.js" // just for formatting/placeholders etc
});
}
function clickOnConfirm(){
    $('#confirm').click(function(){
        if($(this).hasClass('active')){
            $(this).text('Purchase Confirmed');
        }
    });
}
function setCaptcha(){
    $.get("/ajax/captcha/id", function(data, status){
        if(status === "success"){
            captcha_id = data;
            $('#captcha-image').attr('src','/ajax/captcha/'+captcha_id+'.png');
            $('#captcha-audio').attr('src','/ajax/captcha/'+captcha_id+'.wav?lang=en');
            $('#captchaId').val(captcha_id);
            $('#pi-input--captchaSolution').val(''); // reset input for new captcha
        }
    });
}
function setSrcQuery(e, q) {
    var src  = e.attr('src');
    var p = src.indexOf('?');
    if (p >= 0) {
        src = src.substr(0, p);
    }
    e.attr('src',''+src+'?'+q+'')
}
function playAudioCaptcha() {
    var e = $('#captcha-audio')[0];
    e.play();
    return false;
}
function reloadCaptcha() {
    setSrcQuery($('#captcha-image'), "reload=" + (new Date()).getTime());
    setSrcQuery($('#captcha-audio'), (new Date()).getTime());
    return false;
}
function checkCaptcha(){
    if($('#pi-input--captchaSolution').val().length == 6){
        $('#pi-input--captchaSolution').css({'border' : '1px solid #eff0f0'});
        return true;
    } else {
        $('#pi-input--captchaSolution').css({'border' : '1px solid #ff0000'});
        return false;
    }
}

function checkPhone(){
    var telInput = $('#pi-input--phone');
    telInput.blur(function(){
        if (telInput.intlTelInput("isValidNumber")) {
          $(this).css({'border' : '1px solid #eff0f0'});
          return true;
        } else {
          $(this).css({'border' : '1px solid #ff0000'});
          return false;
        }
    });
}

function addOptionToCountrySelect(arr,select){
   for(var i = 0; i < arr.length; i++){
       select.append('<option value ="'+arr[i]+'">'+arr[i]+'</option>');
   }
}
function checkInputs(){
    var name_input = $('#pi-input--name'),
    email_input = $('#pi-input--email'),
    date_birth = $('#pi-input--date-birth'),
    file_input = $('#pi-input--passport'),
    select_country = $('#country');
    $('.white-list--dot[data-dot = "3"]').addClass('disabled');
    $('#whitelist-form--next,.whitelist-form--next').addClass('disabled');
    $('.white-list--btn[data-dir = "up"]').removeClass('disabled');
    $('.white-list--btn[data-dir = "down"]').addClass('disabled');
    if(file_input.val().length !=0 && name_input.val().length != 0 && email_input.val().length != 0 && select_country.val().length != 0 && date_birth.val().length > 0){
        //
    } else {
        return;
    }
    
    if(checkEmailInput() && checkCaptcha() && checkPhone()){
        $('#whitelist-form--next,.whitelist-form--next').removeClass('disabled');
        $('.white-list--dot[data-dot = "3"]').removeClass('disabled');
        $('.white-list--btn').removeClass('disabled');
    }
}
function blurCheck(){
    $('#pi-input--email').blur(function(){
       var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,30}$/i;
       if(pattern.test($('#pi-input--email').val())){
        $('#pi-input--email').css({'border' : '1px solid #eff0f0'});
        return true;
    } else {
        $('#pi-input--email').css({'border' : '1px solid #ff0000'});
        return false;
    }
});
    $('#pi-input--name').blur(function(){
        if($(this).val().length != 0){
            $(this).css({'border' : '1px solid #eff0f0'});
        } else {
            $(this).css({'border' : '1px solid #ff0000'});
        }
    });
    var telInput = $('#pi-input--phone');
    telInput.blur(function(){
        if (telInput.intlTelInput("isValidNumber")) {
          $(this).css({'border' : '1px solid #eff0f0'});
        } else {
          $(this).css({'border' : '1px solid #ff0000'});
        }
    })

}
function submitCheckbox(){
    if($('.term-checkbox-one').is(':checked') && $('.term-checkbox-two').is(':checked') && $('.term-checkbox-three').is(':checked') && $('.term-checkbox-four').is(':checked')){
        $('#submit-btn').removeClass('disabled');
        $('.terms').scrollTop($('.terms')[0].scrollHeight);
    } else{
        $('#submit-btn').addClass('disabled');
        $('.white-list--btn[data-dir = "up"]').removeClass('disabled');
        $('.white-list--btn[data-dir = "down"]').addClass('disabled');
        $('.white-list--dot[data-dot = "1"],.white-list--dot[data-dot = "2"],.white-list--dot[data-dot = "3"]').removeClass('disabled');
        $('.white-list--dot[data-dot = "4"]').addClass('disabled');
    }
}
function checkEmailInput(){
    if($('#pi-input--email').val() != '') {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,30}$/i;
      if(pattern.test($('#pi-input--email').val())){
        $('#pi-input--email').css({'border' : '1px solid #eff0f0'});
        return true;
    } else {
        $('#pi-input--email').css({'border' : '1px solid #ff0000'});
        return false;
    }
}
}
function resetCheck(){
    $('.check-input').each(function(){
        $(this).css({'border' : '1px solid #eff0f0'});
    });
    $('#pi-input--email').css({'border' : '1px solid #eff0f0'});
    $('#pi-input--date-birth').css({'border' : '1px solid #eff0f0'});
     $('#captcha-error').hide();
}

function checkboxEvents(){
    $('input[name = "private"],#private-label').click(function(){
        $('input[name = "institutional"]').prop('checked',false);
        $('input[name = "private"]').prop('checked',true);
    });
    $('.ti-fc').click(function(){
        if($(this).find('input[type = "checkbox"]').is(':checked'))
            $(this).find('input[type = "checkbox"]').prop('checked', false);
        else
            $(this).find('input[type = "checkbox"]').prop('checked', true);
    });
    $('.term-checkbox').click(function(){
        if($(this).is(':checked'))
            $(this).prop('checked', false);
        else
            $(this).prop('checked', true);
    });
}
function forceLetter(element) {
   element.keydown(function (e) {
    element.keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
           return;
   }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 40 || e.keyCode > 57)) && (e.keyCode < 95 || e.keyCode > 104)) {
            return;
        } else {
            e.preventDefault();
        }
    });
});
}
function forceNumber(element){
    element.keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
           return;
   }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 40 || e.keyCode > 57)) && (e.keyCode < 95 || e.keyCode > 104)) {
            e.preventDefault();
        }
    });
}
function searchSelect(){
    $('#month-search').keyup(function(){
        var input_val = $('#month-search').val().toLowerCase();
        $('.select-options.month li').each(function(){
            if($(this).find('span').html().toLowerCase().indexOf(input_val) > -1){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $('#country-search').keyup(function(){
        var input_val = $('#country-search').val().toLowerCase();
        $('.select-options.country li').each(function(){
            if($(this).find('span').html().toLowerCase().indexOf(input_val) > -1){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
}
function setFileInput(){
    $('#pi-input--passport').change(function(){
        var filename = $(this).val().replace(/.*\\/, "");
        $(".file-upload-styled").val(filename);
    });
    $('.file-upload-styled').click(function(){
        $('#pi-input--passport').click();
    });
}
//--- SLIDER ----
function formSliderInit(){
  var dots = $('.white-list--dot'),
  button = $('.white-list--btn'),
  content_item = $('.white-list--content-item');
  setContentItem(content_item);
  setDots(dots);
  setContentPosition(content_item,1);
  setButton(button,content_item);
  btnNext(content_item);
  btnBack(content_item);
  clickOnDot();
  $('#whitelist-form').on('click keyup paste', function(){
    setAccess();
});
  
  $('#whitelist-form--next,.white-list--dot,.white-list--btn,.whitelist-form--next').click(function(){
    if($(this).hasClass('disabled')){
        if($('.white-list--content-item.current').attr('data-step') == 2){
            $('.check-input').each(function(){
                if($(this).val().length != 0){
                    $(this).css({'border' : '1px solid #eff0f0'});
                } else {
                    $(this).css({'border' : '1px solid #ff0000'});
                }
            });
            checkEmailInput();
            if($('#country').val() != 0){
                $('#country-search').css({'border' : '1px solid #eff0f0'});
            } else {
                $('#country-search').css({'border' : '1px solid #ff0000'});
            }
        }
    }
});
  $('.check-input').click(function(){
    resetCheck();
})

}
function upSlide(item){
    item.each(function(i){
        var item_height = item.height();
        var top = parseInt($(this).css('top'),10);
        var val = top + item_height;
        $(this).css('top',val);
    })
}
function downSlide(item){
    item.each(function(i){
        var item_height = item.height();
        var top = parseInt($(this).css('top'),10);
        var val = top - item_height;
        $(this).css('top',val);
    });
    return false;
}
function setAccess(){
    $('.white-list--btn').addClass('disabled');
    if($('.white-list--content-item.current').attr('data-step') == 1){
        $('.white-list--dot').addClass('disabled');
        $('#whitelist-form--next').show();
        $('#whitelist-form--next,.whitelist-form--next').addClass('disabled')
        $('.white-list--btn').addClass('disabled');
        $('#thank-wrapper').show();
        $('#whitelist-form--next,.whitelist-form--next').removeClass('disabled');
        $('.white-list--dot[data-dot="1"],.white-list--dot[data-dot="2"]').removeClass('disabled');
        $('.white-list--btn').removeClass('disabled');
    }

    if($('.white-list--content-item.current').attr('data-step') == 2){
        $('#whitelist-form--next').show();
        checkInputs();
    }
    if($('.white-list--content-item.current').attr('data-step') == 3){
       $('#whitelist-form--next').hide();
       submitCheckbox();
   }
   if($('.white-list--content-item.current').attr('data-step') == 4){
       $('#whitelist-form--next').hide();
       $('.white-list--btn').addClass('disabled');
       $('.white-list--dot').addClass('disabled');
   }
}
function btnNext(item){
    $('#whitelist-form--next,.whitelist-form--next').click(function(){
        if($('input[name = "institutional"]').is(':checked')){
            if($('.white-list--content-item.current').attr('data-step') == 1){
              clickOnChosenDot(4);
          }
          if($('.white-list--content-item.current').attr('data-step') == 4){
              return;
          }
      }
      if($(this).hasClass('disabled')){
        return;
    }
    var current = $('.white-list--content-item.current');
    current.next().addClass('current');
    current.removeClass('current');
    downSlide(item);
    currentDot();
       //listenCurrent();
   });
}
function btnBack(item){

    $('#whitelist-form--back,.whitelist-form--back').click(function(){
      if($('input[name = "institutional"]').is(':checked')){
        if($('.white-list--content-item.current').attr('data-step') == 4){
          clickOnChosenDot(1);
          return;
      }
  }
  if($(this).hasClass('disabled')){
      return;
  }
  if($(this).hasClass('waiting')){
      return;
  }
  if($('.white-list--content-item.current').attr('data-step') == 1){
      return;
  }
  var current = $('.white-list--content-item.current');
  current.prev().addClass('current');
  current.removeClass('current')
  upSlide(item);
  currentDot();
});
}
function setContentPosition(item,position){
    var percent = 100;
    item.each(function(i){
        $(this).css('top',percent*(i) + '%')
        if($(this).attr('data-step') == position){
          $(this).addClass('current');
          $('.white-list--dot[data-dot = "'+(i+1)+'"]').addClass('active');
      }
  })
}
function setButton(btn,item){
  btn.click(function(){
    var $this = $(this);
    if($this.attr('data-dir') == 'up'){
        if($('input[name = "institutional"]').is(':checked')){
            if($('.white-list--content-item.current').attr('data-step') == 4){
              clickOnChosenDot(1);
              return;
          }
      }
      if($this.hasClass('disabled')){
          return;
      }
      if($this.hasClass('waiting')){
          return;
      }
      if($('.white-list--content-item.current').attr('data-step') == 1){
          return;
      }
      var current = $('.white-list--content-item.current');
      current.prev().addClass('current');
      current.removeClass('current')
      upSlide(item);
      currentDot();
      $this.addClass('waiting');
      setTimeout(function(){
          $this.removeClass('waiting');
      },700);
  }
  if($this.attr('data-dir') == 'down'){
    if($('input[name = "institutional"]').is(':checked')){
        if($('.white-list--content-item.current').attr('data-step') == 1){
          clickOnChosenDot(4);
          return;
      }
  }
  if($this.hasClass('disabled')){
      return;
  }
  if($this.hasClass('waiting')){
      return;
  }
  if($('.white-list--content-item.current').attr('data-step') == 4){
      return;
  }
  var current = $('.white-list--content-item.current');
  current.next().addClass('current');
  current.removeClass('current');
  downSlide(item);
  currentDot();
  $this.addClass('waiting');
  setTimeout(function(){
      $this.removeClass('waiting');
  },700);
}
    //listenCurrent()
});
}
function setContentItem(item){
    item.each(function(i){
        $(this).attr('data-step',i+1)
    });
}
function setDots(dots){
    dots.each(function(i){
        $(this).attr('data-dot',i+1)
    })
}
function currentDot(){
    var position = $('.white-list--content-item.current').attr('data-step');
    $('.white-list--dot.active').removeClass('active');
    $('.white-list--dot[data-dot = "'+position+'"]').addClass('active');
}
function clickOnDot(){
    var content_item = $('.white-list--content-item');
    var content_item_height = parseInt(content_item.height(),10);
    $('.white-list--dot').click(function(){
        if($(this).hasClass('disabled')){
            return;
        }
        var content_num = $('.white-list--content-item.current').attr('data-step');
        var dot_num = $(this).attr('data-dot');
        var loop_start = 0 - dot_num + 1;
        if(dot_num == 1){
            setContentPosition($('.white-list--content-item'),1);
        }
        content_item.each(function(){
            $(this).css('top',content_item_height*loop_start);
            loop_start++;
        });
        $('.white-list--dot.active').removeClass('active');
        $(this).addClass('active');
        $('.white-list--content-item.current').removeClass('current');
        $('.white-list--content-item[data-step = "'+dot_num+'"]').addClass('current');
        //listenCurrent();
    });
}
function clickOnChosenDot(num){
    var content_item = $('.white-list--content-item');
    var content_item_height = parseInt(content_item.height(),10);
    if($(this).hasClass('disabled')){
        return;
    }
    var content_num = $('.white-list--content-item.current').attr('data-step');
    var dot_num = num;
    var loop_start = 0 - dot_num + 1;
    if(dot_num == 1){
        setContentPosition($('.white-list--content-item'),1);
    }
    content_item.each(function(){
        $(this).css('top',content_item_height*loop_start);
        loop_start++;
    });
    $('.white-list--dot.active').removeClass('active');
    $('.white-list--dot[data-dot = "'+dot_num+'"]').addClass('active');
    $('.white-list--content-item.current').removeClass('current');
    $('.white-list--content-item[data-step = "'+dot_num+'"]').addClass('current');
}
function turnOffForm(){
    $('#main-whitelist-form').submit(function(e){
        e.preventDefault();
    });
}
function actionOnEnter(){
    $(document).keypress(function(e){
        if (e.which == 13) {
            if($('#whitelist-form--next').hasClass('disabled')){
                return;
            }
            if($('.white-list--content-item.current').attr('data-step') == 3){
              return;
          }
          if($('.white-list--content-item.current').attr('data-step') == 4){
              return;
          }
          var current = $('.white-list--content-item.current');
          current.next().addClass('current');
          current.removeClass('current');
          downSlide($('.white-list--content-item'));
          currentDot();
      }
  });
}
function wlLoader(){
    setTimeout(function(){
        $('#whitelist-loader').addClass('loaded');
    },2000);
}

function formInit(){
    actionOnEnter();
    wlLoader();
    checkboxEvents();
    turnOffForm();
    initBirthSelect();
    $('.white-list--dot').addClass('disabled');
    submitAllForm();
    formSliderInit();
    removeErrorsOnChange();
   // searchSelect();
}
/*---------------------*/
/*---------------------*/
/*---------------------*/
/*----------TIMER-----------*/
function get_timer() {
   var date_t = new Date(Date.UTC(2018, 02, 24, 00, 01));

   var date = new Date(Date.now());
   var timer = date_t - date;
   if(date_t > date) {

      var day = parseInt(timer/(60*60*1000*24));
      if(day < 10) {
        day = '0' + day;
    }
    day = day.toString();
    var hour = parseInt(timer/(60*60*1000))%24;
    if(hour < 10) {
        hour = '0' + hour;
    }
    hour = hour.toString();
    var min = parseInt(timer/(1000*60))%60;
    if(min < 10) {
     min = '0' + min;
 }
 min = min.toString();
 var sec = parseInt(timer/1000)%60;
 if(sec < 10) {
    sec = '0' + sec;
}
sec = sec.toString(); 
}
$('#timer_d').html(day);
$('#timer_h').html(hour);
$('#timer_m').html(min);
$('#timer_s').html(sec);
setTimeout(get_timer,1000);
}
/*---------------------*/
/*---------------------*/
/*---------------------*/
/*----------BUTTON WHITEPAPER ANIMATION-----------*/
if(window.screen.width > 768 || window.innerWidth > 768 || window.screen.availWidth > 768){
    const LiquidButton = class LiquidButton {
      constructor(svg) {
        const options = svg.dataset;
        this.id = this.constructor.id || (this.constructor.id = 1);
        this.constructor.id++;
        this.xmlns = 'http://www.w3.org/2000/svg';
        this.tension = options.tension * 1 || 0.4;
        this.width   = options.width   * 1 || 200;
        this.height  = options.height  * 1 ||  50;
        this.margin  = options.margin  ||  40;
        this.hoverFactor = options.hoverFactor || -0.1;
        this.gap     = options.gap     ||   3;
        this.debug   = options.debug   || false;
        this.forceFactor = options.forceFactor || 0.2;
        this.color1 = options.color1 || '#36DFE7';
        this.color2 = options.color2 || '#8F17E1';
        this.color3 = options.color3 || '#BF09E6';
        this.textColor = options.textColor || '#eb3fa1';
        this.text = options.text    || 'Button';
        this.svg = svg;
        this.layers = [{
          points: [],
          viscosity: 0.5,
          mouseForce: 100,
          forceLimit: 2,
      },{
          points: [],
          viscosity: 0.8,
          mouseForce: 0,
          forceLimit: 3,
      }];
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
          const layer = this.layers[layerIndex];
          layer.viscosity = options['layer-' + (layerIndex + 1) + 'Viscosity'] * 1 || layer.viscosity;
          layer.mouseForce = options['layer-' + (layerIndex + 1) + 'MouseForce'] * 1 || layer.mouseForce;
          layer.forceLimit = options['layer-' + (layerIndex + 1) + 'ForceLimit'] * 1 || layer.forceLimit;
          layer.path = document.createElementNS(this.xmlns, 'path');
          this.svg.appendChild(layer.path);
      }
      this.wrapperElement = options.wrapperElement || document.body;
      if (!this.svg.parentElement) {
          this.wrapperElement.append(this.svg);
      }

      this.svgText = document.createElementNS(this.xmlns, 'text');
      this.svgText.setAttribute('x', '50%');
      this.svgText.setAttribute('y', '50%');
      this.svgText.setAttribute('dy', ~~(this.height / 8) + 'px');
      this.svgText.setAttribute('font-size', 14);
      this.svgText.style.fontFamily = 'Open Sans';
      this.svgText.style.fontWeight = 700;
      this.svgText.setAttribute('text-anchor', 'middle');
      this.svgText.setAttribute('pointer-events', 'none');
      this.svgText.setAttribute('id', "header__link--text")
      this.svg.appendChild(this.svgText);

      this.svgDefs = document.createElementNS(this.xmlns, 'defs')
      this.svg.appendChild(this.svgDefs);

      this.touches = [];
      this.noise = options.noise || 0;
      document.body.addEventListener('touchstart', this.touchHandler);
      document.body.addEventListener('touchmove', this.touchHandler);
      document.body.addEventListener('touchend', this.clearHandler);
      document.body.addEventListener('touchcancel', this.clearHandler);
      this.svg.addEventListener('mousemove', this.mouseHandler);
      this.svg.addEventListener('mouseout', this.clearHandler);
      this.initOrigins();
      this.animate();
  }

  get mouseHandler() {
    return (e) => {
      this.touches = [{
        x: e.offsetX,
        y: e.offsetY,
        force: 1,
    }];
};
}

get touchHandler() {
    return (e) => {
      this.touches = [];
      const rect = this.svg.getBoundingClientRect();
      for (let touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
        const touch = e.changedTouches[touchIndex];
        const x = touch.pageX - rect.left;
        const y = touch.pageY - rect.top;
        if (x > 0 && y > 0 && x < this.svgWidth && y < this.svgHeight) {
          this.touches.push({x, y, force: touch.force || 1});
      }
  }
  e.preventDefault();
};
}

get clearHandler() {
    return (e) => {
      this.touches = [];
  };
}

get raf() {
    return this.__raf || (this.__raf = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){ setTimeout(callback, 10)}
      ).bind(window));
}

distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

update() {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = layer.points;
      for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
        const point = points[pointIndex];
        const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
        const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = d * this.forceFactor;
        point.vx += f * ((dx / d) || 0);
        point.vy += f * ((dy / d) || 0);
        for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
          const touch = this.touches[touchIndex];
          let mouseForce = layer.mouseForce;
          if (
            touch.x > this.margin &&
            touch.x < this.margin + this.width &&
            touch.y > this.margin &&
            touch.y < this.margin + this.height
            ) {
            mouseForce *= -this.hoverFactor;
    }
    const mx = point.x - touch.x;
    const my = point.y - touch.y;
    const md = Math.sqrt(mx * mx + my * my);
    const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
    point.vx += mf * ((mx / md) || 0);
    point.vy += mf * ((my / md) || 0);
}
point.vx *= layer.viscosity;
point.vy *= layer.viscosity;
point.x += point.vx;
point.y += point.vy;
}
for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const prev = points[(pointIndex + points.length - 1) % points.length]; 
    const point = points[pointIndex];
    const next = points[(pointIndex + points.length + 1) % points.length];
    const dPrev = this.distance(point, prev);
    const dNext = this.distance(point, next);

    const line = {
      x: next.x - prev.x,
      y: next.y - prev.y,
  };
  const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

  point.cPrev = {
      x: point.x - (line.x / dLine) * dPrev * this.tension,
      y: point.y - (line.y / dLine) * dPrev * this.tension,
  };
  point.cNext = {
      x: point.x + (line.x / dLine) * dNext * this.tension,
      y: point.y + (line.y / dLine) * dNext * this.tension,
  };
}
}
}

animate() {
    this.raf(() => {
      this.update();
      this.draw();
      this.animate();
  });
}

get svgWidth() {
    return this.width + this.margin * 2;
}

get svgHeight() {
    return this.height + this.margin * 2;
}

draw() {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      if (layerIndex === 1) {
        if (this.touches.length > 0) {
          while (this.svgDefs.firstChild) {
            this.svgDefs.removeChild(this.svgDefs.firstChild);
        }
        for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            const touch = this.touches[touchIndex];
            const gradient = document.createElementNS(this.xmlns, 'radialGradient');
            gradient.id = 'liquid-gradient-' + this.id + '-' + touchIndex;
            const start = document.createElementNS(this.xmlns, 'stop');
            start.setAttribute('stop-color', this.color3);
            start.setAttribute('offset', '0%');
            const stop = document.createElementNS(this.xmlns, 'stop');
            stop.setAttribute('stop-color', this.color2);
            stop.setAttribute('offset', '100%');
            gradient.appendChild(start);
            gradient.appendChild(stop);
            this.svgDefs.appendChild(gradient);
            gradient.setAttribute('cx', touch.x / this.svgWidth);
            gradient.setAttribute('cy', touch.y / this.svgHeight);
            gradient.setAttribute('r', touch.force);
            layer.path.style.fill = 'url(#' + gradient.id + ')';
        }
    } else {
      layer.path.style.fill = this.color2;
  }
} else {
    layer.path.style.fill = this.color1;
}
const points = layer.points;
const commands = [];
commands.push('M', points[0].x, points[0].y);
for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
    commands.push('C',
      points[(pointIndex + 0) % points.length].cNext.x,
      points[(pointIndex + 0) % points.length].cNext.y,
      points[(pointIndex + 1) % points.length].cPrev.x,
      points[(pointIndex + 1) % points.length].cPrev.y,
      points[(pointIndex + 1) % points.length].x,
      points[(pointIndex + 1) % points.length].y
      );
}
commands.push('Z');
layer.path.setAttribute('d', commands.join(' '));
}
this.svgText.textContent = this.text;
this.svgText.style.fill = this.textColor;
}

createPoint(x, y) {
    return {
      x: x,
      y: y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
  };
}

initOrigins() {
    this.svg.setAttribute('width', this.svgWidth);
    this.svg.setAttribute('height', this.svgHeight);
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = [];
      for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin
          ));
    }
    for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
          ));
    }
    for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin + this.height
          ));
    }
    for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          (this.height - Math.sin(angle) * this.height / 2) + this.margin - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
          ));
    }
    layer.points = points;
}
}
}


const redraw = () => {
  button.initOrigins();
};

const buttons = document.getElementsByClassName('liquid-button');
for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
  const button = buttons[buttonIndex];
  button.liquidButton = new LiquidButton(button);
}
}
//--------------------------
// Validate & submit process
//--------------------------
(function($) {
        var dateFormat;
        if( $("input[name='hdn_new_format']").length )
        {
            dateFormat = sib_dateformat;
        }
        else {
            dateFormat = 'dd/mm/yyyy';
        }
        $('.tooltip').css({left: '101%'});

    // check if inputed sms value is valid
    function isValidSms(smsField, sms) {
        sms = sms.replace(/\b(0(?!\b))+/g, "");

        var tempSms = sms.replace(/( |\(|\)|\.|\-)/g, '');
        if (tempSms.length > 19 || tempSms.length < 6) {
            return false;
        }
        return true;
    }
    // check if inputed date value is valid
    function isValidDate(date) {
        var filter;
        if(dateFormat == 'dd/mm/yyyy')
        {
            filter = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }

        if(dateFormat == 'dd-mm-yyyy')
        {
            filter = /^(((0[1-9]|[12]\d|3[01])-(0[13578]|1[02])-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)-(0[13456789]|1[012])-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])-02-((19|[2-9]\d)\d{2}))|(29-02-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }
        else if(dateFormat == 'mm-dd-yyyy')
        {
            filter = /^(((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])-((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])-(0[1-9]|[12]\d|30)-((19|[2-9]\d)\d{2}))|(02-(0[1-9]|1\d|2[0-8])-((19|[2-9]\d)\d{2}))|(02-29-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }

        if (filter.test(date)) {
            return true;
        }
        return false;
    }
    // allow to input digit and + only for sms
    function validateInteger(smsLength, evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );

        // 0-9, +/-, space, brackets
        var regex = /[ +0-9()-]/;
        if( smsLength == 'date' ) {
            regex = /[ 0-9-]/;
            smsLength = 0;
        }
        if( !regex.test(key) || smsLength > 19 ) {
            theEvent.returnValue = false;
            key = theEvent.keyCode;
            // ignore input for del,tab, back, left, right, home and end key
            if(theEvent.preventDefault && key != 9 && key != 8 ) theEvent.preventDefault();
        }
    }

    $('#'+sib_prefix+'_embed_signup .'+sib_prefix+'-container').find('.hidden-btns').remove();
    $('#'+sib_prefix+'_embed_signup .'+sib_prefix+'-container').find('.message_area').remove();

    $('#'+sib_prefix+'_embed_signup #theform, #sib_embed_signup1 #theform1').on('submit',function() {
        var theForm = $(this);
        if (theForm.hasClass(sib_prefix+'_processing')) {
            return false;
        }

        var wrapper = theForm.closest('.forms-builder-wrapper');

        wrapper.find('#'+sib_prefix+'_loading_gif_area').width(theForm.width()).height(theForm.height());

        var reqField = theForm.find('#req_hid').val();

        var primaryType = wrapper.find('#primary_type').val() == 'undefined' ? 'email' : wrapper.find('#primary_type').val();
        if(primaryType == 'email') {
            reqField = 'email' + reqField;
        }else{
            reqField = 'SMS' + reqField;
        }
        var required = reqField.split("~");
        var sendinblueFormLang = wrapper.find('#'+sib_prefix+'_embed_signup_lang').val();
        var emptyError = "Please complete this field.";
        var emailError = wrapper.find('#'+sib_prefix+'_embed_invalid_email_message').val();
        var smsError = 'The SMS field must contain between 6 and 19 digits.';
        var dateError = "Invalid date format";

        if (sendinblueFormLang == "fr") {
            emptyError = "Merci de remplir ce champ.";
            smsError = 'Le champ SMS doit contenir entre 6 et 19 chiffres.';
            dateError = "Date de format invalide";
        }
        else if (sendinblueFormLang == "es") {
            emptyError = "Por favor, complete este campo";
            smsError = 'El campo SMS debe contener entre 6 y 19 cifras.';
            dateError = "Formato de fecha no válido";
        }
        else if (sendinblueFormLang == "pt") {
            emptyError = "Preencha este campo.";
            smsError = 'O campo SMS deve conter entre 6 e 19 dígitos.';
            dateError = "O formato da data é inválido";
        }
        else if (sendinblueFormLang == "it") {
            emptyError = "Compilare questo campo.";
            smsError = 'Il campo SMS deve contenere dai 6 ai 19 caratteri.';
            dateError = "Il formato della data non è valido";
        }
        else if (sendinblueFormLang == "de") {
            emptyError = "Bitte füllen Sie dieses Feld aus.";
            smsError = 'Das SMS-Feld muss 6 bis 19 Ziffern enthalten.';
            dateError = "Ungültiges Datumsformat";
        }

        theForm.find('div.alert').remove();
        theForm.find('.message_area').remove();

        for (i = 0; i < required.length; i++) {

            var input = theForm.find('input[name="'+required[i]+'"]');

            var inputType = input.attr('type');
            if (inputType=='text') {
                if (input.val() == "" || input.val() == emptyError) {
                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>'+emptyError+'</div>' );
                }
                else {
                    if (required[i] == 'email') {
                        if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input.val())) {
                            input.closest('.row').addClass("needsfilled");
                            input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 15px;"><button type="button" class="close">x</button>'+emailError+'</div>' );
                            input.val('');
                        } else {
                            input.closest('.row').removeClass("needsfilled");
                        }
                    }
                    else if(required[i] == 'SMS'){
                        if($('#sms_prefix').length && $('#sms_prefix').val() == '')
                        {
                            input.closest('.row').addClass("needsfilled");
                            input.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding +'"><button type="button" class="close" style="' + button_style +'">x</button>'+emptyError+'</div>' );
                        }
                        else{
                            input.closest('.row').removeClass("needsfilled");
                        }
                    }
                    else {
                        input.closest('.row').removeClass("needsfilled");
                    }
                }
            }
            else if (inputType=='radio'){
                if (input.is(':checked')==false) {
                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>'+emptyError+'</div>' );
                }
            } else if(required[i] == 'Captcha' && typeof grecaptcha != 'undefined'){
                var captchaResponse = grecaptcha.getResponse();
                if(captchaResponse.length == 0){
                    $(".captcha > div.row").addClass("needsfilled");
                    $(".captcha > div.row").append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>'+emptyError+'</div>' );
                    
                } else {
                    $(".captcha > div.row").removeClass("needsfilled");
                } 
            } else {
                var fields =input.serializeArray();
                if (fields.length == 0) {
                    input.closest('.row').addClass("needsfilled");
                }
                else {
                    input.closest('.row').removeClass("needsfilled");
                }
            }
        }
        $(".row").each(function(){
            var spanElement = $(this).find('span');
            var ele = $(this).find("input");
            var alertWidth = ele.width() + 10;
            var smsPrefix = ($(this).find('#sms_prefix').length > 0 ) ? $(this).find('#sms_prefix').val() : '';
            if (ele.attr('name') == 'SMS') {
                if (!isValidSms(ele, smsPrefix + ele.val()) && ele.val() != "") {
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;width:' + alertWidth + ';"><button type="button" class="close">x</button>'+ smsError +'</div>' );
                    ele.val('');
                }
            }

            if(spanElement.text() == dateFormat){
                if (!isValidDate(ele.val()) && ele.val() != ""){
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;width:' + alertWidth + ';"><button type="button" class="close">x</button>'+ dateError +'</div>' );
                    ele.val('');
                }
            }
        });
        $('div.message_area button.close').on('click', function() {
            $(this).parent().remove();
        });

        if (theForm.find('input').closest('.row').hasClass("needsfilled") || $(".captcha > div.row").hasClass("needsfilled")) {
            return false;
        }else{

            //errornotice.closest('.row').hide();
            // submit ajax process --> coding here
            var requestUrl = theForm.attr('action');
            var postData = theForm.serialize();
            theForm.addClass(sib_prefix+'_processing');
            theForm.parent().find('#'+sib_prefix+'_loading_gif_area').show();
            theForm.css('opacity', '0.5');
            $.ajax({
                url:requestUrl,
                data : postData,
                dataType:'json',
                type:'POST',
                beforeSend:function(){ },
                success:function(data){
                    var theForm = $('.'+sib_prefix+'_processing');

                    theForm.parent().find('#'+sib_prefix+'_loading_gif_area').hide();
                    theForm.css('opacity', '1');
                    if (data.result != undefined) {
                        if ((data.result.result == 'success') || (data.result.result == 'emailExist') || (data.result.result == 'OK') || (data.result.result == 'OK_UPDATE')) {
                            backColor = '#dff0d8';
                            borderColor = '#d6e9c6';
                            color = '#ffffff';
                            setTimeout(function(){
                              $('.message_area').remove();
                              $('#theform #email').attr('placeholder','E-mail');
                              $('#sib_embed_signup').animate({
                                  width: "150px",
                                  opacity: "0"
                              },700);
                              $('#header__link').show();
                          }, 3000);
                        }
                        else {
                            backColor = '#f2dede';
                            borderColor = '#ebccd1';
                            color = '#a94442';
                        }

                        var messageHtml = '<div class="message_area" style="background-color: ' + backColor + ';border:1px solid ' + borderColor + '; color: ' + color + '"><button type="button" class="close">x</button>';
                        if (data.result.result == 'success' || data.result.result == 'OK') {
                            if(window.location.pathname.indexOf('ru') < 0 && window.location.pathname.indexOf('zh') < 0){
                                messageHtml += 'Awesome!<br>Now you are subsribed on MDL News'
                            }
                            if(window.location.pathname.indexOf('ru') > 0){
                                messageHtml += 'Ура!<br>Теперь вы подписаны на MDL новости'
                            }
                            if(window.location.pathname.indexOf('zh') > 0){
                                messageHtml += '这么好！<br>现在您订阅MDL的新闻'
                            }
                            if (data.result.smsExist != ''){
                                var smsMSG = '';
                                var smsNumber = data.result.smsExist;
                                smsMSG = data.result.smsExist_msg.split('[number]');

                                messageHtml += '. '+smsMSG[0]+smsNumber+smsMSG[1];
                            }
                            theForm.find("div.email-group input[type='text']").val('');
                            theForm.find("div.sms-group input[type='text']").val('');
                            if (data.result.url_redirect != '') {
                                location.href = data.result.url_redirect;
                            }
                        }
                        else if(data.result.result == 'sms_emailExist') {
                            var emailMSG = '';
                            var emailAddress = data.result.emailExist;
                            emailMSG = data.result.emailExist_msg.split('[address]');

                            messageHtml += '. '+emailMSG[0]+emailAddress+emailMSG[1];
                        }
                        else if(data.result.result == 'invalid_request' || data.result.result == 'invalidEmail') {
                            messageHtml += data.result.invalid_err_msg;
                        }
                        else if(data.result.result == 'invalidSms') {
                            messageHtml += data.result.invalidSms_msg;
                        }
                        else if(data.result.result == 'emailExist' || data.result.result == 'OK_UPDATE') {
                            messageHtml += data.result.exist_err_msg;
                            if (data.result.smsExist != ''){
                                var smsMSG = '';
                                var smsNumber = data.result.smsExist;
                                smsMSG = data.result.smsExist_msg.split('[number]');

                                messageHtml += '. '+smsMSG[0]+smsNumber+smsMSG[1];
                            }
                        }
                        else if(data.result.result == 'dateFormat' || data.result.result == 'reqMiss' ) {
                            messageHtml += data.result.general_err_msg;
                        } else if(data.result.result == 'invalidCaptcha') {
                            messageHtml += data.result.general_err_msg;
                        } 
                        messageHtml += '</div>';
                        theForm.find('.'+sib_prefix+'-container').prepend(messageHtml);
                        $('div.message_area button.close').on('click', function() {
                            $(this).parent().remove();
                        });
                        theForm.removeClass(sib_prefix+'_processing');
                    }
                }
            });
}
return false;
});

$('#'+sib_prefix+'_embed_signup :input').on('click',function() {
    if ($(this).closest('.row').hasClass("needsfilled") ) {
        $(this).closest('.row').find('div.message_area').remove();
        $(this).val("");
        if($(this).attr('type') == 'radio')
            $(this).val("1");
        $(this).closest('.row').removeClass("needsfilled");
    }
});

$('#'+sib_prefix+'_embed_signup input[type=radio]').on('click',function(){
    if ($(this).closest('.row').hasClass("needsfilled") ) {
        $(this).attr('checked', true);
        $(this).closest('.row').find('div.message_area').remove();
        $(this).closest('.row').removeClass("needsfilled");
    }
});

    // allow to input 0-9 and - only for date field
    $("input").on('keypress', function(event) {
        if($(this).closest(".row").find("." + sib_prefix + "_dateformat").length > 0){
            validateInteger('date', event);
        }
    });

    $("#SMS").on('keypress', function (event){
        var length = $(this).val().length;
        validateInteger(length, event);
    });

    $("input[type=number]").on('keypress', function(event) {
        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );

        // 0-9, +/-, space, brackets
        var regex = /[0-9]/;

        if( !regex.test(key)) {
            theEvent.returnValue = false;
            key = theEvent.keyCode;
            // ignore input for del,tab, back, left, right, home and end key
            if(theEvent.preventDefault && key != 9 && key != 8 ) theEvent.preventDefault();
            var eleRow = $(this).closest('.row');
            var frmLang = eleRow.closest('.forms-builder-wrapper').find('#'+sib_prefix+'_embed_signup_lang').val();
            var numberError = "Please enter a number.";
            if (frmLang == "fr") {
                numberError = "Veuillez entrer un nombre.";
            }
            else if (frmLang == "es") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "pt") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "it") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "de") {
                numberError = "Please enter a number.";
            }
            if( !eleRow.find('.message_area').length)
            {
                eleRow.append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442"><button type="button" class="close">x</button>' + numberError + '</div>' );
            }
        }
    });

    $(document).on('click', '.message_area .close', function() {
        $(this).closest('.message_area').remove();
    });

    $(document).on('click', '.sib-dropdown-toggle.country-flg', function() {
        $(".country-block ul").toggle();
    });

    $(document).on( 'click', '.country-block ul li a' ,function() {
        var code = $(this).data('code');
        var cCode = $(this).data('c_code');
        $('.sib-dropdown-toggle .cflags').attr('class','cflags');
        $('.sib-dropdown-toggle .cflags').addClass(cCode);

        // update country prefix
        $('#sms_prefix').val('+' + code);

        $(".country-block ul").hide();
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("country-block"))
            $(".country-block ul").hide();
    });

    if( $('.sms_field .country-block').length )
    {
        var cflagsClasses = $('.sib-dropdown-toggle .cflags').attr('class').split(' ');
        if(cflagsClasses[1] && cflagsClasses[1] != '')
        {
            var countryCode = $('.sib-dropdown-menu').find('[data-c_code="' + cflagsClasses[1] + '"]').data('code');
            // update country prefix
            $('#sms_prefix').val('+' + countryCode);
        }
        else {
            $('.sib-dropdown-toggle .cflags').addClass('FR');
            var countryCode = $('.sib-dropdown-menu').find('[data-c_code="FR"]').data('code');
            // update country prefix
            $('#sms_prefix').val('+' + countryCode);
        }
    }
    // set last submit to avoid refresh post
    $("#hdn_email_txt").val(new Date().getTime());
}(jQuery));




// ——————————————————————————————————————————————————
// Hover effect on button 'blog' and on logo mdl
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!BMDLO_/.-'
    this.update = this.update.bind(this)
}
setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 10)
      const end = start + Math.floor(Math.random() * 10)
      this.queue.push({ from, to, start, end })
  }
  cancelAnimationFrame(this.frameRequest)
  this.frame = 0
  this.update()
  return promise
}
update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
    } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
      }
      output += `<span class="dud">${char}</span>`
  } else {
    output += from
}
}
this.el.innerHTML = output
if (complete === this.queue.length) {
  this.resolve()
} else {
  this.frameRequest = requestAnimationFrame(this.update)
  this.frame++
}
}
randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
}
}

/*---------------------*/
/*---------------------*/
/*---------------------*/
/*----------MENU AUTO HIDER-----------*/
jQuery(document).ready(function($){
  var mainHeader = $('.cd-auto-hide-header'),
  secondaryNavigation = $('.cd-secondary-nav'),
    //this applies only if secondary nav is below intro section
    belowNavHeroContent = $('.sub-nav-hero'),
    headerHeight = mainHeader.height();

  //set scrolling variables
  var scrolling = false,
  previousTop = 0,
  currentTop = 0,
  scrollDelta = 10,
  scrollOffset = 150;

  $(window).on('scroll', function(){
    if($(window).scrollTop() > 800)
      $('#nav-main').addClass('sticky');
  else
      $('#nav-main').removeClass('sticky');
  if( !scrolling ) {
      scrolling = true;
      (!window.requestAnimationFrame)
      ? setTimeout(autoHideHeader, 250)
      : requestAnimationFrame(autoHideHeader);
  }
});

  $(window).on('resize', function(){
    headerHeight = mainHeader.height();
});

  function autoHideHeader() {
    var currentTop = $(window).scrollTop();

    ( belowNavHeroContent.length > 0 ) 
      ? checkStickyNavigation(currentTop) // secondary navigation below intro
      : checkSimpleNavigation(currentTop);

      previousTop = currentTop;
      scrolling = false;
  }

  function checkSimpleNavigation(currentTop) {
    //there's no secondary nav or secondary nav is below primary nav
    if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
    }
}

function checkStickyNavigation(currentTop) {
    //secondary nav below intro section - sticky secondary nav
    var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
    
    if (previousTop >= currentTop ) {
        //if scrolling up... 
        if( currentTop < secondaryNavOffsetTop ) {
          //secondary nav is not fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('fixed slide-up');
          belowNavHeroContent.removeClass('secondary-nav-fixed');
      } else if( previousTop - currentTop > scrollDelta ) {
          //secondary nav is fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
          belowNavHeroContent.addClass('secondary-nav-fixed');
      }

  } else {
        //if scrolling down...  
        if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
          //hide primary nav
          mainHeader.addClass('is-hidden');
          secondaryNavigation.addClass('fixed slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
      } else if( currentTop > secondaryNavOffsetTop ) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.addClass('fixed').removeClass('slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
      }

  }
}
});


/*---------------------*/
/*---------------------*/
/*---------------------*/
/*----------CUSTOM SELECT-----------*/
function customizeSelect(v){
  v.each(function(){
    var id = $(this).attr('id');
    var $this = $(this), numberOfOptions = $(this).children('option').length;
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select '+id+'"></div>');
    if(id === "country"){
        $this.after('<input placeholder = "Select country" type = "text" id = "country-search" class="check-input select-styled">');
        var $styledSelect = $this.next('input.select-styled');
    } else if(id === "month"){
        $this.after('<input placeholder = "Month" type = "text" id = "month-search" class="check-input select-styled">');
        var $styledSelect = $this.next('input.select-styled');
    } else{
       $this.after('<div class="select-styled"></div>');
       var $styledSelect = $this.next('div.select-styled');
       $styledSelect.text($this.children('option').eq(0).text());
   }

   var $list = $('<ul />', {
    'class': ''+id+' select-options'
}).insertAfter($styledSelect);

   for (var i = 0; i < numberOfOptions; i++) {
    $('<li />',{
        'class': $this.children('option').eq(i).attr('class'),
    }).appendTo($list);
}
if(id === 'langs-list'){
    for (var i = 0; i < numberOfOptions; i++) {
        $('<a />', {
            text: $this.children('option').eq(i).text(),
            href: $this.children('option').eq(i).val()
        }).appendTo(('.'+id+' .select-options li:eq('+i+')'));
    }
} else{
    for (var i = 0; i < numberOfOptions; i++) {
        $('<span />', {
            text: $this.children('option').eq(i).text(),
            'data-val': $this.children('option').eq(i).val()
        }).appendTo(('.'+id+' .select-options li:eq('+i+')'));
    }
}


var $listItems = $list.children('li');

$styledSelect.click(function(e) {
    e.stopPropagation();
    $('.'+id+' div.select-styled.active').not(this).each(function(){
        $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
});

$listItems.click(function(e) {
    e.stopPropagation();

    if(id === "country"){
        $styledSelect.val($(this).text()).removeClass('active');
    } else {
        $styledSelect.text($(this).text()).removeClass('active');
    }
    if(id === "month"){
        $styledSelect.val($(this).text()).removeClass('active');
    }
    $styledSelect.text($(this).text()).removeClass('active');
    $this.val($(this).find('span').attr('data-val'));
    $list.hide();
        //console.log($this.val());
    });

$(document).click(function() {
    $styledSelect.removeClass('active');
    $list.hide();
});

});
}
