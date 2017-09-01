/**
 * easing应用动画效果
 * @type {jQuery.easing.swing}
 */
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/**
 * 礼仪之邦
 * 多功能图片切换--li定位模式
 * 2016-11-01
 * 小强
 * v1.0
 */
(function ($) {
    $.slide = function (element, pattern, options) {
        var defaults = {
            eleBox: {},
            pattern: "fade",   //滚动模式，slide-轮播，marquee-无缝滚动，fade-渐隐渐出
            direction: "H",     //滚动方向，V-纵向，H-横向
            pageRail: false,        //下面小链接类型，是否是横条动画模式
            isResize: false,
            loop: true,
            current: 0,
            //sliderNum: 1,
            defaultClone: 1,
            autoPlay: 5000,
            animateTime: 500,
            easing: "swing",

            placeholder: ".slide-placeholder",
            pages: ".slider-paging",
            btnBar: ".slider-btn",
            prevBtn: ".prev",
            nextBtn: ".next",

            prevBtnFun: null,
            nextBtnFun: null,
            pagesFun: null,

            resizeFun: null,
            initFun: null
        };

        //给轮播元素标签加上样式名称
        var child = $(element).children()[0];
        var childNode = child.nodeName.toLowerCase();
        if (childNode.indexOf("ul") > -1) {
            $(child).find("li").each(function () {
                if (!$(this).hasClass("slide-item")) {
                    $(this).addClass("slide-item");
                }
            });
        } else {
            var childrenNode = $(child).children()[0].nodeName.toLowerCase();
            $(child).find(childrenNode).each(function () {
                if (!$(this).hasClass("slide-item")) {
                    $(this).addClass("slide-item");
                }
            });
        }

        //初始化变量
        var that = this;
        var ele = element, $marqueeBox, $item = $(ele).find(".slide-item"), $window = $(window);
        var _slide_timer_, _is_moving_ = false;
        var _marquee_timer_, _marquee_clone_num_ = 0, _default_clone_num_ = 1, marqueeObj = {};

        that.opt = $.extend({}, defaults, options);
        that.opt.pattern = !pattern ? that.opt.pattern : pattern.toString().toLowerCase();

        var _isMarquee = that.opt.pattern == "marquee";
        var dir = that.opt.direction.toString().toUpperCase() === "H";

        //初始化插件函数
        that.init = function () {
            var opt = that.opt;
            opt.container_width = opt.eleBox.width ? opt.eleBox.width : $(ele).outerWidth();
            opt.container_height = opt.eleBox.height ? opt.eleBox.height : $(ele).outerHeight();
            opt.item_width = $item.outerWidth();
            opt.item_height = $item.outerHeight();
            opt.item_length = $item.length;
            opt.slideDir = !dir ? (!opt.slideDir ? "top" : opt.slideDir) : (!opt.slideDir ? "left" : opt.slideDir);
            opt.direction = opt.slideDir ? (opt.slideDir.toString().toLowerCase() == "left" || opt.slideDir.toString().toLowerCase() == "top") ? 1 : -1 : 1;
            if (opt.pattern == "slide") {
                _isMarquee = false;
                $item.each(function () {
                    if (dir) {
                        $(this).css({"top": "0px", "left": opt.direction * opt.item_width + "px", "z-index": "100"});
                    } else {
                        $(this).css({"top": opt.direction * opt.item_height + "px", "left": "0px", "z-index": "100"});
                    }
                });
                $item.eq(opt.current).css({"top": "0px", "left": "0px", "z-index": "101"});
            } else if (opt.pattern == "fade") {
                _isMarquee = false;
                $item.hide().eq(opt.current).show();
            } else if (opt.pattern == "marquee") {
                _isMarquee = true;
                $marqueeBox = $(child);
                if (!dir) {
                    marqueeObj.cssName = "top";
                    marqueeObj.outerCssName = "height";
                    marqueeObj.cellSite = opt.item_height;
                    marqueeObj.limitSite = $(ele).outerHeight();
                    marqueeObj.mainSite = $marqueeBox.outerHeight();
                } else {
                    marqueeObj.cssName = "left";
                    marqueeObj.outerCssName = "width";
                    marqueeObj.cellSite = opt.item_width;
                    marqueeObj.limitSite = $(ele).outerWidth();
                    marqueeObj.mainSite = $marqueeBox.outerWidth();
                }

                _default_clone_num_ = opt.defaultClone ? opt.defaultClone : 1;
                _marquee_clone_num_ = Math.floor(marqueeObj.limitSite / marqueeObj.cellSite);
                marqueeObj.marquee_length = _default_clone_num_ + _marquee_clone_num_ + opt.item_length;
                marqueeObj.thisLimitSite = marqueeObj.marquee_length * marqueeObj.cellSite;
                $marqueeBox.css(marqueeObj.cssName, marqueeObj.cellSite * -_default_clone_num_ + "px");

                cloneFun($item, _marquee_clone_num_, "append");
                cloneFun($item, _default_clone_num_, "prepend");
                opt.item_height = $item.outerHeight();
                $marqueeBox.css(marqueeObj.outerCssName, marqueeObj.thisLimitSite + "px");
            }

            //窗口大小事件
            $window.resize(function () {
                var opt = that.opt;
                if (opt.isResize) resizeFun(opt);
                if (opt.resizeFun) opt.resizeFun.call(ele, opt, $(this).width());
            });

            //hover暂停，重新启动
            $(ele).hover(function () {
                if (opt.btnBar) $(ele).find(opt.btnBar).show();
                pausePlay();
            }, function () {
                if (opt.btnBar) $(ele).find(opt.btnBar).hide();
                if (_isMarquee) {
                    marqueeFun(opt.slideDir);
                } else {
                    autoPlay(opt);
                }
            });

            //初始化小触点&开始播放
            addSmallBtn(opt);
            if (!_isMarquee && opt.pageRail) {
                $(document.head).append('<style type="text/css">' +
                '.' + ele.className.toString().split(" ")[1] + ' .slider-paging.current span i{' +
                '   transition: width ' + opt.animateTime / 1000 + 's linear;' +
                '   -webkit-transition: width ' + opt.animateTime / 1000 + 's linear;' +
                '   -moz-transition: width ' + opt.animateTime / 1000 + 's linear;' +
                '   -o-transition: width ' + opt.animateTime / 1000 + 's linear;' +
                '}' +
                '</style>');

                $(ele).find(opt.pages).find("span").eq(opt.current).find("i").animate({}, 0, "linear", function () {
                    autoPlay(opt);
                    $(this).parents("span").addClass("active");
                });
            } else if (!_isMarquee) {
                $(ele).find(opt.pages).find("span").eq(opt.current).addClass("active");
                autoPlay(opt);
            } else {
                marqueeFun(opt.slideDir);
            }


            //绑定事件
            $(ele).find(opt.nextBtn).on("click", that.nextFun);
            $(ele).find(opt.prevBtn).on("click", that.prevFun);
            $(ele).find(opt.pages).find("span").on("click", smallBtnClick);

            if (opt.initFun) opt.initFun.call(ele, opt);
        };

        //下一张
        that.nextFun = function () {
            var opt = that.opt;
            if (!opt.loop && opt.current > opt.item_length - 2) return false;
            moveFun(opt.current + 1, 1);
        };

        //上一张
        that.prevFun = function () {
            var opt = that.opt;
            if (!opt.loop && opt.current < 1) return false;
            moveFun(opt.current - 1, -1);
        };


        //无缝滚动 克隆元素
        var cloneFun = function (ele, num, type) {
            if (num) {
                for (var i = 0; i < num; i++) {
                    if (type == "append") {
                        $(child).append(ele.eq(i).clone().addClass("clone"));
                    } else if (type == "prepend") {
                        $(child).prepend(ele.eq(ele.length - 1 - i).clone().addClass("clone"));
                    }
                }
            } else return ele.clone();
        };

        //小触点点击事件
        var smallBtnClick = function () {
            var opt = that.opt;
            var index = $(this).index();
            var curIndex = opt.current;
            if (index == curIndex) return false;
            if (index > curIndex) {
                moveFun(index, 1);
            } else {
                moveFun(index, -1);
            }
            if (opt.pagesFun) opt.pagesFun.call(ele, opt.current);
        };

        //添加小触点
        var addSmallBtn = function (opt) {
            var _html_ = "";
            var cls = opt.pageRail ? "current" : "active";
            for (var i = 0; i < opt.item_length; i++) {
                if (i == opt.current)_html_ += "<span><i>" + (i + 1) + "</i></span>";
                else _html_ += "<span><i>" + (i + 1) + "</i></span>";
            }
            $(ele).find(opt.pages).addClass(cls).append(_html_);
        };

        //播放
        var autoPlay = function (opt) {
            if (!opt.autoPlay) return false;
            clearInterval(_slide_timer_);
            $(ele).removeClass("isPause");

            if ($(opt.placeholder).length != 0) {
                imgLazyLoad(opt.current);
            }
            _slide_timer_ = setInterval(function () {
                moveFun(opt.current + 1);
            }, opt.autoPlay);
            $(ele).data("clearTimer", _slide_timer_);
        };

        //暂停
        var pausePlay = function () {
            $(ele).addClass("isPause");
            if (_isMarquee) clearInterval(_marquee_timer_);
            else clearInterval(_slide_timer_);
        };

        //图片懒加载
        var imgLazyLoad = function (cur) {
            var opt = that.opt;
            var ele = $item.eq(cur);
            var loadImg = ele.find(".load-img");
            if (loadImg.length === 0) return false;

            loadImg.each(function () {
                var _img = $(this);
                var src = _img.attr("data-load-src");
                loadImages(_img[0], false, src, function () {
                    if (src) {
                        _img.attr("src", src);
                        _img.removeAttr("data-load-src");
                    }
                    _img.addClass('isLoaded');
                    ele.find(opt.placeholder).remove();
                });
            });
        };


        var loadImages = function (imgElement, checkForComplete, src, callback) {
            var image;
            //回调函数
            function onReady() {
                if (callback) callback();
            }
            //图片加载没完成
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = function () {
                        console.log("图片加载失败，路径：" + image.src);
                        if (callback) callback();
                    };
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
            } else {
                onReady();
            }
        };

        //轮播，渐隐
        var moveFun = function (cur, ortDir, callback) {
            if (_is_moving_) return false;
            _is_moving_ = true;
            clearInterval(_slide_timer_);
            var opt = that.opt;
            if (cur >= opt.item_length) cur = 0;
            if (cur < 0) cur = opt.item_length - 1;
            if (cur == opt.current) {
                _is_moving_ = false;
                return false;
            }
            var direction = ortDir || opt.direction;
            direction > 0 ? (opt.nextBtnFun) && (opt.nextBtnFun.call(ele, cur)) : (opt.prevBtnFun) && (opt.prevBtnFun.call(ele, cur));

            var curEle = $item.eq(opt.current);
            var targetEle = $item.eq(cur);

            $(ele).find(opt.pages).find("span").each(function (i) {
                if (i == cur) {
                    $(this).addClass("active").siblings().removeClass("active");
                }
            });

            if (opt.placeholder) {
                if (!targetEle.find(".load-img").hasClass("isLoad")) {
                    imgLazyLoad(cur);
                }
            }

            switch (opt.pattern) {
                case "slide":
                    if (dir) {
                        targetEle.css({top: 0, left: opt.item_width * direction, zIndex: 101});
                        curEle.animate({
                            left: opt.item_width * direction * -1,
                            zIndex: 100
                        }, opt.animateTime, opt.easing, function () {
                            opt.current = cur;
                            _is_moving_ = false;
                            if (!$(ele).hasClass("isPause")) {
                                autoPlay(opt);
                            }
                            if (callback) callback();
                        });
                        targetEle.animate({left: 0, zIndex: 101}, opt.animateTime, opt.easing);
                    } else {
                        targetEle.css({left: 0, top: opt.item_height * direction, zIndex: 101});
                        curEle.animate({
                            top: opt.item_height * direction * -1,
                            zIndex: 100
                        }, opt.animateTime, opt.easing, function () {
                            opt.current = cur;
                            _is_moving_ = false;
                            if (!$(ele).hasClass("isPause")) {
                                autoPlay(opt);
                            }
                            if (callback) callback();
                        });
                        targetEle.animate({top: 0, zIndex: 101}, opt.animateTime, opt.easing);
                    }
                    break;
                case "fade":
                    curEle.fadeOut();
                    targetEle.fadeIn(function () {
                        opt.current = cur;
                        _is_moving_ = false;
                        if (!$(ele).hasClass("isPause")) {
                            autoPlay(opt);
                        }
                        if (callback) callback();
                    });
                    break;
            }
        };

        //无缝滚动
        var marqueeFun = function (slideDirection) {
            var opt = that.opt;
            if (!opt.autoPlay) return false;
            clearInterval(_marquee_timer_);
            $(ele).removeClass("isPause");
            var cssName = marqueeObj.cssName;
            _marquee_timer_ = setInterval(function () {
                var initSite = parseInt($marqueeBox.css(cssName));
                var moveSite = (slideDirection.toLowerCase() == "top" || slideDirection.toLowerCase() == "left") ? --initSite : ++initSite;
                if (!dir) {
                    if (opt.direction == 1) {
                        $marqueeBox.animate({"top": moveSite}, 0, function () {
                            if (Math.abs(initSite) >= (opt.item_length + 1) * opt.item_height) {
                                $marqueeBox.css(cssName, opt.item_height * -1 + "px");
                            }
                        });
                    } else {
                        $marqueeBox.animate({"top": moveSite}, 0, function () {

                        });
                    }
                } else {
                    if (opt.direction == 1) {
                        $marqueeBox.animate({"left": moveSite}, 0, function () {
                            if (Math.abs(initSite) >= (opt.item_length + 1) * opt.item_width) {
                                $marqueeBox.css(cssName, opt.item_width * -1 + "px");
                            }
                        });
                    } else {
                        $marqueeBox.animate({"left": moveSite}, 0, function () {
                            if (initSite >= 0) {
                                $marqueeBox.css(cssName, opt.item_width * opt.item_length * -1 + "px");
                            }
                        });
                    }
                }
            }, opt.autoPlay);
            $marqueeBox.data("clearTimer", _marquee_timer_);
        };

        //自动适应窗口大小
        var resizeFun = function (opt) {
            var w, h, ratio;
            var w_width = $(this).width();
            if (opt.eleBox.width) {
                w = opt.container_width;
                h = opt.container_height;
            } else {
                w = w_width;
                ratio = w_width / opt.container_width;
                h = opt.container_height * ratio;
            }

            ele.style.width = w + "px";
            ele.style.height = h + "px";
            ele.style.overflow = "hidden";
        };

        //启用
        that.init();
    };

    $.fn.sliderBox = function (type, opt) {
        return this.each(function () {
            if ($(this).data("slide") === undefined || !$(this).data("slide")) {
                $(this).data("slide", new $.slide(this, type, opt));
            }
        });
    };
})
(jQuery);

