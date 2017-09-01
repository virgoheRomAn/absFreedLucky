/**
 * 产品详情，产品图片
 * 查看产品缩略图，放大切换
 * 2017-01-10
 * xjq
 */
;
(function ($, win) {
    var breviary = function (element, options) {
        var defaults = {
            //基础元素
            elements: {
                showBox: ".x-pro-preview",  //装载产品图片的容器
                breviaryImg: ".breviary-img",   //产品缩略图
                prevBtn: ".btn-prev",   //上一批按钮
                nextBtn: ".btn-next"    //下一批按钮
            },
            boxCss: {},

            //设置放大镜元素
            isZoom: true,    //是否开启放大镜
            zoomElement: {
                smallBox: ".x-small-img",
                bigBox: ".x-big-img",
                zoomBox: ".x-zoom-box"
            },

            initFun: null,
            selectFun: null,
            prevFun: null,
            nextFun: null
        };

        var that = this;
        var opt = that.opt = $.extend({}, defaults, options);
        var showBox = $(opt.elements.showBox),
            showImg = showBox.find("img"),
            smallBox = $(opt.zoomElement.smallBox),
            bigBox = $(opt.zoomElement.bigBox),
            zoomBox = $(opt.zoomElement.zoomBox),
            bigImg = bigBox.find("img");
        var breviaryImg = $(opt.elements.breviaryImg),
            prevBtn = $(opt.elements.prevBtn),
            nextBtn = $(opt.elements.nextBtn);

        var placeholderImg = showImg.attr("src");
        var ul = breviaryImg.find("ul");
        var li = breviaryImg.find("li");
        var length = li.length;
        var item_w = li.outerWidth(true);
        var baseTimes = 0;
        var _is_moving_ = false;

        that._init = function () {
            var opt = that.opt;
            if (opt.boxCss) showBox.css(opt.boxCss);
            ul.css({"width": item_w * (length > 5 ? length : 5) + "px", "left": "0px", "overflow": "hidden"});
            loadImg(showImg, false, showImg.data("loading"), function (src) {
                showImg.attr("src", src).removeAttr("data-loading");
            });
            li.each(function (i) {
                if (i <= 4) {
                    var img = $(this).find("img");
                    loadImg(img, false, img.data("loading"), function (src) {
                        img.attr("src", src).removeAttr("data-loading");
                    });
                }
            });

            if (length <= 5) {
                nextBtn.addClass("noActive");
            }
            prevBtn.on("click", prevFun).addClass("noActive");
            nextBtn.on("click", nextFun);
            li.on("click", selectFun);
            if (opt.isZoom) {
                //保持图片比例一直
                var smallImgW = countOffset(smallBox).width;
                var smallImgH = countOffset(smallBox).height;
                var smallImgRatio = smallImgW / smallImgH;
                var bigImgW = countOffset(bigImg).width;
                var bigImgH = countOffset(bigImg).height;
                var bigImgRatio = bigImgW / bigImgH;
                if (parseFloat(smallImgRatio).toFixed(2) != parseFloat(bigImgRatio).toFixed(2)) {
                    bigImg.height(bigImgW / smallImgRatio);
                }
                //设置移动块的比例
                var bigW = countOffset(bigBox).width;
                var bigH = countOffset(bigBox).height;
                var bigRatio = bigW / bigH;
                var zoomRatio = smallImgW / bigImgW;
                zoomBox.width(bigW * zoomRatio);
                zoomBox.height(bigW * zoomRatio / bigRatio);

                smallBox.hover(function () {
                    zoomBox.css("visibility", "visible");
                    bigBox.show();
                }, function () {
                    zoomBox.css("visibility", "hidden");
                    bigBox.hide();
                }).on("mousemove", zoomMoveFun);
            }
            if (opt.initFun) opt.initFun.call(showBox[0], that.opt);
        };

        //移动函数
        function zoomMoveFun(e) {
            e = e || window.event;
            var left = e.clientX + $(win).scrollLeft() - countOffset(smallBox).left - countOffset(zoomBox).width / 2;
            var top = e.clientY + $(win).scrollTop() - countOffset(smallBox).top - countOffset(zoomBox).height / 2;
            if (left < 0) {
                left = 0;
            } else if (left > (countOffset(smallBox).width - countOffset(zoomBox).width)) {
                left = countOffset(smallBox).width - countOffset(zoomBox).width - 2;
            }
            if (top < 0) {
                top = 0;
            } else if (top > (countOffset(smallBox).height - countOffset(zoomBox).height)) {
                top = countOffset(smallBox).height - countOffset(zoomBox).height - 2;
            }

            var ratioLeft = left / (countOffset(smallBox).width - countOffset(zoomBox).width);
            var ratioTop = top / (countOffset(smallBox).height - countOffset(zoomBox).height);
            zoomBox.css({top: top + "px", left: left + "px"});
            bigImg.css({
                top: -ratioTop * (countOffset(bigImg).height - countOffset(bigBox).height),
                left: -ratioLeft * (countOffset(bigImg).width - countOffset(bigBox).width)
            });
        }

        //计算位置
        function countOffset(ele) {
            return {
                left: ele.offset().left,
                top: ele.offset().top,
                width: ele.outerWidth(true),
                height: ele.outerHeight(true)
            }
        }

        function prevFun() {
            if ($(this).hasClass("noActive")) return false;
            if (_is_moving_) return false;
            _is_moving_ = true;
            var left = parseInt(ul.css("left"));
            ul.stop(true, true).animate({"left": (left + 5 * item_w) + "px"}, 300, function () {
                var afterLeft = parseInt(ul.css("left"));
                nextBtn.removeClass("noActive");
                if (afterLeft >= 0) {
                    prevBtn.addClass("noActive");
                }
                _is_moving_ = false;
            });
            if (opt.prevFun) opt.prevFun.call(prevBtn[0], that.opt);
        }

        function nextFun() {
            if ($(this).hasClass("noActive")) return false;
            if (_is_moving_) return false;
            _is_moving_ = true;
            if (baseTimes + 5 < length) {
                baseTimes += 5;
            }
            var left = parseInt(ul.css("left"));
            ul.stop(true, true).animate({"left": (left - 5 * item_w) + "px"}, 300, function () {
                var afterLeft = Math.abs(parseInt(ul.css("left")));
                prevBtn.removeClass("noActive");
                if (afterLeft >= ul.width() - 5 * item_w) {
                    nextBtn.addClass("noActive");
                }
                li.each(function (i) {
                    if (i > baseTimes - 1 && i < (length < baseTimes + 5 ? length : baseTimes + 5)) {
                        var img = $(this).find("img");
                        if (!img.hasClass("isLoad")) {
                            loadImg(img, false, img.data("loading"), function (src) {
                                img.attr("src", src).removeAttr("data-loading");
                            });
                        }
                    }
                });
                _is_moving_ = false;
            });
            if (opt.nextFun) opt.nextFun.call(prevBtn[0], that.opt);
        }

        function selectFun() {
            $(this).addClass("active").siblings().removeClass("active");
            var img = $(this).find("img");
            var placeholder = img.attr("data-loading");
            showImg.attr("src", placeholderImg);
            if (placeholder && !img.hasClass("isLoad")) {
                loadImg(img, false, placeholder, function () {
                    showImg.attr("src", placeholder);
                });
            } else {
                showImg.attr("src", img.attr("src"));
            }
        }

        function loadImg(imgEle, completed, src, callback) {
            var img = new Image();
            if (!imgEle[0].complete || !completed) {
                img.onload = function () {
                    imgEle.addClass("isLoad");
                    if (callback) callback.call(img, img.src);
                };
                img.error = function () {
                    console.log("图片加载失败，路径：" + src);
                };
                img.src = src;
            } else {
                if (callback) callback.call(img, img.src);
            }
        }

        that._init();
    };


    $.fn.breviary = function (opt) {
        return this.each(function () {
            if ($(this).data("breviary") === undefined || !$(this).data("breviary")) {
                $(this).data("breviary", new breviary(this, opt));
            }
        });
    };
})(jQuery, window);
