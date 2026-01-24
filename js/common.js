(function($) {
    // 전역 변수 설정
    var $window = $(window);
    var headerHeight = 80;
    var lazyloadInstance;

    $(function() {
        // 1. 레이지로드 초기화
        lazyloadInstance = new LazyLoad({
            elements_selector: ".lazy",
            class_applied: "lazy",
            class_loaded: "lazy-loaded"
        });

        // 2. 헤더 공통 로직
        var header = $('.header');
        var headerClosed = function() {
            $('.header-indicator').stop().animate({opacity:0});
            $(this).children('.header-drop').hide();
            header.stop().animate({ height: headerHeight });
        };

        // 헤더 호버 (데스크탑)
        header.hover(function() {
            if ($window.width() > 1160) $(this).addClass('is_hovered');
        }, function() {
            $('#language-switch').removeClass('is_active').next().hide();
            if ($window.scrollTop() === 0) {
                $(this).removeClass('is_hovered is_nonclip');
            }
        });

        // 스크롤 시 헤더 상태 변경 및 앵커 처리
        $window.scroll(function() {
            var nowScroll = $window.scrollTop();
            
            // 헤더 고정 처리
            if (nowScroll !== 0) {
                header.addClass('is_fixed is_hovered');         
            } else {
                header.removeClass('is_fixed is_hovered');         
                headerClosed.call(header); 
            }

            // 앵커 애니메이션 (요소가 존재할 때만 실행)
            var anchor = $('.anchor');
            if (anchor.length > 0) {
                var anchorInside = anchor.children('.anchor-inside');
                var anchorPos = anchor.offset().top;
                var anchorStart = anchorPos + anchorInside.height();
                var anchorEnd = anchor.height() + anchorPos;
                var scrollBottom = nowScroll + $window.height();

                if (scrollBottom < anchorStart) anchorInside.addClass('is_top');
                else anchorInside.removeClass('is_top');

                if (scrollBottom < anchorEnd) anchorInside.removeClass('is_bottom');
                else anchorInside.addClass('is_bottom');
            }
        }).trigger('scroll');

        // 3. 이벤트 위임 (중요: 동적 로딩된 HTML에서도 작동)
        
        // 앵커 화살표 (Top 이동)
        $(document).on('click', '.anchor-arrow', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 500);
        });

        // 메뉴 드롭다운 (drop-0 호버)
        $(document).on('mouseenter', '.drop-0', function() {
            var $this = $(this);
            var posX = $this.offset().left;
            var w = $this.width();
            $('.header-indicator').stop().animate({left: posX, width: w, opacity: 1});
            
            var drop = $this.children('.header-drop');
            drop.fadeIn(300);
            var totalHeight = headerHeight + (drop.height() || 0);
            header.addClass('is_hovered').stop().animate({ height: totalHeight }, 200);
        }).on('mouseleave', '.drop-0', function() {
            $(this).children('.header-drop').hide();
            header.stop().animate({ height: headerHeight });
            $('.header-indicator').stop().animate({opacity: 0});
        });

        // 언어 스위치
        $(document).on('click', '#language-switch, #language', function(e) {
            e.preventDefault();
            $(this).toggleClass('is_active').next().slideToggle();
        });

        // 서브 메뉴 버튼 (indicator-item)
        $(document).on('click', '.indicator-item button, .fields button', function(e) {
            e.preventDefault();
            $(this).toggleClass('is_active').next().toggleClass('is_active');
        });

        // 준비중 알림
        $(document).on('click', 'a[href="#none"]', function(e) {
            e.preventDefault();
            alert('준비중입니다');
        });

        // 4. 모바일 메뉴(Plate) 제어
        var $plate = $('.plate');
        $(document).on('click', '#menu-open', function() {
            $plate.show().addClass('is_active');
            $plate.children('.plate-background').fadeIn();
            setTimeout(function() { $plate.find('.plate-inside').addClass('is_open'); }, 100);
        });

        $(document).on('click', '.plate-close, .plate-background', function() {
            $('.plate-inside').removeClass('is_open');
            $('.plate-background').fadeOut(function() { $plate.hide(); });
        });
    });

    // 외부에서 호출 가능한 재초기화 함수 (loadTab 함수 끝에서 실행)
    window.reinitPlugins = function() {
        if (lazyloadInstance) lazyloadInstance.update();
        if ($.fn.slick) {
            // 새로 로드된 컨텐츠 중 슬라이더가 있다면 초기화
            $('.gallery-list').not('.slick-initialized').slick(); 
        }
        $window.trigger('scroll'); // 스크롤 위치 재계산
    };

})(jQuery);