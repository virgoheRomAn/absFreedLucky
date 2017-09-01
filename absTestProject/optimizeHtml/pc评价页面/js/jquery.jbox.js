/**
 * PC版弹窗组件
 * 支持拖拽，支持动画样式，外部定义样式
 * 2016-10-24
 * by 小强
 */
;
(function ($) {
    var diskBox = function (option) {
        var defaults = {
            isMove: true,   //是否可移动
            isVertical: false,  //是否垂直剧中
            isFlow: true,   //是否跟随移动
            time: 1500, //小时时间
            top: "20%",  //距离顶部的距离，支持“px”和“%”
            box: {clsName: "", animate: "j-alert-ani"},
            title: "",
            icon: {location: "img/", src: ""},
            btn: {
                text: [],
                jEnsure: null,
                jCancel: null
            },
            css: {} //整体样式
        };

        var defaultCSS = {
            iconCSS: {width: "26px", "height": "26px"},
            boxCSS: {},
            titleCSS: {},
            textCSS: {},
            btnCSS: {
                jEnsure: {},
                jCancel: {}
            }
        };
        var that = this;
        that.opt = $.extend({}, defaults, option);

        that.configFun = function (callback) {
            var opt = that.opt;
            if (callback) callback.call(that, opt);
        };

        that.initFun = function () {
            var opt = that.opt;
            var location = opt.icon.location === undefined ? "" : opt.icon.location;
            _loadImage(location + "jBox/Jalert.png", "");
            _loadImage(location + "jBox/Jerror.png", "");
            _loadImage(location + "jBox/Jsuccess.png", "");
            _loadImage(location + "jBox/loading.gif", "");
        };

        that.initFun();


        that.alert = function (text, opts, css) {
            tipsFun(text, opts, null, null, 0, css, 1);
        };

        that.error = function (text, opts, css) {
            tipsFun(text, opts, "jBox/Jerror.png", null, 0, css, 1);
        };

        that.success = function (text, opts, css) {
            tipsFun(text, opts, "jBox/Jsuccess.png", null, 0, css, 1);
        };

        that.waring = function (text, opts, css) {
            tipsFun(text, opts, "jBox/Jalert.png", null, 0, css, 1);
        };

        that.loading = function (text, opts, callback, css) {
            tipsFun(text, opts, "jBox/loading.gif", callback, 0, css, 0);
        };

        that.confirm = function (text, opts, css) {
            tipsFun(text, opts, opts.icon.src, null, 1, css, 0);
        };

        that.btnAlert = function (text, opts, css) {
            tipsFun(text, opts, opts.icon.src, null, 1, css, 0);
        };

        that.prompt = function (text, opts, optCSS) {
            var opt = $.extend({}, that.opt, opts);
            var css = $.extend({}, defaultCSS, opt.css, optCSS);
            var location = opt.icon.location === undefined ? "" : opt.icon.location;
            var src = opt.icon.src ? location + opt.icon.src : "";
            if (opt.icon.src) {
                _loadImage(src, function () {
                    createHtml(opt, css, isHasTitle(opt), isPromptHtml(text, opt), null, 1, 0);
                });
            } else {
                createHtml(opt, css, isHasTitle(opt), isPromptHtml(text, opt), null, 1, 0);
            }
        };

        that.closeFun = function (callback) {
            closeDisk(callback);
        };

        /**
         * 调用提示框
         * @param text 提示文本
         * @param opts  参数
         * @param icon  小图标
         * @param callback  回调
         * @param type  类型  0-tips.1-confirm
         * @param optCSS
         *  @param close
         */
        var tipsFun = function (text, opts, icon, callback, type, optCSS, close) {
            var opt = $.extend({}, that.opt, opts);
            var css = $.extend({}, defaultCSS, opt.css, optCSS);
            var location = opt.icon.location === undefined ? "" : opt.icon.location;
            var src = icon ? opt.icon.src ? location + opt.icon.src : location + icon : null;
            var btnNum = opt.btn.text ? opt.btn.text.length : 0;
            if (icon) {
                _loadImage(src, function () {
                    if (type) {
                        createHtml(opt, css, isHasTitle(opt), isHasIcon(text, src), isHasBtn(opt, btnNum), type, close);
                    } else {
                        createHtml(opt, css, null, isHasIcon(text, src), null, type, close);
                        if (callback)callback.call(that, opt);
                    }
                });
            } else {
                if (type) {
                    createHtml(opt, css, isHasTitle(opt), isHasIcon(text, null), isHasBtn(opt, btnNum), type, close);
                } else {
                    createHtml(opt, css, null, isHasIcon(text, null), null, type, close);
                    if (callback)callback.call(that, opt);
                }
            }
        };
    };

    var _clear_setTimeout_ = 0;

    /**
     * 添加HTML到页面
     * @param opt
     * @param css
     * @param t
     * @param c
     * @param b
     * @param type
     * @param close
     */
    function createHtml(opt, css, t, c, b, type, close) {
        t = t ? t : "";
        c = c ? c : "";
        b = b ? b : "";
        var cls = type == 0 ? "j-disk-alert" : "j-disk-confirm";
        var html = '';
        if (_clear_setTimeout_) clearInterval(_clear_setTimeout_);

        html += '<div class="j-disk ' + cls + '" id="jDisk">';
        html += '   <div class="j-container animated ' + opt.box.animate + '">';
        html += t;
        html += '       <div class="j-content">' + c + b + '</div>';
        html += '   </div>';
        html += '</div>';
        $(document.body).append(html);

        opt.diskBar = $("#jDisk");
        opt.boxCont = $(".j-container");
        opt.boxTitle = $(".j-title");
        opt.boxText = $(".j-disk-text").find("span");
        opt.boxIcon = $(".j-disk-icon");
        opt.boxBtn = $(".j-btn");
        opt.jEnsure = $("#jEnsure");
        opt.jCancel = $("#jCancel");
        opt.promptEnsure = $("#jPromptEnsure");

        if (opt.isMove) {
            opt.boxTitle.on("mousedown", startMove);
        }

        var cWidth = opt.boxCont.width();

        if (css) {
            setEleCss(opt, css, opt.boxCont, cWidth, type);

            opt.boxIcon.css(css.iconCSS.length != 0 ? css.iconCSS : "");
            opt.boxText.css(css.textCSS.length != 0 ? css.textCSS : "");
            opt.boxTitle.css(css.titleCSS.length != 0 ? css.titleCSS : "");
            opt.jEnsure.css(css.btnCSS.jEnsure.length != 0 ? css.btnCSS.jEnsure : "");
            opt.jCancel.css(css.btnCSS.jCancel.length != 0 ? css.btnCSS.jCancel : "");
            opt.promptEnsure.css(css.btnCSS.jEnsure.length != 0 ? css.btnCSS.jEnsure : "");
        }
        opt.jEnsure.on("click", {"opt": opt}, ensureFun);
        opt.jCancel.on("click", {"opt": opt}, cancelFun);
        opt.promptEnsure.on("click", {"opt": opt}, jPromptEnsure);

        if (close) {
            _clear_setTimeout_ = setTimeout(function () {
                opt.diskBar.fadeOut(300, function () {
                    $(this).remove();
                });
            }, opt.time);
        }
    }

    /**
     * 是否包含小图标
     * @param text
     * @param icon
     * @returns {string}
     */
    function isHasIcon(text, icon) {
        var html = '';
        if (icon) {
            html += '<div class="j-disk-text j-disk-img">';
            html += '<i class="j-disk-icon"><img src="' + icon + '?a=' + new Date().getTime() + '"></i>';
            html += '<span>' + text + '</span>';
            html += '</div>';
        } else {
            html += '<div class="j-disk-text">';
            html += '<span>' + text + '</span>';
            html += '</div>';
        }
        return html;
    }

    /**
     * 是否包含title
     * @param opt
     * @returns {string}
     */
    function isHasTitle(opt) {
        if (opt.title)  return '<h2 class="j-title">' + opt.title + '</h2>';
        else return '<h2 class="j-title" style="height: 10px; padding-bottom: 0; border-bottom: 0 none;"></h2>';
    }

    /**
     * 是否包含按钮
     * @param opt
     * @param type
     * @returns {string}
     */
    function isHasBtn(opt, type) {
        var html = "";
        if (type == 1) {
            html += '<div class="j-btn j-btn-one clearfix">';
            html += '   <a class="j-ensure" id="jEnsure" href="javascript:;">' + opt.btn.text[0] + '</a>';
            html += '</div>';
        } else if (type == 2) {
            html += '<div class="j-btn j-btn-two clearfix">';
            html += '   <a class="j-ensure" id="jEnsure" href="javascript:;">' + opt.btn.text[0] + '</a>';
            html += '   <a class="j-cancel" id="jCancel" href="javascript:;">' + opt.btn.text[1] + '</a>';
            html += '</div>';
        }
        return html;
    }

    /**
     * prompt模式
     * @param text
     * @param opt
     * @returns {string}
     */
    function isPromptHtml(text, opt) {
        var html = "";
        html += '<div class="j-disk-prompt clearfix">';
        html += '   <label>' + text + '</label>';
        html += '   <span><input type="text" placeholder="请输入文本信息" value=""></span>';
        html += '   <a id="jPromptEnsure" href="javascript:;">' + opt.btn.text + '</a>';
        html += '</div>';
        return html;
    }

    /**
     * 设置标签样式
     * @param opt
     * @param css
     * @param ele
     * @param width
     * @param type
     */
    function setEleCss(opt, css, ele, width, type) {
        var w, h;

        if (!css.boxCSS.width) {
            if (width >= 270) {
                w = "270px";
            } else {
                if (type) {
                    w = "270px";
                } else {
                    w = Math.ceil(width + 1);
                }
            }
        } else {
            w = css.boxCSS.width;
        }

        var marginLeft = parseInt(w) / 2;

        ele.css("width", w);
        h = ele.height();
        var pos = opt.isFlow ? "fixed" : "absolute";
        if (opt.isVertical) {
            ele.css({
                "position": pos, "width": w, "height": h,
                "margin": "-" + h / 2 + "px 0 0 -" + marginLeft + "px"
            });
        } else {
            ele.css({
                "position": pos, "width": w, "height": h, "top": opt.top,
                "margin": "0 0 0 -" + marginLeft + "px"
            });
        }
    }

    /**
     * 加载图片
     * @param src
     * @param callback
     * @private
     */
    function _loadImage(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            if (callback) callback.call(img);
        };
        img.onerror = function () {
            console.log("图片加载错误，错误图片：" + img.src);
            if (callback) callback.call(img);
        }
    }

    function ensureFun(e) {
        var opt = e.data.opt;
        closeDisk(function () {
            if (opt.btn.jEnsure) opt.btn.jEnsure.call(this, opt);
        });
    }

    function cancelFun(e) {
        var opt = e.data.opt;
        closeDisk(function () {
            if (opt.btn.jCancel) opt.btn.jCancel.call(this, opt);
        });
    }

    function jPromptEnsure(e) {
        var opt = e.data.opt;
        var that = this;
        closeDisk(function () {
            if (opt.btn.jEnsure) opt.btn.jEnsure.call(that);
        });
    }

    function closeDisk(callback) {
        $("#jDisk").fadeOut(300, function () {
            $(this).remove();
            if (callback) callback.call(this);
        });
    }

    var saveData = {}, _isMoved_ = false;

    function startMove(e) {
        e = event || window.event;
        e.stopPropagation();
        e.preventDefault();
        saveData.startX = e.clientX || e.pageX;
        saveData.startY = e.clientY || e.pageY;
        saveData.top = parseFloat($(this).parents(".j-container").css("top"));
        saveData.left = parseFloat($(this).parents(".j-container").css("left"));
        if (!_isMoved_) {
            _isMoved_ = true;
            $(document).on("mousemove", moving);
            $(document).on("mouseup", endMove);
        }
    }

    function moving(e) {
        e = event || window.event;
        e.stopPropagation();
        e.preventDefault();
        var x = e.clientX || e.pageX;
        var y = e.clientY || e.pageY;
        if (_isMoved_) {
            var mx = x - saveData.startX + saveData.left;
            var my = y - saveData.startY + saveData.top;

            $(".j-container").css({
                "top": my + "px",
                "left": mx + "px"
            });
        }
    }

    function endMove() {
        _isMoved_ = false;
        $(document).off("mousemove", moving);
        $(document).off("mouseup", endMove);
    }

    $.extend({
        jBox: new diskBox()
    });
})
(jQuery);