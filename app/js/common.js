var defaultLink = '/';
var defaultCategory = '';
var visibleAnimation = false;
// a minimal jQuery library for reacting to innerHTML changes
(function ($) {
    $.fn.change = function (cb, e) {
        e = e || {subtree: true, childList: true, characterData: true};
        $(this).each(function () {
            function callback(changes) {
                cb.call(node, changes, this);
            }

            var node = this;
            (new MutationObserver(callback)).observe(node, e);
        });
    };
})(jQuery);


$(document).ready(function () {
    var app = new appAjax();
    var cb = new CallBack();
    if (History.enabled) {

        app.init();

    }
    setTimeout(function () {
        cb.init();
    }, 50);
});

// AJAX LOADING OF POST CONTENT
function appAjax() {
    this.triggers = {
        self: this,

        articleLink: {
            element: '.article__link-inner'
        },
        relatedLink: {
            element: '.common-posts__link'
        }
    };

    this.events = function () {
        var self = this;

        $('body').on('click', this.triggers.articleLink.element, function (e) {
            e.preventDefault();
            var pageHref = $(this).attr('href');
            visibleAnimation = true;
            History.pushState(null, null, pageHref);
            return false;
        });

        $('body').on('click', this.triggers.relatedLink.element, function (e) {
            e.preventDefault();
            var pageHref = $(this).attr('href');
            defaultCategory = $(this).closest('.common-posts__item').attr('data-cat');
            visibleAnimation = false;
            History.pushState(null, null, pageHref);
            $(window).scrollTop(0);
            return false;
        });

    };

    this.initOnLoad = function () {
        var self = this;

        History.Adapter.bind(window, 'statechange', function (e) {
            var animation = self.animations.postChangeAnimation;
            var pageHref = History.getState();
            if (pageHref) {
                self.setURL(pageHref.cleanUrl);
            }
            self.getPage(pageHref.cleanUrl + "index.html", $('.main'), '.main__inner, .main__inner_single', animation);

        });

        // $(document).ready(function () {
        //     console.log('page loaded');
        //     var pageHref = History.getState();
        //     if (pageHref.hash.indexOf('.html') < 0) {
        //         self.getPage(pageHref.cleanUrl + 'index.html', $('.main'), '.main__inner,.main__inner_single');
        //     } else {
        //         self.getPage(pageHref.cleanUrl, $('.main'), '.main__inner_single')
        //     }
        // });
    };

    this.animations = {
        postChangeAnimation: function () {
            var main = $('.main');
            var main__inner = $('.main__inner_index');
            main.addClass('post-changed');
            setTimeout(function () {
                main__inner.addClass('.main__inner_hidden');
                main.removeClass('post-changed');
                $(window).scrollTop(0);
            }, 1200);
        }
    };

    this.getPage = function (pageHref, container, data, animation) {
        var self = this;
        $.ajax({
            url: pageHref,
            type: 'GET',
            dataType: 'text',
            success: function (response) {
                if (visibleAnimation) {
                    if (window.screen.width > 768 || window.innerWidth > 768 || window.screen.availWidth > 768) {
                        animation();
                    }
                    setTimeout(function () {
                        var tmpData = $('<div />').html(response);
                        var fetchData = tmpData.find(data);
                        container.html(fetchData);
                    }, 1180);
                } else {
                    var tmpData = $('<div />').html(response);
                    var fetchData = tmpData.find(data);
                    container.html(fetchData);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    };

    this.setURL = function (href) {
        History.pushState(null, null, href);
    };

    this.init = function (callback) {
        this.initOnLoad();
        this.events();
    };

}

function CallBack() {
    this.init = function () {
        var self = this;
        this.initEvents();
        this.initRender();
        $('body').change(function (changes, observer) {
            self.initRender();
        });
    };

    this.initEvents = function () {

        $('body').on('click', '.hamburger', function () {
            $('.menu-mob').css('bottom', 0);
            $('.main').css({
                'transform': 'scale(.85)',
                'opacity': '.5'
            });
        });

        $('body').on('click', '.menu-mob__inner', function () {
            closeMobMenu();
        });

        function closeMobMenu() {
            $('.menu-mob').removeClass('open').css('bottom', '-100%');
            $('.main').removeClass('hidden').css({
                'transform': 'none',
                'opacity': 1
            });
        }

        $('body').on('click', '.menu-mob__item', function () {
            var thisAttr = $(this).attr('data-cat');
            defaultCategory = thisAttr;
            var articles = $('.article');
            $('.menu-mob__item').removeClass('menu-mob__item_active');
            $(this).addClass('menu-mob__item_active');
            if (thisAttr === "") {
                $('.menu-mob__item').removeClass('menu-mob__item_active');
                $(this).addClass('menu-mob__item_active');
            }

            if (defaultCategory === "") {
                articles.removeClass('article_first');
                articles.eq(0).addClass('article_first');
                articles.show();
                closeMobMenu();
                return;
            }

            var visiblePhoto = true;
            for (var i = 0; i < articles.length; i++) {
                if (defaultCategory === articles.eq(i).attr('data-cat')) {
                    articles.eq(i).show();
                    if (visiblePhoto) {
                        articles.removeClass('article_first');
                        articles.eq(i).addClass('article_first');
                        visiblePhoto = false;
                    }
                } else {
                    articles.eq(i).hide();
                }
            }
            closeMobMenu();
        });

        $('body').on('click', '.single-header__item', function () {
            defaultCategory = $(this).attr('data-cat');
            visibleAnimation = false;
            History.pushState(null, null, defaultLink);
            $('.single-header__item').removeClass('single-header__item_selected');
            $(this).addClass('single-header__item_selected');
        });

        $('body').on('click', '.content-header__item', function () {
            var thisAttr = $(this).attr('data-cat');
            defaultCategory = thisAttr;
            var articles = $('.article');
            $('.content-header__item').removeClass('content-header__item_active');
            $(this).addClass('content-header__item_active');
            if (thisAttr === "") {
                $('.content-header__item').removeClass('content-header__item_active');
                $(this).addClass('content-header__item_active');
            }

            if (defaultCategory === "") {
                articles.removeClass('article_first');
                articles.eq(0).addClass('article_first');
                articles.show();
                return;
            }

            var visiblePhoto = true;
            for (var i = 0; i < articles.length; i++) {
                if (defaultCategory === articles.eq(i).attr('data-cat')) {
                    articles.eq(i).show();
                    if (visiblePhoto) {
                        articles.removeClass('article_first');
                        articles.eq(i).addClass('article_first');
                        visiblePhoto = false;
                    }
                } else {
                    articles.eq(i).hide();
                }
            }
        });


        $('body').on('click', '.single-header__logo', function () {
            visibleAnimation = false;
            History.pushState(null, null, defaultLink);
        });

        $('body').on('click', '.single-header__subscribe', function () {
            var footerOffset = $('.footer').offset().top;
            $('html,body').animate({
                scrollTop: footerOffset
            }, 1000);
        });

        $('body').on('focusin', '.comments__input-inner', function () {
            var modal = $('.single-modal');
            var inputText = $('.comments__input-text');
            if ($(this).hasClass('comments__input-inner_disabled')) {
                $(this).attr('readonly', true);
                modal.addClass('single-modal_opened');
            } else {
                $(this).attr('readonly', false);
                inputText.fadeOut('500');
            }
            return false;
        });

        $('body').on('focusout', '.comments__input-inner', function () {
            var inputText = $('.comments__input-text');
            if ($(this).val().length === 0) {
                inputText.fadeIn('500');
            }
            return false;
        });

        $('body').on('click', '.single-modal-window__item', function (e) {
            e.preventDefault();
            var modal = $('.single-modal');
            $('.comments__input-inner').removeClass('comments__input-inner_disabled');
            modal.removeClass('single-modal_opened');
        });

        $('body').on('click', '.single-modal-window__close', function () {
            var modal = $('.single-modal');
            modal.removeClass('single-modal_opened');
        });

        $('body').on('click', '.single-modal__inner', function () {
            var modal = $('.single-modal');
            modal.removeClass('single-modal_opened');
        });

        $('body').on('click', '.content-header__item', function () {
            $('.content-header__item').removeClass('content-header__item_active');
            $(this).addClass('content-header__item_active');
            return false;
        });

        $('body').on('click', '.select-styled', function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $('body').on('click', '.select-options a', function (e) {

            e.preventDefault();
            defaultLink = $(this).attr('href');
            $('.select-styled').text($(this).text()).removeClass('active');
            $('.country__select').val($(this).attr('href'));
            $('.select-options').hide();
            $.ajax({
                url: defaultLink + "index.html",
                type: 'GET',
                dataType: 'text',
                success: function (response) {
                    var tmpData = $('<div />').html(response);
                    var fetchData = tmpData.find('.menu-mob__item');
                    $('.menu-mob__list').html(fetchData);
                },
                error: function (e) {
                    console.log(e);
                }
            });
            visibleAnimation = false;
            History.pushState(null, null, defaultLink);
            $('.content-header__item').each(function () {
                if ($(this).attr('data-cat') === "") {
                    defaultCategory = "";
                    $('.content-header__item').removeClass('content-header__item_active');
                    $(this).addClass('content-header__item_active');
                    return;
                }
            });
        });

        $(document).on('click', function () {
            $('.select-styled').removeClass('active');
            $('.select-options').hide();
        });

    };

    this.initRender = function () {

        $('.country__select').each(function () {
            if ($("div").is(".select-styled")) {
                return;
            }
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());


            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                var pageHref = window.location.href;
                var linkText = $this.children('option').eq(i).text();
                var linkHref = $this.children('option').eq(i).val();
                var linkTemplate = '<li><a href="' + linkHref + '">' + linkText + '</a></li>';
                $(linkTemplate).appendTo($list);
                if (pageHref === $this.children('option').eq(i).val()) {
                    $styledSelect.text($this.children('option').eq(i).text());
                }
            }

            if (window.screen.width < 768 || window.innerWidth < 768 || window.screen.availWidth < 768) {

                function changeNameOfCountryMob() {
                    var selectStyled = $('.select-styled');
                    var defaultString = selectStyled.text();
                    if (defaultString.length <= 3) {
                        return;
                    } else {
                        var modifiedString = defaultString.substring(0, 3);
                        selectStyled.text(modifiedString);
                    }
                }

                changeNameOfCountryMob();

                function changeNameOfCountryListMob() {
                    var modifiedString = '',
                        defaultString = '';
                    $('.select-options li a').each(function () {
                        defaultString = $(this).text();
                        if (defaultString.length > 3) {
                            modifiedString = defaultString.substring(0, 3);
                            $(this).text(modifiedString);
                        }
                    });
                }

                changeNameOfCountryListMob();

                function replaceArticleHeaderWithImage() {
                    $('.article').each(function () {
                        var header = $(this).find('.article__header'),
                            image = $(this).find('.article__image'),
                            link = $(this).find('.article__link-inner');
                        header.remove();
                        image.remove();
                        link.prepend(header);
                        link.prepend(image);
                    });
                }

                replaceArticleHeaderWithImage();

            }
        });

        $('.content-header__item').each(function () {
            var thisAttr = $(this).attr('data-cat');
            var articles = $('.article');

            if (thisAttr === defaultCategory) {
                $('.content-header__item').removeClass('content-header__item_active');
                $(this).addClass('content-header__item_active');
            }

            if (defaultCategory === "") {
                articles.removeClass('article_first');
                articles.eq(0).addClass('article_first');
                articles.show();
                return;
            }

            var visiblePhoto = true;
            for (var i = 0; i < articles.length; i++) {
                if (defaultCategory === articles.eq(i).attr('data-cat')) {
                    articles.eq(i).show();
                    if (visiblePhoto) {
                        articles.removeClass('article_first');
                        articles.eq(i).addClass('article_first');
                        visiblePhoto = false;
                    }
                } else {
                    articles.eq(i).hide();
                }
            }
        });

        $('.menu-mob__item').each(function () {
            var thisAttr = $(this).attr('data-cat');
            var articles = $('.article');

            if (thisAttr === defaultCategory) {
                $('.menu-mob__item').removeClass('menu-mob__item_active');
                $(this).addClass('menu-mob__item_active');
            }

            if (defaultCategory === "") {
                articles.removeClass('article_first');
                articles.eq(0).addClass('article_first');
                articles.show();
                return;
            }

            var visiblePhoto = true;
            for (var i = 0; i < articles.length; i++) {
                if (defaultCategory === articles.eq(i).attr('data-cat')) {
                    articles.eq(i).show();
                    if (visiblePhoto) {
                        articles.removeClass('article_first');
                        articles.eq(i).addClass('article_first');
                        visiblePhoto = false;
                    }
                } else {
                    articles.eq(i).hide();
                }
            }
        });

        $('.single-header__item').each(function () {
            if ($(this).attr('data-cat') === defaultCategory) {
                $(this).addClass('single-header__item_selected');
            }
        });

    };
}