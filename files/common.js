( function() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'is_mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'is_ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'is_win';
  } else if (/Android/.test(userAgent)) {
    os = 'is_and';
  } else if (!os && /Linux/.test(platform)) {
    os = 'is_linux';
  }
  document.getElementsByTagName('html')[0].classList.add(os);
})();

( function($) {
    $( function() {
        var $window = $(window);
        var anchor = $('.anchor');
        var anchorInside = anchor.children('.anchor-inside');
        $window.scroll( function() {
            var anchorPos = anchor.position().top;
            var anchorStart = anchorPos + anchorInside.height();
            var anchorEnd = anchor.height() + anchorPos;
            var nowScroll = $window.scrollTop() + $window.height();
            if ( nowScroll < anchorStart ) {
                anchorInside.addClass('is_top');
            } else {
                anchorInside.removeClass('is_top');
            }
            if ( nowScroll < anchorEnd ) {
                anchorInside.removeClass('is_bottom');
            } else {
                anchorInside.addClass('is_bottom');
            }
        }).trigger('scroll');
    });

    var lazyload = new LazyLoad({
        class_applied: "lazy",
        class_loaded: "lazy-loaded",
    });


    $( function() {

        var header = $('.header');
        var headerBackground = header.children('.header-background');
        var headerHeight = 80;
        var headerSelectbox = $('.header-select');
        var $window = $(window);

        var headerClosed = function() {
            $('.header-indicator').stop().animate({opacity:0});
            $(this).children('.header-drop').hide();
            header.stop().animate({ height: headerHeight });
        };

        $('.anchor-arrow').click( function(e) {
            e.preventDefault();
            $('html,body').animate({scrollTop:0});
        });

        header.hover( function() {
            if ( $window.width() > 1160 ) $(this).addClass('is_hovered');
        }, function() {
            $('#language-switch').removeClass('is_active').next().hide();
            if ( $window.scrollTop() != 0 ) {
                return false;
            } 
            $(this).removeClass('is_hovered is_nonclip');
        });

        $window.scroll( function() {
            var nowScroll = $(this).scrollTop();
            if ( nowScroll != 0 ) {
                header.addClass('is_fixed is_hovered');         
            } else {
                header.removeClass('is_fixed is_hovered');         
                $('#language-switch').removeClass('is_active').next().hide();
                headerClosed();
            }
        }).trigger('scroll');

        $('#language-switch').click( function(e) {
            e.preventDefault();
            var $this = $(this);
            if ( $this.hasClass('is_active') ) {
                $this.removeClass('is_active').next().slideUp( function() {
                    header.removeClass('is_nonclip');
                });        
            } else {
                header.addClass('is_hovered is_nonclip');
                $this.addClass('is_active').next().slideDown();        
            }
        });

        $('#language').click( function(e) {
            e.preventDefault();
            var $this = $(this);
            if ( $this.hasClass('is_active') ) {
                $this.removeClass('is_active'); 
                $this.next().slideUp();
            } else {
                $this.addClass('is_active'); 
                $this.next().slideDown();
            }
            
        });

        $('.drop-0').hover( function() {
            var $this = $(this);
            var posX = $this.offset().left;
            var w = $this.width();
            $('.header-indicator').stop().animate({left:posX,width:w,opacity:1});
            var h = $(this).children('.header-drop').fadeIn(600);
            if (h) {
                var headerBackgroundHeight = h.height() || 0;
                var total = headerHeight + headerBackgroundHeight;
                header.addClass('is_hovered').stop().animate({ height: total });
            } 
        }, headerClosed);

        $('.indicator-item button, .fields button').on( 'click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var $body = $('body');
            if ( $this.hasClass('is_active') ) {
                $this.removeClass('is_active');
            } else {
                $this.addClass('is_active').next().addClass('is_active');
                window.setTimeout( function() {
                    $body.one( 'click', function(event) {
                        var c = event.target;
                        if( !$(c).hasClass('indicator-item fields') ) {
                            $this
                                .removeClass('is_active')
                                .next()
                                .removeClass('is_active');
                        }
                    });
                }, 1);
            }
        });

        $('.plate-nav-item-1 .plate-nav-anchor_none').click( function(e) {
            e.preventDefault();
            var $this = $(this);
            if ( $this.hasClass('is_active') ) {
                $this.removeClass('is_active'); 
                $this.next().slideUp(); 
                $this.parent().removeClass('is_active');
            } else {
                $this.addClass('is_active'); 
                $this.next().slideDown(); 
                $this.parent().addClass('is_active');
            }
        });

        var $plate = $('.plate');
        var $plateBackground = $plate.children('.plate-background');
        var $plateClose = $plate.find('.plate-close');

        var plateOpen = function() {
            $plate.show().addClass('is_active');
            $plate.children('.plate-background').fadeIn();
            window.setTimeout( function() {
            $plate.children('.plate-inside').addClass('is_open');
            },100 );
        };

        var plateClose = function() {
            $('.plate-inside').removeClass('is_open');
            $plateBackground.fadeOut( function() {
                $plate.hide();
            });
            $('#plate-language-switch').removeClass('is_active');
            headerSelectbox.hide();
        };

        $('#menu-open').click( plateOpen );
        $plateClose.click( plateClose );
        $plateBackground.click( plateClose );

        $(window).resize( function() {
            if ( $(this).width() > 1160 && $plate.is(':visible') ) plateClose();
        });


        $('a[href="#none"]').click( function(e) {
            e.preventDefault();
            alert('아직 준비중인 메뉴입니다');
        });

    });

})(jQuery);

function setCookie(key, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');
        var dic = item.split('=');
        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return result;
}



