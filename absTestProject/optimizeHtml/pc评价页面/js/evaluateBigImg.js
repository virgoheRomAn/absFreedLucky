(function ($) {
    /**
     * 评价模块
     */
    /*点在数量*/
    $(document).on("mouseover", ".x-evaluate-item", function () {
        $(this).find(".x-praise-num").show();
    });
    $(document).on("mouseout", ".x-evaluate-item", function () {
        $(this).find(".x-praise-num").hide();
    });
    $(document).on("click", ".x-praise-num", function () {
        if ($(this).hasClass("active")) return false;
        var num = parseInt($(this).attr("data-num"));
        $(this).addClass("active").text("" + (num + 1) + "人觉得有用").attr("data-num", (num + 1));
    });
    /*放大图片*/
    var deg = 0;
    var ieVersion = detectionBrower();
    if (ieVersion != 7) {
        $(".x-u-left").parent().show();
        $(".x-u-right").parent().show();
    } else {
        $(".x-u-left").parent().hide();
        $(".x-u-right").parent().hide();
    }
    $(document).on("click", ".x-img-item", function () {
        var par = $(this).parents(".x-evaluate-img");
        var cont = par.find(".x-show-img img");
        var handle = par.find(".x-handle");
        var img = $(this).find("img");
        var src = img.attr("src");
        var w = img.width();
        var h = img.height();
        var index = $(this).index();
        $(".x-evaluate-view").hide();
        deg = 0;
        getVendorPrefix(cont[0], {"transform": "rotate(0deg)"});
        if (index == 0) {
            handle.find(".x-handle-left").hide();
        } else if (index == par.find(".x-img-item").length - 1) {
            handle.find(".x-handle-right").hide();
        } else {
            handle.find(".x-handle-left").show();
            handle.find(".x-handle-right").show();
        }
        $(this).find("a").addClass("active").parents("li").siblings().find("a").removeClass("active");
        cont.css({
            "width": countImgSize(w, h).w,
            "height": countImgSize(w, h).h,
            "margin": "-" + (countImgSize(w, h).h / 2) + "px 0 0 -" + (countImgSize(w, h).w / 2) + "px"
        }).attr("src", src);
        par.find(".x-view-menu a:eq(1)").attr("href", src);
        par.find(".x-evaluate-view").show();
    });

    //放大图片操作
    $(document).on("click", ".x-view-menu a", function () {
        var index = $(this).index();
        var menu = $(this).parents(".x-evaluate-view");
        switch (index) {
            case 0:
                closeFun(menu);
                break;
            case 1:
                //return false;
                break;
            case 2:
                deg = deg - 90;
                if (deg == -360) deg = 0;
                getVendorPrefix(menu.find(".x-show-img img")[0], {"transform": "rotate(" + deg + "deg)"});
                break;
            case 3:
                deg = deg + 90;
                if (deg == 360) deg = 0;
                getVendorPrefix(menu.find(".x-show-img img")[0], {"transform": "rotate(" + deg + "deg)"});
                break;
        }
    });

    //左右切换
    $(document).on("click", ".x-handle-left", selectImgFun);
    $(document).on("click", ".x-handle-right", selectImgFun);
    function selectImgFun() {
        var cls = $(this).attr("class");
        var par = $(this).parents(".x-evaluate-img");
        var cont = par.find(".x-show-img img");
        var li = par.find(".x-img-item");
        var length = li.length;
        var index = par.find("a.active").parents(".x-img-item").index();
        var img, w, h, src;
        deg = 0;
        $(".x-handle-right,.x-handle-left").show();
        if (cls == "x-handle-right") {
            index += 1;
            if (index == length - 1) {
                $(this).hide();
            }
        } else if (cls == "x-handle-left") {
            index -= 1;
            if (index == 0) {
                $(this).hide();
            }
        }
        li.eq(index).find("a").addClass("active").parents("li").siblings().find("a").removeClass("active");
        img = li.eq(index).find("img");
        w = img.width();
        h = img.height();
        src = img.attr("src");
        getVendorPrefix(cont[0], {"transform": "rotate(0deg)"});
        cont.css({
            "width": countImgSize(w, h).w,
            "height": countImgSize(w, h).h,
            "margin": "-" + (countImgSize(w, h).h / 2) + "px 0 0 -" + (countImgSize(w, h).w / 2) + "px"
        }).attr("src", src);

        par.find(".x-view-menu a:eq(1)").attr("href", src);
    }

    //关闭按钮
    $(document).on("click", ".x-handle-cont", function () {
        var menu = $(this).parents(".x-evaluate-view");
        closeFun(menu);
    });

    //关闭放大
    function closeFun(ele) {
        ele.hide();
        $(".x-img-item").find("a").removeClass("active");
    }

    //判断IE浏览器版本==7
    function detectionBrower() {
        var idVersion = 0;
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7.0) {
                idVersion = 7;
                return idVersion;
            }
        }
    }

    //获取浏览器支持的CSS3前缀
    function getVendorPrefix(ele, css) {
        var vendor = ['Webkit', 'Moz', 'ms', 'O'];
        var style = ele.style;
        for (var key in css) {
            if (css.hasOwnProperty(key)) {
                var newCss = key.charAt(0).toUpperCase() + key.substr(1);
                var newVendor = (key + " " + vendor.join(newCss + " ") + newCss).split(" ");
                for (var i in newVendor) {
                    if (style[newVendor[i]] != undefined) {
                        if (newVendor[i] != null) {
                            ele.style[newVendor[i]] = css[key];
                        }
                    }
                }
            }
        }
    }

    //计算
    function countImgSize(w, h) {
        var _size = {};
        var _w = 550;
        var _h = 400;
        var __w, __h;
        if (w >= h) {
            __w = _w;
            __h = _w / (w / h);
            if (__h > _h) {
                __h = _h;
                __w = __h * (w / h);
            }
        } else if (w < h) {
            __h = _h;
            __w = _h * (w / h);
            if (__w > _w) {
                __w = _w;
                __h = _w / (w / h);
            }
        }

        _size.w = __w;
        _size.h = __h;
        return _size;
    }
})(jQuery);