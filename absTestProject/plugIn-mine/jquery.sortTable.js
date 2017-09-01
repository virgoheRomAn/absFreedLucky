/**
 * 列表排序
 * $(ele).sortList
 */
;
(function ($) {
    var sortListFun = function (element, options) {
        //默认参数
        var defaults =  {
            ele: ".sortElement",
            direct: "x",
            distance: 0.5,
            limit: [],
            placeholder: "sort-placeholder",

            onSuccessFun: null,
            onErrorFun: null,

            onStartFun: null,
            onMoveFun: null,
            onEndFun: null
        };

        //初始化
        var _thisFun = this;
        var _this = element, $this = $(element);
        var _curEle = "", _index = 0, _isMove = false, _isLimit = false;
        var startFun, moveFun, endFun, _isPhone = false;

        if (!!("ontouchstart" in window)) {
            startFun = "touchstart";
            moveFun = "touchmove";
            endFun = "touchend";
            _isPhone = true;
        } else {
            startFun = "mousedown";
            moveFun = "mousemove";
            endFun = "mouseup";
            _isPhone = false;
        }

        _thisFun.init = function () {
            _this.style.position = "relative";

            _thisFun.opt = $.extend(defaults, options || {});
            console.log(_thisFun.opt);
            _thisFun.initData = {};
            _thisFun.initData.domLength = $(_thisFun.opt.ele, $this).length;
            _thisFun.initData._move = false;

            $(document).on(startFun, _thisFun.opt.ele, mouseDownFun);
        };

        var mouseDownFun = function (event) {
            //console.log(event.originalEvent);
            event = window.event || event;
            //console.log(event);
            event.preventDefault();
            event.stopPropagation();
            _curEle = this;
            _index = $(this).index();

            if (Object.prototype.toString.call(_thisFun.opt.limit) == "[object Array]") {
                if (_thisFun.opt.limit.length != 0) {
                    _isLimit = true;
                    _thisFun.initData.limit = {
                        minTop: _thisFun.opt.limit[0],
                        minLeft: _thisFun.opt.limit[1],
                        maxTop: _thisFun.opt.limit[2],
                        maxLeft: _thisFun.opt.limit[3]
                    };
                } else {
                    _isLimit = false;
                }
            }

            _thisFun.initData.scrollTop = $(window).scrollTop();
            _thisFun.initData.scrollLeft = $(window).scrollLeft();
            if (_isPhone) {
                _thisFun.initData._startX = event.touches[0].clientX;
                _thisFun.initData._startY = event.touches[0].clientY;
            } else {
                _thisFun.initData._startX = event.clientX;
                _thisFun.initData._startY = event.clientY;
            }

            _thisFun.initData._startLeft = $(this).position().left;
            _thisFun.initData._startTop = $(this).position().top;
            _thisFun.initData._move = true;

            if (_thisFun.opt.onStartFun)_thisFun.opt.onStartFun.call(this, _index, _thisFun.initData._startX, _thisFun.initData._startY);

            addPlaceholder(this);
            $(this).css({
                position: "absolute",
                top: _thisFun.initData._startTop + "px",
                left: _thisFun.initData._startLeft + "px",
                zIndex: 1001,
                width: $(_curEle).width(),
                height: $(_curEle).height(),
                cursor: "move"
            });

            $(document).on(moveFun, mouseMoveFun);
            $(document).on(endFun, mouseUpFun);
        };

        var mouseMoveFun = function (event) {
            event = window.event || event;
            event.stopPropagation();
            event.preventDefault();
            var $placeholder = $("." + _thisFun.opt.placeholder);
            if (!_thisFun.initData._move) return false;
            var _mx, _my, _top, _left;

            if (_isPhone) {
                _mx = event.touches[0].clientX;
                _my = event.touches[0].clientY;
            } else {
                _mx = event.clientX;
                _my = event.clientY;
            }

            var _sT = $(window).scrollTop();
            var _sL = $(window).scrollLeft();

            var _sY = _sT != _thisFun.initData.scrollTop ? _sT - _thisFun.initData.scrollTop : 0;
            var _sX = _sL != _thisFun.initData.scrollLeft ? _sT - _thisFun.initData.scrollLeft : 0;

            if (_thisFun.opt.direct == "y") {
                _top = _my - _thisFun.initData._startY + _thisFun.initData._startTop + _sY;
                _left = _thisFun.initData._startLeft;
            } else if (_thisFun.opt.direct == "x") {
                _top = _thisFun.initData._startTop;
                _left = _mx - _thisFun.initData._startX + _thisFun.initData._startLeft + _sX;
            } else if (_thisFun.opt.direct == "all") {
                _top = _my - _thisFun.initData._startY + _thisFun.initData._startTop + _sY;
                _left = _mx - _thisFun.initData._startX + _thisFun.initData._startLeft + _sX;
            }

            if (_isLimit) {
                if (_top < _thisFun.initData.limit.minTop || _top > (_thisFun.initData.limit.maxTop - $(_curEle).height())) return false;
                if (_left < _thisFun.initData.limit.minLeft || _left > (_thisFun.initData.limit.maxLeft - $(_curEle).width())) return false;
            }
            $(_curEle).css({
                top: _top + "px",
                left: _left + "px"
            });

            // 选中块的中心坐标
            var _curX = _left + $(_curEle).width() * _thisFun.opt.distance;
            var _curY = _top + $(_curEle).height() * _thisFun.opt.distance;

            if (_thisFun.opt.onMoveFun)_thisFun.opt.onMoveFun.call(_curEle, _index, _top, _left);

            //var eleArray = Array.prototype.slice.call($(_thisFun.opt.ele), 0);
            $this.find(_thisFun.opt.ele).not($(_curEle)).not($placeholder).each(function () {
                var _eleArea = getElePosition(this);
                if (_eleArea.left < _curX && _curX < (_eleArea.left + _eleArea.width) && _eleArea.top < _curY && _curY < (_eleArea.top + _eleArea.height)) {
                    _isMove = true;
                    if (!$(this).next("." + _thisFun.opt.placeholder).length) {
                        $(this).after($placeholder);
                    } else {
                        $(this).before($placeholder);
                    }
                    if (_thisFun.opt.onSuccessFun)_thisFun.opt.onSuccessFun.call(_curEle);
                } else {
                    if (_thisFun.opt.onErrorFun)_thisFun.opt.onErrorFun.call(_curEle);
                }
            });
        };

        var mouseUpFun = function () {
            _thisFun.initData._move = false;
            var $placeholder = $("." + _thisFun.opt.placeholder);
            var _newIndex = $placeholder.index() - 1;
            if (!_isMove) {
                $placeholder.remove();
                $(_curEle).removeAttr("style");
            } else {
                $(_curEle).removeAttr("style").insertBefore($placeholder);
                $placeholder.remove();
            }
            if (_thisFun.opt.onEndFun)_thisFun.opt.onEndFun.call(_curEle, _index, _newIndex);
            $(document).off(moveFun, mouseMoveFun);
            $(document).off(endFun, mouseUpFun);
        };


        var cloneEle = function (ele) {
            if (!ele) return false;
            return $(ele).clone(false);
        };

        var addPlaceholder = function (ele) {
            var _ele = cloneEle(ele);
            _ele.empty().addClass(_thisFun.opt.placeholder);
            $(ele).after(_ele);
        };

        function getElePosition(ele) {
            return {
                top: ele.offsetTop,
                left: ele.offsetLeft,
                width: ele.offsetWidth,
                height: ele.offsetHeight
            };
        }

        _thisFun.init();
    };

    $.fn.sortList = function (opt) {
        return this.each(function () {
            if ($(this).data("sortList") == undefined || !$(this).data("sortList")) {
                var plugin = new sortListFun(this, opt);
                $(this).data("sortList", plugin);
            }
        });
    };
})(jQuery);