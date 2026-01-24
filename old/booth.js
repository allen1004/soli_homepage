wow = new WOW(
    {
        boxClass:     'is_show',      // default
        animateClass: 'is_complete', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }
);
wow.init();


( function($) {
    $( function() {

        $('.booth-monitors.type_b').slick({
            'arrows': false,
            'dots': true,
            'centerMode': true,
            'slidesToShow': 3,
            'focusOnSelect': true,
            'variableWidth': true,
            'dotsClass': 'list-dots type_c',
            'responsive': [
                {
                  breakpoint: 640,
                  settings: {
                    'slidesToShow': 1,
                  }
                }
            ]
        });

        $('.booth-monitors.type_a').slick({
            'arrows': false,
            'dots': true,
            'centerMode': true,
            'slidesToShow': 3,
            'focusOnSelect': true,
            'variableWidth': true,
            'dotsClass': 'list-dots type_c',
            'asNavFor': '.booth-note',
            'responsive': [
                {
                  breakpoint: 640,
                  settings: {
                    'slidesToShow': 1,
                  }
                }
            ]
        });

        $('.booth-note').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.booth-monitors.type_a'
        });


    });
})(jQuery);
