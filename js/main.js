$(function () {


    var $this = $(".section");
    var $this_s = $(".slide");
    $this.eq(0).addClass("on");
    $('#fullpage').fullpage({

        anchors: ['intro', 'pf01', 'pf02', 'profile', 'introduce'],
        menu: '#menu',
        scrollingSpeed: 1000,
        // scrollBar: true,
        onLeave: function (origin, destination, direction) {

            // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
            $('#fullpage').on('scroll touchmove mousewheel', function (event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
            swiper.mousewheel.disable();
        },

        onLeave: function (idx, nidx, dir) {
            $('nav li').eq(nidx - 1).addClass('on').siblings().removeClass('on');
            console.log(idx, nidx, dir);

            if (dir == 'up') {
                $('.header').addClass('on')
            } else {
                $('.header').removeClass('on')
            }

        },
        afterLoad: function (anchorLink, index) {
            // 전환이 끝난후 이벤트풀기                               
            $('#fullpage').off('scroll mousewheel');
            if (!$(".fp-completely .swiper-wrapper").length > 0) $('#fullpage').off('touchmove'); // 모바일분기
            if (swiper) swiper.mousewheel.enable();
            if (!$(".sec2").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
        }
    });


    var length = $(".section4 .swiper-slide").length;
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        mousewheel: true,
        on: {
            slideChange: function () {
                var idx = this.activeIndex;
                // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
                if (this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
                if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false) //슬라이드가 2개밖에 없을때
                // console.log('즉시 : ' + idx);
            },
            slideChangeTransitionEnd: function () {
                var idx = this.activeIndex;
                // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
                if (idx == 0 || idx >= length - 1) $.fn.fullpage.setAllowScrolling(true);
                // console.log('전환후 : ' + idx);     
            },
            touchMove: function (e) {
                var startY = e.touches.startY;
                setTimeout(function () {
                    if (startY > e.touches.currentY) swiper.slideNext();
                    else swiper.slidePrev();
                }, 100);
            },
        },
    });

})
