window.window_scroll = function (options) {
    var $window = $(window);
    var _win_height = $window.height();
    var _doc_height = $(document).height();
    var defaults = {
        floor_id: ".container-floor",
        floor_menu: ".floor-menu",
        data_id: ".floor-cont",
        data_load: ".floor-loading",
        footer: ".footer",
        menu_fixed: false,
        initBeforeFun: null,
        initAfterFun: null,
        resizeFun: null,
        scrollFun: null
    };
    var opt = $.extend({}, defaults, options);
    var that = this;
    var floor_top = [], floor_id = [];
    var _is_click = false;
    that.initFun = function () {
        $(opt.floor_id).each(function () {
            var ele_id = $(this).attr("data-floor") ? $(this).attr("data-floor") : "0F";
            var c = ele_id.indexOf("F");
            floor_top.push($(this).offset().top);
            floor_id.push(parseInt(ele_id.substr(0, c)));
        });

        if (opt.initBeforeFun) opt.initBeforeFun.call(that, opt.data_id, _win_height);

        var $menu = $(opt.floor_menu);
        menuInitFun($menu);
        $menu.find("a").on("mouseover mouseout click", menuHover);
        $("#goTop").on("click", goTop);


        $window.resize(function () {
            _win_height = $window.height();
            if (opt.resizeFun) opt.resizeFun.call(this, _win_height);
            var _scroll_top = $(this).scrollTop();
            (_scroll_top > floor_top[2] / 4 * 3) ? $(opt.floor_menu).fadeIn() : $(opt.floor_menu).fadeOut();
            $(opt.floor_id).each(function (i) {
                if ((floor_top[i] - _scroll_top + $(this).height() / 3 * 2) > 0) {
                    if ((floor_top[i] - _scroll_top + $(this).height() / 3) < _win_height) {
                        if (opt.initAfterFun) opt.initAfterFun.call(this, floor_id[i], _win_height);
                    }
                }
            });
        }).trigger("resize");


        $window.scroll(function () {
            var _footer_h = $(opt.footer).height();
            var _scroll_top = $(this).scrollTop();
            (_scroll_top > floor_top[2] / 4 * 3) ? $(opt.floor_menu).fadeIn() : $(opt.floor_menu).fadeOut();
            var bottom = (_scroll_top >= (_doc_height - _win_height - _footer_h)) ? (_scroll_top - (_doc_height - _win_height - _footer_h) + 20) : 20;
            if (opt.menu_fixed) $(opt.floor_menu).css("bottom", bottom + "px");

            if (!_is_click) {
                $(opt.floor_id).each(function (i) {
                    if (floor_top[i + 1] === undefined)  floor_top[i + 1] = $(document).height();
                    if ((_scroll_top + _win_height / 5 * 4) > floor_top[i] && (_scroll_top + _win_height / 5) < floor_top[i + 1]) {
                        if (opt.scrollFun) opt.scrollFun.call(this, floor_id[i], floor_top[i], _scroll_top);
                    }
                });
            }
        });
    };

    that.initFun();

    function menuInitFun(ele) {
        ele.find("a").each(function () {
            $(this).text("");
            $(this).append("<i class='animated'>" + $(this).attr("href").substring(1) + "</i>");
            $(this).append("<span class='animated'>" + $(this).data("text") + "</span>");
        });
    }

    function menuHover(event) {
        var e = event || window.event;
        e.stopPropagation();
        var that = this;
        switch (e.type) {
            case "mouseover":
                $(that).addClass("active");
                break;
            case "mouseout":
                $(that).removeClass("active");
                break;
            case "click":
                _is_click = true;
                $(that).addClass("active_link").siblings().removeClass("active_link");
                var floor_id = $(that).attr("href").substring(1);
                $(opt.floor_id).each(function () {
                    if ($(this).data("floor") == floor_id) {
                        $("html,body").animate({scrollTop: floor_top[parseInt(floor_id) + 1] + "px"}, 500, function () {
                            _is_click = false;
                            $window.trigger("resize");
                        });
                    }
                });
                break;
        }
    }

    function goTop() {
        _is_click = true;
        $("html,body").animate({scrollTop: "0px"}, 500, function () {
            _is_click = false;
            $window.trigger("resize");
        });
    }
};