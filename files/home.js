( function($) {
    $( function() {

        $('.front-arrow').click( function(e) {
            e.preventDefault();
            var pos = $('.anchor').offset().top;
            $('html,body').animate({scrollTop:pos});
        });

        var frontSlide = $('.front-slide');
        var popup = $('.popup');
        var closePopup = function( $readPopup ) {
            if( $readPopup.prop('checked') ) {
                setCookie('popup', 'closed', 1);
            }
            popup.animate({'opacity':0}, 400, function() {
                window.setTimeout( function() {
                    popup.hide();
                    notificationList.slick('unslick');
                }, 1000);
            });
        };

        var notificationList;

        frontSlide.on('init', function(slick){
            $('.front-title, .front-contents').addClass('is_init');                
            $('.notification-list').on('init', function(slick) {
                popup.addClass('is_init');
            });
            if( getCookie('popup') != 'closed' ) {
                notificationList = $('.notification-list').slick({
                    'arrows': false,
                    'slidesToShow': 3,
                    'dots': true,
                    'appendDots': $('.notification-pager'),
                    'dotsClass': 'notification-dots',
                    responsive: [
                        {
                          breakpoint: 640,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                          }
                        }
                    ]
                });
            } else {
                popup.hide();
            }
        });


        $('.notification-close').click( function(e) {
            e.preventDefault();
            var $readPopup = $(this).prev().find('.read_popup');
            if ( data.language != 0 ) {
                $readPopup.prop('checked', 'checked');
            }
            closePopup( $readPopup );
        });

        $(window).on('resize orientationchange', _.debounce(function() {
            if ( popup.hasClass('is_init') ) {
                notificationList.slick('setPosition');
            }
        }, 400));

        frontSlide.slick({
            'arrows': false,
            'dots': true,
            'slidesToShow': 3,
            'dotsClass': 'front-dots',
            'responsive': [
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                  }
                }
            ]
        });


        var gallerySlide = $('.gallery-list');

        gallerySlide.on('init', function(slick){
            $('.gallery').addClass('is_init');                
        });

        gallerySlide.slick({
            dots: true,
            prevArrow: $('.arrows-item_prev'),
            nextArrow: $('.arrows-item_next'),
            appendDots: $('.gallery-bottom'),
            infinite: false,
            dotsClass: 'gallery-dots',
            slidesToShow: 3,
            responsive: [
                {
                  breakpoint: 960,
                  settings: {
                    slidesToShow: 2,
                    infinite: true,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    infinite: true,
                  }
                }
            ]
        });
    });
})(jQuery);


