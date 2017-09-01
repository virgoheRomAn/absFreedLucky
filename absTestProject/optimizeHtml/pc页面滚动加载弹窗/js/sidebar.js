/**
 * 新版PC首页右侧菜单
 * xjq
 * 2016-11-10
 */
;
(function ($) {
    window.SideBar = function () {
        var that = this;
        that._init = function (options) {
            var defaults = {
                menuBar: ".index-right-menu",
                menuLink: ".index-menu-link",
                menuCont: ".index-content",
                menuContModule: ".index-module",
                closeLink: ".close-index-cont",

                clickFun: null
            };
            var opt = that.opt = $.extend({}, defaults, options);
            opt.open = false;
            opt.$menuBar = $(opt.menuBar);
            opt.$menuContModule = $(opt.menuContModule);
            opt.$menuLink = $(opt.menuLink);
            opt.$menuCont = $(opt.menuCont);
            opt.current = null;
            opt.w = 0;
            opt.r = 0;

            var tagEle = "", curEle = "";
            opt.$menuBar.find(".link-item").click(function (event) {
                var e = event || window.event;
                e.stopPropagation();
                var id = $(this).find("a").data("id");
                if (!id) return false;
                opt.$menuContModule.each(function () {
                    if ($(this).data("type") === id) {
                        opt.w = $(this).width();
                        opt.r = opt.w;
                        tagEle = this;
                    }
                });
                if ($(this).hasClass("active")) {
                    animateFun(opt.w, opt.r);
                    opt.open = false;
                    $(this).removeClass("active");
                    return false;
                } else {
                    $(this).addClass("active").siblings().removeClass("active");
                    opt.current = this;
                    curEle = this;
                    opt.$menuContModule.css({"z-index": "1000", "top": "0px"}).addClass("scaleDown");
                    $(tagEle).removeClass("scaleDown");
                    if (!opt.open) {
                        animateFun(opt.w, 0, true);
                        $(tagEle).css({"z-index": "1001", "top": "0px"});
                        opt.open = true;
                    } else {
                        $(tagEle).css({"z-index": "1001", "top": "100%"}).animate({"top": "0"});
                        animateFun(opt.w, 0, true);
                    }
                    if (opt.clickFun) opt.clickFun.call(curEle, tagEle, opt);
                }
            });

            $(opt.closeLink).click(function () {
                var opt = that.opt;
                opt.open = false;
                animateFun(opt.w, opt.r);
            });
        };

        $(document.body).click(function (event) {
            var e = event || window.event;
            e.stopPropagation();
            if (!$(e.target).parents(".index-right-menu").length) {
                $(that.opt.closeLink).trigger("click");
            }
        });

        var animateFun = function (w, r, type) {
            var opt = that.opt;
            opt.$menuBar.animate({"width": w + "px", "right": -r + "px"}, 500, function () {
                if (!type) {
                    $(opt.current).removeClass("active");
                }
            });
        };
    };
})(jQuery);