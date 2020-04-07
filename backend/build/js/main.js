function main() {
    (function () {
        'use strict';

        $('a.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 900);
                return false;
                }
            }
        });

        // Show Menu on Book
        $(window).bind('scroll', checkNavbar);

        $('body').scrollspy({
            target: '.navbar-default',
            offset: 80
        });

        // Hide nav on click
        $(".navbar-nav li a").click(function (event) {
            // check if window is small enough so dropdown is created
            var toggle = $(".navbar-toggle").is(":visible");
            if (toggle) {
            $(".navbar-collapse").collapse('hide');
            }
        });

        $(window).resize(checkNavbar);
        
        // Portfolio isotope filter
        $(window).load(function() {
            var $container = $('.portfolio-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            $('.cat a').click(function() {
                $('.cat .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });

        });
        
        // Nivo Lightbox 
        $('.portfolio-item a').nivoLightbox({
            effect: 'slideDown',
            keyboardNav: true,
        });

        function checkNavbar() {
            if ($(window).width() > 750) {
                var navHeight = $(window).height() - ($(window).height() * .82);
                if ($(window).scrollTop() > navHeight) {
                    $('.navbar-default').addClass('on');
                    $('.back-top').addClass('on');
                } else {
                    $('.navbar-default').removeClass('on');
                    $('.back-top').removeClass('on');
                }
            } else {
                if (!$('.navbar-default').hasClass('on')) {
                    $('.navbar-default').addClass('on');
                    $('.back-top').addClass('on');
                }
            }
        }
        checkNavbar();

        $('.navbar-toggle').click(function () {
            var collapse = $(".navbar-collapse");
            var _opened = collapse.hasClass("navbar-collapse") && collapse.hasClass("in");

            if (!_opened) {
                setTimeout(function () {
                    $(document).click(checkOuterClickOnNavbarOpen);
                }, 1);
            }
        });

        function checkOuterClickOnNavbarOpen(event) {
            var clickover = $(event.target);
            var collapse = $(".navbar-collapse");
            var _opened = collapse.hasClass("navbar-collapse") && collapse.hasClass("in");
            if (_opened === true && (!clickover.hasClass("navbar-toggle") && !clickover.hasClass("navbar-nav"))) {
                $("button.navbar-toggle").click();
                $(document).unbind('click', checkOuterClickOnNavbarOpen);
            }
        }

    }());
}

main();
