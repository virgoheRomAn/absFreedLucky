$(function () {
    //接收地址数据
    var areaProvinceData = "北京";
    var fullArea = $.checkArea.setFullArea(areaProvinceData);
    $(".x-arrive-area span").text(fullArea.province.name + " " + fullArea.city.cityName + " " + fullArea.county.countyName);

    //产品图片切换
    $(".x-product-img").breviary({isZoom: true});   //isZoom开启和关闭放大镜

    //页面滚动
    $(window).scroll(function () {
        var _top = $(this).scrollTop();
        var top = $(".x-container-right").offset().top - 10;
        if (_top > top) {
            $(".x-menu-float").show();
        } else {
            $(".x-menu-float").hide();
        }
    }).trigger("scroll");

    //tab切换
    $(".x-tab-menu li").click(function () {
        var top = $(".x-container-right").offset().top - 10;
        tabSlide(this, ".x-tab-cont", false, function (i) {
            $("html,body").animate({"scrollTop": top}, 300);
            $(".x-float-nav li").eq(i).addClass("active").siblings().removeClass("active");
        });
    });
    $(".x-float-nav li").click(function () {
        var top = $(".x-container-right").offset().top - 10;
        tabSlide(this, ".x-tab-cont", false, function (i) {
            $("html,body").animate({"scrollTop": top}, 300, function () {
                $(".x-menu-float").hide();
                $(".x-tab-menu li").eq(i).addClass("active").siblings().removeClass("active");
            });
        });
    });
    $(".x-evaluate-menu li").click(function () {
        tabSlide(this, ".x-evaluate-cont", true, function (i) {
            //评论切换-调用Ajax
            console.log($(this).text(), i);
        });
    });
    function tabSlide(menu, cont, type, callback) {
        var $menu = $(menu);
        var $cont = $(cont);
        var i = $menu.index(), index;
        var item;
        $menu.addClass("active").siblings().removeClass("active");
        if (!type) {
            if (i == 0) index = 0;
            if (i == 1) index = 3;
            if (i == 2) index = 1;
            if (i == 3) index = 2;
            item = $cont.find(".x-tab-item");
            item.hide();
            item.eq(index).show();
            item.eq(3).show();
        }
        callback.call(menu, i);
    }

    //显示购物车
    $(".x-float-car").hover(function () {
        $(".x-car-shop").show()
    }, function () {
        $(".x-car-shop").hide()
    });

    //收藏
    $(".x-collect").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $.jBox.success("收藏成功", {
                box: {animate: "bounceInDown"}
            });
        } else {
            $.jBox.success("取消收藏成功", {
                box: {animate: "bounceInDown"}
            });
        }
    });

    //加减法
    $(".x-add").click(function () {
        var v = parseInt($(".x-count-input input").val());
        v++;
        countNum(v);
    });
    $(".x-cut").click(function () {
        var v = parseInt($(".x-count-input input").val());
        v--;
        countNum(v);
    });
    $(".x-count-input input").blur(function () {
        var val = $(this).val();
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(val) || parseInt(val) == 0) {
            $.jBox.error("购买数量必须是大于0的正整数", {
                box: {animate: "bounceInDown"}
            });
            $(this).val(1);
        }
    });
    function countNum(num) {
        var input = $(".x-count-input input");
        if (num <= 0) num = 1;
        input.val(num);
        var val = parseInt(input.val());
        return val;
    }

    //显示分享
    $(".x-share-bar").hover(function () {
        $(".x-share-link").show();
    }, function () {
        $(".x-share-link").hide();
    });

    //选择地址
    var showType = false;
    $(".x-arrive-area").click(function () {
        if ($("#diskCont").css("display") === "none" && !showType) {
            var _areaText = $(this).find("span").text();
            $.checkArea.getAreaIntro(_areaText, this, function (opt) {
                console.log(opt);
                $(".x-carriage-text").show();
                setTimeout(function () {
                    $(".x-carriage-text").fadeOut();
                }, 500);
            });
        }
    });

    //选择规格
    $(".x-detail-tag span").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    /**
     * 补零
     * @param num 补零的数字
     * @param n 补零的位数
     * @returns {num}   补零之后的字符
     */
    var padZero = function (num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    };

    /**
     * 倒计时(包含天)
     * @param tag   目标
     * @param time  倒计时时间   秒为单位
     * @param Fun
     */
    var dayTimeDown = function (tag, time, Fun) {
        var countTime = time;
        var int_day = Math.floor(countTime / 60 / 60 / 24);
        var int_hour = Math.floor(countTime / (60 * 60));
        var int_minute = Math.floor(countTime / 60) - (int_hour * 60);
        var int_second = Math.floor(countTime) - (int_hour * 60 * 60) - (int_minute * 60);
        $(tag).find('.timeDay').html(padZero(int_day, 2));
        $(tag).find('.timeHour').html(padZero(int_hour % 24, 2));
        $(tag).find('.timeMinute').html(padZero(int_minute, 2));
        $(tag).find('.timeSecond').html(padZero(int_second, 2));
        var _time;
        _time = setInterval(function () {
            countTime--;
            if (countTime > 0) {
                int_day = Math.floor(countTime / 60 / 60 / 24);
                int_hour = Math.floor(countTime / (60 * 60));
                int_minute = Math.floor(countTime / 60) - (int_hour * 60);
                int_second = Math.floor(countTime) - (int_hour * 60 * 60) - (int_minute * 60);
            } else {
                int_day = 0;
                int_hour = 0;
                int_minute = 0;
                int_second = 0;
                Fun.call();
                clearInterval(_time);
            }
            $(tag).find('.timeDay').html(padZero(int_day, 2));
            $(tag).find('.timeHour').html(padZero(int_hour % 24, 2));
            $(tag).find('.timeMinute').html(padZero(int_minute, 2));
            $(tag).find('.timeSecond').html(padZero(int_second, 2));
        }, 1000);
        return _time;
    };

    //倒计时
    var _time = (new Date("2017/04/05 16:00:00") - new Date()) / 1000;
    dayTimeDown(".x-timeDown", _time, function () {
        console.log("计时结束！");
    });
});