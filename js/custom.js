
function postTextHover(){
	$('.mdl-text__post-t-wrapper').hover(
		function() {
			$(this).children('.mdl-text__post-read-more').html('Click to read full article').css('width','240px');
		}, function(){
			$(this).children('.mdl-text__post-read-more').html('').css('width','171px');
		}
	);
}
function customizeSelect(){
	$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />',{
            'class': $this.children('option').eq(i).attr('class'),
        }).appendTo($list);
    }
    for (var i = 0; i < numberOfOptions; i++) {
        $('<a />', {
            text: $this.children('option').eq(i).text(),
            href: $this.children('option').eq(i).val()
        }).appendTo(('.select-options li:eq('+i+')'));
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
}

function showSelectedLang(){
    var path = window.location.pathname;
    if (path === "/" || path === "/en/"){
        $('.select-styled:eq(0)').html($('.select-options li:eq(0) a').html());
        return;
    }
    for(var i =0; i < $('.select-options li').length; i++){
        // console.log("/"+$('.select-options li:eq('+i+')').attr('class')+"/",path, path.indexOf("/"+$('.select-options li:eq('+i+')').attr('class')+"/") );
        if(path.indexOf("/"+$('.select-options li:eq('+i+')').attr('class')+"/") !== -1 ){
            $('.select-styled:eq(0)').html($('.select-options li:eq('+i+') a').html());
        }
    }
}

function addClassesToBottomPostSingle(){
    var length = $('.mdl-picture__posts.top-post .mdl-picture__post').length;
    for(var i = 0; i < length; i++){
        if(i == 0)
            $('.mdl-picture__posts.top-post .mdl-picture__post:eq('+i+')').addClass('tp_one');
        if(i == 1)
            $('.mdl-picture__posts.top-post .mdl-picture__post:eq('+i+')').addClass('tp_two');
        if(i == 2)
            $('.mdl-picture__posts.top-post .mdl-picture__post:eq('+i+')').addClass('tp_three');

    }
}

$(document).ready(function(){
	postTextHover();
	customizeSelect();
    addClassesToBottomPostSingle();
    showSelectedLang();
});