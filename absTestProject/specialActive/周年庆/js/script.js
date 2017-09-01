(function($){
    "use strict";
    //弹出底部菜单
    var asMenu = $(".as-menu");
    $("#allAs").click(function (e) {
        e.stopPropagation();
        asMenu.toggleClass("active");
    });
    $(document).on("touchstart mousedown", function (e) {
        var _e = e || window.event;
        _e.stopPropagation();
        if (!$(_e.target).hasClass("as-btn")) {
            if (!$(_e.target).parents(".as-menu").hasClass("active")) {
                if (asMenu.hasClass("active")) {
                    asMenu.removeClass("active");
                }
            }
        }
    });
    //初始化菜单
    var navSwiper = new Swiper("#inNav", {
        freeMode: true,
        slidesPerView: "auto",
        lazyLoading: true,
        watchSlidesVisibility: true
    });

    //菜单操作
    var navBox = $("#inNav");
    var navEle = $("#inNav").find(".swiper-slide");
    var navActiveEle = $("#inNav").find(".swiper-slide.active");

    //初始化菜单
    (function navInit() {
        var w_w = $(window).width();
        var _dom = navActiveEle;
        var i = _dom.index();
        var _left = _dom.offset().left;
        if (_left > w_w) {
            navSwiper.slideTo((i - 1), 100, false);
        }
    })();

    //菜单点击
    var _is_click = false;
    navEle.click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var _curBar = navBox.find(".swiper-slide.active");
        var _width = _curBar.offset().left + _curBar[0].offsetWidth + 60;
        if (_width > $(window).width()) {
            navSwiper.slideNext();
        } else if ((_width - 60) < _curBar[0].offsetWidth * 2) {
            navSwiper.slidePrev();
        }
        var id = "#" + $(this).data("floor");
        var top = $(id).offset().top;
        scrollToEle(top - 80);
    });

    (function loadProduct() {
        var $ele = $(".container-floor");
        var doc_top = $(".lottery-menu").offset().top - 36;
        $(window).scroll(function () {
            var _win_height = $(this).height();
            var top = $(this).scrollTop();
            if (top > doc_top) {
                $("#goTop").fadeIn();
            } else {
                $("#goTop").fadeOut();
            }

            if (!_is_click) {
                var next_height = $(document).height();
                var index = 0;
                $ele.each(function (i) {
                    if ($ele.eq(i + 1).height() == null) {
                        index = $ele.length - 1;
                        next_height = $(document).height();
                    } else {
                        next_height = $ele.eq(i + 1).offset().top;
                        index = i;
                    }
                    if ((top + _win_height * 1 / 2) > $(this).offset().top && (top + _win_height * 1 / 2) < next_height) {
                        navSwiper.slideTo(index - 1);
                        navEle.eq(index).addClass("active").siblings().removeClass("active");
                    }
                });
            }
        });
    })();

    $("#goTop").click(function () {
        scrollToEle(0);
        navSwiper.slideTo(0);
        navEle.eq(0).addClass("active").siblings().removeClass("active");
    });


    function scrollToEle(top) {
        _is_click = true;
        $("html,body").animate({"scrollTop": top + "px"}, 500, function () {
            _is_click = false;
        });
    }
})(jQuery);