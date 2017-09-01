/**
 * easing应用动画效果
 * @type {jQuery.easing.swing}
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    }, easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a
    }, easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    }, easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    }, easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    }, easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    }, easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    }, easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    }, easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    }, easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    }, easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    }, easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    }, easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    }, easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    }, easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    }, easeInOutSine: function (e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    }, easeInExpo: function (e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    }, easeOutExpo: function (e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    }, easeInOutExpo: function (e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    }, easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    }, easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    }, easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    }, easeInElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    }, easeOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    }, easeInOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    }, easeInBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    }, easeOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    }, easeInOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    }, easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    }, easeOutBounce: function (e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    }, easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});

/**
 * 礼仪之邦
 * 多功能图片切换--li浮动模式
 * 2016-11-08
 * 小强
 * v2.0
 * 新增选项卡 新增全屏模式 新增多图轮播 新增图片懒加载
 * 调整轮播方式
 */
(function ($) {
    /**
     * 滚动函数
     * @param element   当前元素
     * @param pattern   轮播类型 slide-轮播，marquee-无缝滚动，fade-渐隐渐出，tab-菜单切换卡
     * @param options   轮播参数
     */
    $.slide = function (element, pattern, options) {
        var defaults = {
            eleBox: {maxWidth: 1200},     //设置element的盒子
            pattern: "fade",   //轮播类型   内联模式。默认读取外置pattern，外置为空，读取内置的
            direction: "H",     //滚动方向，V-纵向，H-横向
            slideDir: "left",   //滚动方向。默认：H-left，V-top

            //tab模式：
            events: "mouseover",     //触发条件
            menuBar: ".slider-tab-menu",    //切换菜单
            contBar: ".slider-tab-cont",    //切换内容
            effect: "slide",    //切换类型
            callback: null,  //触发条件之后的回调

            //slide模式：
            pageRail: false,        //下面小链接类型，是否是横条动画模式
            loop: true,     //是否循环轮播
            sliderNum: 1,   //轮播个数，
            loadImg: ".load-img",
            placeholder: ".slide-placeholder",  //轮播占位符

            //公共属性
            current: 0,     //当前选中元素（下标）
            isHover: true,   //是否开启鼠标移动暂停
            autoPlay: 5000,     //轮播时间   如果为null/0/""/undefined 则不默认播放。需要添加触发
            animateTime: 500,   //动画时间
            easing: "swing",    //动画参数-接收easing动画参数

            pages: ".slider-paging",    //小触点   空则表示没有触点
            btnBar: ".slider-btn",      //按钮
            pagesEvents: "click",
            prevBtn: ".prev",   //上一张按钮样式
            nextBtn: ".next",   //下一张按钮样式

            prevBtnFun: null,   //上一张回调
            nextBtnFun: null,   //下一张回调
            pagesFun: null,     //小触点回调

            resizeFun: null,    //改变窗口大小
            initFun: null,   //初始化回调

            autoPlayFun: null,  //自动播放回调
            pausedFun: null,     //暂停播放
            playFun: null        //开始播放
        };

        var that = this, ele = element, $ele = $(element);
        var opt = that.opt = $.extend({}, defaults, options);
        //定义滚动模式
        var slidePattern = opt.pattern = !pattern ? opt.pattern.toString().toLowerCase() : pattern.toString().toLowerCase();
        //声明元素
        var $tab_menu = $ele.find(opt.menuBar), $tab_cont = $ele.find(opt.contBar);
        var $page = $ele.find(opt.pages), $btn = $ele.find(opt.btnBar), $next = $btn.find(opt.nextBtn), $prev = $btn.find(opt.prevBtn);
        //声明参数
        var ease = opt.easing, an_time = opt.animateTime, au_time = opt.autoPlay;


        //给轮播元素标签加上样式名称
        var child = slidePattern !== "tab" ? $(element).children()[0] : $tab_cont.children()[0];
        var childNode = child.nodeName.toLowerCase();
        if (childNode.indexOf("ul") > -1) {
            $(child).find("li").each(function (i) {
                if (!$(this).hasClass("slide-item")) {
                    $(this).addClass("slide-item").data("id", "index" + i);
                }
            });
        } else {
            var childrenNode = $(child).children()[0].nodeName.toLowerCase();
            $(child).children(childrenNode).each(function (i) {
                if (!$(this).hasClass("slide-item")) {
                    $(this).addClass("slide-item").data("id", "index" + i);
                }
            });
        }

        //初始化轮播变量
        var $window = $(window), $main = $(child), $item = $ele.find(".slide-item"), $clone_item, $all_item;
        var _slide_timer_, _is_full_ = false, _is_moving_ = false;
        var _clone_num_ = 0, _page_num_ = 0, _view_num_ = 0, _surplus_num_ = 0, _marquee_clone_num_ = 1;
        var _slide_times_ = 0, _default_times_ = 0;
        var slideOpt = {};

        var _tab_effect_ = that.opt.pattern == "tab" ? opt.effect ? opt.effect : "fade" : null; //tab切换模式
        var _is_auto_ = pattern === "tab" ? false : au_time ? true : false; //是否自动播放，tab模式为false
        var _is_loop_ = (pattern === "fade" || _tab_effect_ === "fade") ? false : opt.loop ? true : false;
        var _is_marquee = that.opt.pattern == "marquee";
        var _slide_num_ = _is_marquee ? 1 : opt.sliderNum;
        var _is_slide_num = _slide_num_ > 1;    //是否多图轮播
        var dir = that.opt.direction.toString().toUpperCase() === "H";

        //初始化插件函数
        that.init = function () {
            var opt = that.opt;
            //当前选中元素
            opt.currentEle = $item.eq(opt.current);
            opt.item_width = $item.outerWidth(true);
            opt.item_height = $item.outerHeight(true);
            opt.container_width = opt.eleBox.width ? opt.eleBox.width : $(ele).outerWidth(true);
            opt.container_height = opt.eleBox.height ? opt.eleBox.height :
                ((opt.pattern == "tab") ? (opt.item_height + $tab_menu.outerHeight(true)) : $(ele).outerHeight(true));
            var item_all_length = opt.item_length = $item.length;

            //设置element盒子
            $(ele).css({"width": opt.container_width, "height": opt.container_height, "overflow": "hidden"});
            //判断是否为全屏滚动
            _is_full_ = opt.container_width >= $window.width();

            //滚动方向，默认值：top/left
            opt.slideDir = !dir ? (!opt.slideDir ? "top" : opt.slideDir) : (!opt.slideDir ? "left" : opt.slideDir);
            //滚动方向对应的数值，top/left=1,down/right=-1;
            opt.direction = opt.slideDir ? (opt.slideDir.toString().toLowerCase() == "left" || opt.slideDir.toString().toLowerCase() == "top") ? 1 : -1 : 1;

            //初始化样式名称
            if (!dir) {
                slideOpt.cssName = "top";
                slideOpt.outerCssName = "height";
                slideOpt.limitSite = opt.container_height;
                slideOpt.mainSite = $main.outerHeight(true);
                slideOpt.cellSite = $item.outerHeight(true);
            } else {
                slideOpt.cssName = "left";
                slideOpt.outerCssName = "width";
                slideOpt.limitSite = opt.container_width;
                slideOpt.mainSite = $main.outerWidth(true);
                slideOpt.cellSite = $item.outerWidth(true)
            }

            //当前视图中轮播元素的个数
            _view_num_ = Math.ceil(slideOpt.limitSite / slideOpt.cellSite);
            //检测总图个数和滚动个数是否成正比
            _surplus_num_ = _is_slide_num ? opt.item_length % _slide_num_ : 1;
            //检测当前滚动的次数
            _slide_times_ = _is_loop_ ? Math.ceil(opt.item_length / _slide_num_) : Math.floor(opt.item_length / _slide_num_);
            //如果当前视图中的条数大于总条数，不执行滚动效果
            if (_view_num_ > opt.item_length) return false;
            //判断小触点个数
            _page_num_ = _is_loop_ ? Math.ceil(opt.item_length / _slide_num_) : _view_num_ > _slide_num_ ? opt.item_length - (_view_num_ - _slide_num_) : Math.ceil(opt.item_length / _slide_num_);
            //判断都需要克隆的模式(循环滚动中的slide和marquee)
            if (_is_loop_) {
                _clone_num_ = _slide_num_ > 1 ? _slide_num_ : _view_num_ > _slide_num_ ? _view_num_ : 1;
                cloneFun($item, _clone_num_, "append");
                _is_marquee ? cloneFun($item, _marquee_clone_num_, "prepend") : cloneFun($item, _clone_num_, "prepend");
                $clone_item = $ele.find(".slide-item.clone");
                item_all_length = opt.new_item_length = $clone_item.length + opt.item_length;
                $main.css(slideOpt.outerCssName, slideOpt.cellSite * item_all_length);
            }
            //克隆之后的元素
            $all_item = $ele.find(".slide-item");
            //窗口大小事件
            $window.resize(function () {
                var w_width = $(this).width();
                var newSite = dir ? w_width : slideOpt.limitSite;
                var resizeCur = opt.current == 0 ? _clone_num_ : opt.current + _clone_num_;
                //窗口改变更改全屏滚动的盒子
                if (_is_full_) {
                    $ele.css({"width": w_width, "height": opt.container_height});
                    $all_item.css({"width": w_width, "height": opt.item_height});
                    $main.css(slideOpt.outerCssName, newSite * item_all_length);
                    slideOpt.cellSite = newSite;
                    if (opt.pattern !== "fade" && ( _tab_effect_ !== "fade") && !_is_marquee) {
                        $main.css(slideOpt.cssName, slideOpt.cellSite * -resizeCur + "px");
                    }
                }
                //改变窗口回调
                if (opt.resizeFun) opt.resizeFun.call(ele, opt, w_width);
            });

            //设置初始位置
            if (opt.pattern !== "fade" && ( _tab_effect_ !== "fade") && !_is_marquee) {
                if (_is_full_) {
                    $main.css(slideOpt.cssName, $window.width() * -_clone_num_ + "px");
                } else {
                    if (_view_num_ == 1) {
                        if (opt.pattern === "tab") {
                            $all_item.css({"width": opt.container_width}).each(function () {
                                $(this).height($(this).outerHeight(true));
                            });
                        } else {
                            $all_item.css({"width": opt.container_width, "height": opt.container_height});
                        }
                    } else {
                        $all_item.css({"width": opt.item_width, "height": opt.item_height});
                    }
                    $main.css(slideOpt.outerCssName, slideOpt.limitSite * item_all_length);
                    $main.css(slideOpt.cssName, slideOpt.cellSite * -_clone_num_ + "px");
                }
            } else if (!_is_marquee) {
                $item.hide().eq(opt.current).show();
            }

            //添加触点及其样式
            addLinkBtn(opt);
            if (opt.pageRail) {
                var style = '.' + ele.className.toString().split(" ")[1] + ' .slider-paging.current span i{ transition: width ' + opt.animateTime / 1000 + 's linear; -webkit-transition: width ' + opt.animateTime / 1000 + 's linear;  -moz-transition: width ' + opt.animateTime / 1000 + 's linear; -o-transition: width ' + opt.animateTime / 1000 + 's linear;}';
                $(document.head).append('<style type="text/css">' + style + '</style>');
                $page.find("span").eq(opt.current).find("i").animate({}, 0, "linear", function () {
                    $(this).parents("span").addClass("active");
                });
            } else {
                $(ele).find(opt.pages).find("span").eq(opt.current).addClass("active");
            }

            //默认自动播放
            if (_is_auto_) {
                autoPlay(opt);
            }

            //绑定事件
            $next.on("click", that.nextFun);
            $prev.on("click", that.prevFun);
            $page.find("span").on(opt.pagesEvents, smallBtnClick);
            $tab_menu.find("li").on(opt.events, tabSlide);

            //初始化回调
            if (opt.initFun) opt.initFun.call(ele, opt);
        };

        //hover暂停，重新启动
        $(ele).hover(function (e) {
            e.stopPropagation();
            if (opt.btnBar) $(ele).find(opt.btnBar).fadeIn();
            if (opt.isHover) pausePlay();

            if (opt.pausedFun) opt.pausedFun.call(child, opt.current);
        }, function (e) {
            e.stopPropagation();
            if (opt.btnBar) $(ele).find(opt.btnBar).fadeOut();
            if (opt.isHover) autoPlay(opt);

            if (opt.playFun) opt.playFun.call(child, opt.current);
        });

        //下一张
        that.nextFun = function () {
            var opt = that.opt;
            if (!_is_marquee) {
                if (!_is_loop_ && opt.current > _page_num_) return false;
                moveFun(opt.current, 1, function (cur, all) {
                    if (opt.nextBtnFun) opt.nextBtnFun.call(this, cur, all);
                });
            } else {
                clearInterval(_slide_timer_);
                opt.direction = 1;
                autoPlay(opt);
            }
        };

        //上一张
        that.prevFun = function () {
            var opt = that.opt;
            if (!_is_marquee) {
                if (!_is_loop_ && opt.current < 0) return false;
                moveFun(opt.current, -1, function (cur, all) {
                    if (opt.prevBtnFun) opt.prevBtnFun.call(this, cur, all);
                });
            } else {
                clearInterval(_slide_timer_);
                opt.direction = -1;
                autoPlay(opt);
            }
        };

        //菜单切换
        function tabSlide(e) {
            e.stopPropagation();
            var index = $(this).index();
            moveFun(index - 1, opt.direction, function (cur, all) {
                if (opt.autoPlayFun) opt.autoPlayFun.call(this, cur, all);
            });
        }

        //小触点点击事件
        var smallBtnClick = function () {
            var opt = that.opt;
            var index = $(this).index();
            var dir = 1;
            var curIndex = (index - 1) * _slide_num_;
            if (index == _page_num_ - 1) {
                _default_times_ = _slide_times_ - 2;
            } else if (index == 0) {
                _default_times_ = -1;
            } else {
                _default_times_ = 1;
            }
            moveFun(curIndex, dir, function (cur, all) {
                if (opt.pagesFun) opt.pagesFun.call(this, cur, all);
            });
        };

        //添加小触点
        var addLinkBtn = function (opt) {
            var _html_ = "";
            var cls = opt.pageRail ? "current" : "active";
            for (var i = 0; i < _page_num_; i++) {
                if (i == opt.current)_html_ += "<span><i>" + (i + 1) + "</i></span>";
                else _html_ += "<span><i>" + (i + 1) + "</i></span>";
            }
            $page.addClass(cls).append(_html_);
        };

        //播放
        var autoPlay = function (opt) {
            if (!_is_auto_) return false;
            clearInterval(_slide_timer_);
            $ele.removeClass("isPause");
            //视图为1的时候，加载第一张
            if (_view_num_ == 1) {
                if ($ele.find(opt.placeholder).length != 0 && !$item.eq(opt.current).find(opt.loadImg).hasClass("isLoaded")) {
                    imgLazyLoad(opt.current);
                }
            } else {  //视图不为1的时候，加载视图个数
                for (var i = 0; i < _view_num_; i++) {
                    if ($ele.find(opt.placeholder).length != 0 && !$item.eq(i).find(opt.loadImg).hasClass("isLoaded")) {
                        imgLazyLoad(i);
                    }
                }
            }

            _slide_timer_ = setInterval(function () {
                moveFun(opt.current, opt.direction, function (cur, all) {
                    if (opt.autoPlayFun) opt.autoPlayFun.call(this, cur, all);
                });
            }, au_time);
            $ele.data("clearTimer", _slide_timer_);
        };

        //暂停
        var pausePlay = function () {
            $(ele).addClass("isPause");
            clearInterval(_slide_timer_);
        };

        //滚动函数
        var moveFun = function (cur, ortDir, callback) {
            var opt = that.opt;
            if (!_is_marquee && opt.pattern !== "tab") {
                if (_is_moving_) return false;
                _is_moving_ = true;
            }
            var direction = !ortDir ? opt.direction : ortDir;
            var moveDir = direction == 1 ? -1 : 1;
            var maxLength = 0;
            if (_is_loop_) {
                maxLength = _page_num_;
            } else {
                maxLength = _view_num_ > _slide_num_ ? _page_num_ : opt.item_length;
            }
            var callbackCur = 0;
            //去除tab模式的下标加减法
            //下标加减法
            if (direction == 1) {
                if (_is_slide_num) {
                    //检测滚动多次之后是否剩余
                    if (_surplus_num_ == 0) {
                        cur = cur + _slide_num_;
                    } else {
                        _default_times_++;
                        if (_default_times_ >= _slide_times_) {
                            cur = cur + _surplus_num_;
                            _default_times_ = 0;
                        } else {
                            cur = cur + _slide_num_;
                        }
                    }
                } else {
                    cur++;
                }
            } else {
                if (_is_slide_num) {
                    //检测滚动多次之后是否剩余
                    if (_surplus_num_ == 0) {
                        cur = cur - _slide_num_;
                    } else {
                        _default_times_--;
                        if (_default_times_ < 0) {
                            cur = cur - _surplus_num_;
                            _default_times_ = _slide_times_ - 1;
                        } else {
                            cur = cur - _slide_num_;
                        }
                    }
                } else {
                    cur--;
                }
            }
            //不是循环计算下标
            if (!_is_loop_) {
                if (cur >= maxLength)  cur = 0;
                if (cur < 0) cur = opt.item_length - _surplus_num_;
            }
            //无缝滚动模式
            if (_is_marquee) {
                if (cur > 0) cur = 1;
                if (cur < 0) cur = 0;
            }
            //tab切换模式
            if (slidePattern == "tab") {
                slidePattern = _tab_effect_;
            }
            //切换模式动画
            switch (slidePattern) {
                case "slide":
                    if (dir) {
                        if (_is_loop_) {
                            $main.stop(true, true).animate({"left": slideOpt.cellSite * (cur + _clone_num_) * direction * moveDir}, an_time, ease, function () {
                                if (cur < 0) {
                                    cur = opt.item_length - _surplus_num_;
                                    $main.css("left", -(opt.item_length + (_clone_num_ - _surplus_num_)) * slideOpt.cellSite);
                                } else if (cur >= opt.item_length) {
                                    cur = 0;
                                    $main.css("left", -_clone_num_ * slideOpt.cellSite);
                                }
                                opt.current = cur;
                                opt.currentEle = $item.eq(cur);
                                callbackCur = _is_slide_num ? Math.ceil(opt.current / _slide_num_) : opt.current;
                                if (callback) callback.call(opt.currentEle[0], callbackCur, maxLength);
                                _is_moving_ = false;
                            });
                        } else {
                            $main.stop(true, true).animate({"left": slideOpt.cellSite * cur * direction * moveDir}, an_time, ease, function () {
                                opt.current = cur;
                                opt.currentEle = $item.eq(cur);
                                callbackCur = _is_slide_num ? Math.ceil(opt.current / _slide_num_) : opt.current;
                                if (callback) callback.call(opt.currentEle[0], callbackCur, maxLength);
                                _is_moving_ = false;
                            });
                        }
                    } else {
                        if (_is_loop_) {
                            $main.stop(true, true).animate({"top": slideOpt.cellSite * (cur + _clone_num_) * direction * moveDir}, an_time, ease, function () {
                                if (cur < 0) {
                                    cur = opt.item_length - _surplus_num_;
                                    $main.css("top", -(opt.item_length + (_clone_num_ - _surplus_num_)) * slideOpt.cellSite);
                                } else if (cur >= opt.item_length) {
                                    cur = 0;
                                    $main.css("top", -_clone_num_ * slideOpt.cellSite);
                                }
                                opt.current = cur;
                                opt.currentEle = $item.eq(cur);
                                callbackCur = _is_slide_num ? Math.ceil(opt.current / _slide_num_) : opt.current;
                                if (callback) callback.call(opt.currentEle[0], callbackCur, maxLength);
                                _is_moving_ = false;
                            });
                        } else {
                            $main.stop(true, true).animate({"top": slideOpt.cellSite * cur * direction * moveDir}, an_time, ease, function () {
                                opt.current = cur;
                                opt.currentEle = $item.eq(cur);
                                callbackCur = _is_slide_num ? Math.ceil(opt.current / _slide_num_) : opt.current;
                                if (callback) callback.call(opt.currentEle[0], callbackCur, maxLength);
                                _is_moving_ = false;
                            });
                        }
                    }
                    break;
                case "fade":
                    $item.stop(true, true).eq(cur).animate({opacity: "show"}, an_time, ease, function () {
                        opt.current = cur;
                        opt.currentEle = $item.eq(cur);
                        if (callback) callback.call(opt.currentEle[0], opt.current, maxLength);
                        _is_moving_ = false;
                    }).siblings().hide();
                    break;
                case "marquee":
                    var cssName = slideOpt.cssName;
                    var initSite = parseInt($main.css(cssName));
                    var moveSite = direction == 1 ? --initSite : ++initSite;
                    if (!dir) {
                        $main.animate({"top": moveSite}, 0, function () {
                            if (Math.abs(initSite) >= (opt.item_length + 1) * opt.item_height) {
                                $main.css(cssName, opt.item_height * -1 + "px");
                            } else if (initSite >= 0) {
                                $main.css(cssName, opt.item_height * opt.item_length * -1 + "px");
                            }
                        });
                    } else {
                        $main.animate({"left": moveSite}, 0, function () {
                            if (Math.abs(initSite) >= (opt.item_length + 1) * opt.item_width) {
                                $main.css(cssName, opt.item_width * -1 + "px");
                            } else if (initSite >= 0) {
                                $main.css(cssName, opt.item_width * opt.item_length * -1 + "px");
                            }
                        });
                    }
                    break;
            }
            //结束

            //触点动画
            var pageCur = cur, resultCur = pageCur;
            if (pageCur >= opt.item_length)   pageCur = 0;
            if (pageCur < 0) pageCur = opt.item_length - 1;
            $page.find("span").each(function (i) {
                if (!_is_slide_num) {
                    resultCur = pageCur;
                    if (i == pageCur) {
                        $(this).addClass("active").siblings().removeClass("active");
                        return false;
                    }
                } else {
                    resultCur = Math.ceil(pageCur / _slide_num_);
                    if (i == (Math.ceil(pageCur / _slide_num_))) {
                        $(this).addClass("active").siblings().removeClass("active");
                        return false;
                    }
                }
            });
            //结束

            //tab模式菜单选中
            $tab_menu.find("li").eq(resultCur).addClass("active").siblings().removeClass("active");
            //结束

            //加载图片
            //视图为1的时候，逐一加载
            if (_view_num_ == 1) {
                if ($ele.find(opt.placeholder).length != 0 && !$item.eq(resultCur).find(opt.loadImg).hasClass("isLoaded")) {
                    imgLazyLoad(resultCur);
                }
            } else {  //视图不为1的时候，一次加载视图个数
                for (var i = 0; i < _view_num_; i++) {
                    var loadNum = i + pageCur;
                    loadNum = loadNum >= opt.item_length ? 0 : loadNum;
                    if ($ele.find(opt.placeholder).length != 0 && !$item.eq(loadNum).find(opt.loadImg).hasClass("isLoaded")) {
                        imgLazyLoad(loadNum);
                    }
                }
            }
        };

        //克隆元素
        var cloneFun = function (ele, num, type) {
            if (num) {
                for (var i = 0; i < num; i++) {
                    if (type == "append") {
                        $(child).append(ele.eq(i).clone().addClass("clone").data("clone-id", ele.eq(i).data("id")));
                    } else if (type == "prepend") {
                        $(child).prepend(ele.eq(ele.length - 1 - i).clone().addClass("clone").data("clone-id", ele.eq(ele.length - 1 - i).data("id")));
                    }
                }
            } else return ele.clone();
        };

        //图片懒加载（单一图片加载）
        var imgLazyLoad = function (cur) {
            var opt = that.opt;
            var ele = $item.eq(cur);
            var id = ele.data("id");
            var _img = ele.find(opt.loadImg);
            if (_img.length === 0) return false;

            var src = _img.attr("data-load-src");
            var background = ele.attr("data-load-background");

            loadImages(_img[0], false, (src || background), function () {
                if (background) {
                    ele.css("background-image", "url('" + background + "')");
                    ele.removeAttr("data-load-background");
                } else {
                    if (src) {
                        _img.attr("src", src);
                        _img.removeAttr("data-load-src");
                    }
                }
                _img.addClass('isLoaded');
                ele.find(opt.placeholder).remove();

                //处理克隆元素
                $all_item.each(function () {
                    var $clone_img = $(this).find(opt.loadImg);
                    if ($(this).hasClass("clone") && $(this).data("clone-id") === id) {
                        if ($(this).attr("data-load-background")) {
                            $(this).css("background-image", "url('" + background + "')").removeAttr("data-load-background");
                        } else if ($clone_img.attr("data-load-src")) {
                            $clone_img.attr("src", src).removeAttr("data-load-src");
                        }
                        $(this).find(opt.placeholder).remove();
                    }
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

