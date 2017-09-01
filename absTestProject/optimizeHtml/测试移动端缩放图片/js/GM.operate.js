/**
 * Graphic Image Operate
 * 图形处理操作插件
 *
 * @作者: 中恒玖联前端团队
 * @版权: 中恒玖联
 */


/**
 * 图形处理操作面板
 * @param $dom
 * @param options
 * @returns {boolean}
 * @constructor
 */
function GMP($dom, options) {
    if (!$dom || !$dom.length) return false;
    options = options || {};
    var self = this;
    self.$dom = $dom;
    self.dom = $dom[0];

    self._width = options.width || $dom.width(); //显示的宽
    self._height = options.height || $dom.height(); //显示的高

    self.minScale = options.minScale || 0.3; //最小缩放倍数 (如果不允许超屏会重新计算缩小值)
    self.maxScale = options.maxScale || 3; //最大缩放倍数

    self.allowBeyondScreen = options.allowBeyondScreen || false; //是否允许超出屏幕
    self.openEvent = options.openEvent === undefined ? true : options.openEvent; //是否开启事件支持
    self.openDrag = options.openDrag === undefined ? true : options.openDrag; //在开启事件支持的情况下是否开启拖拽的支持
    self.openPinch = options.openPinch === undefined ? true : options.openPinch; //在开启事件支持的情况下是否开启缩放的支持
    self.openRotate = options.openRotate || false; //在开启事件支持的情况下是否开启旋转的支持， 开启旋转支持的话是会强制超出屏幕
    if (self.openRotate) self.allowBeyondScreen = true; //如果开启旋转会强制允许超出屏幕

    self.gmo = null; //当前选中的gmo

    //禁用浏览器默认事件
    touch.on(self.dom, 'touchmove', function (ev) {
        ev.preventDefault();
    });

    //选择切换操作元素
    touch.on(self.dom, 'tap', function (ev) {
        var target = ev.target;
        var _target = $(target);
        var nn = target.nodeName.toString().toUpperCase();
        var _selectObj;
        if (nn == "IMG") {
            _selectObj = _target.parent()
        } else {
            if (_target.hasClass("gm-image-item")) {
                _selectObj = _target;
            } else {
                return true;
            }
        }
        self.gmo = _selectObj.data("gm-gmo");
        self.$dom.find(".gmo-image-select").removeClass("gmo-image-select");
        _selectObj.addClass("gmo-image-select");
    });

    //拖拽
    touch.on(self.dom, 'dragstart', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openDrag) return false;
        self.gmo.__isDrag__ = true;
        self.gmo.__dragX__ = self.gmo._currX;
        self.gmo.__dragY__ = self.gmo._currY;
    });

    touch.on(self.dom, 'drag', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openDrag) return false;
        if (!self.gmo.__isDrag__) return false;
        self.gmo.move(self.gmo.__dragX__ + ev.x, self.gmo.__dragY__ + ev.y);
    });

    touch.on(self.dom, 'dragend', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openDrag) return false;
        self.gmo.__dragX__ += ev.x;
        self.gmo.__dragY__ += ev.y;
        self.gmo.__isDrag__ = false;
    });

    //缩小放大
    touch.on(self.dom, 'pinchstart', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openPinch) return false;
        self.gmo.__isPinch__ = true;
        var touches = ev.originEvent.touches;

        var t1x = touches[0].pageX;
        var t1y = touches[0].pageY;

        var t2x = touches[1].pageX;
        var t2y = touches[1].pageY;

        var minX = Math.min(t1x, t2x);
        var minY = Math.min(t1y, t2y);
        var xc = Math.max(t1x, t2x) - minX;
        var yc = Math.max(t1y, t2y) - minY;

        self.gmo.__cpx__ = minX + xc / 2;
        self.gmo.__cpy__ = minY + yc / 2;

        self.gmo.__offset__ = self.$dom.offset();
    });

    touch.on(self.dom, 'pinch', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openPinch) return false;
        if (self.gmo.__isPinch__) {
            var x = self.gmo.__cpx__ - self.gmo.__offset__.left;
            var y = self.gmo.__cpy__ - self.gmo.__offset__.top;
            self.gmo.scaleTo(self.gmo.__scale_temp__ + (ev.scale - 1), x, y, false);
        }
    });

    touch.on(self.dom, 'pinchend', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openPinch) return false;
        self.gmo.__scale_temp__ = self.gmo._scale;
        if (!self.gmo.allowBeyondScreen) self.gmo.reviseImagePos();
        self.gmo.__isPinch__ = false;
    });

    //旋转
    touch.on(self.dom, 'rotate', function (ev) {
        if (!self.gmo || !self.gmo.openEvent || !self.gmo.openRotate) return false;
        self.gmo.rotate(self.gmo._angle + ev.rotation);
        if (ev.fingerStatus === 'end')
            self.gmo._angle = self.gmo._angle + ev.rotation;
    });

    //双击还原
    touch.on(self.dom, 'doubletap', function (ev) {
        if (!self.gmo || !self.gmo.openEvent) return false;
        self.gmo.reset();
    });

    /**
     * 完成 导出图片
     */
    self.complete = function (opts) {
        opts = opts || {};
        var w = opts.w || 480;
        var backgroundColor = opts.backgroundColor || "#000000";
        var quality = opts.quality || 0.8; //导出图片的质量
        var filter = opts.filter || undefined;

        var ratio = w / self._width;
        var h = ratio * self._height;

        var canvasTemp = document.createElement("canvas");
        var ctxTemp = canvasTemp.getContext("2d");

        canvasTemp.height = h;
        canvasTemp.width = w;
        ctxTemp.fillStyle = backgroundColor;
        ctxTemp.fillRect(0, 0, w, h);
        ctxTemp.fill();

        var _sortArr = []; //排序的数组
        var gm_image_items = self.$dom.find(".gm-image-item");

        gm_image_items.each(function () {
            var _this = $(this);
            _sortArr.push({zIndex: parseInt(_this.css("z-index"), 10), obj: _this});
        });

        _sortArr = bubbleSort(_sortArr);

        for (var i = 0, l = _sortArr.length; i < l; i++) {
            var _this = _sortArr[i].obj;
            var _gmo = _this.data("gm-gmo");
            ctxTemp.save();

            var cx = (_gmo._currX + _gmo._curr_width / 2) * ratio;
            var cy = (_gmo._currY + _gmo._curr_height / 2) * ratio;
            ctxTemp.translate(cx, cy);
            ctxTemp.rotate(Math.PI / 180 * _gmo._rotate);
            ctxTemp.translate(cx * -1, cy * -1);
            ctxTemp.drawImage(_gmo.image, 0, 0, _gmo._reality_width, _gmo._reality_height,
                _gmo._currX * ratio, _gmo._currY * ratio,
                _gmo._curr_width * ratio, _gmo._curr_height * ratio);
            ctxTemp.restore();
        }

        //判断是否需要滤镜
        if (window.GMF && filter && filter.length != 0) {
            var filterFun = GMF[filter[0]];
            if (filterFun) {
                var imageData = ctxTemp.getImageData(0, 0, w, h);
                imageData = filterFun(imageData, filter[1]);
                ctxTemp.putImageData(imageData, 0, 0);
            }
        }

        /**
         * 生成base64
         * 兼容修复移动设备需要引入mobileBUGFix.js
         */
        var base64 = canvasTemp.toDataURL('image/jpeg', quality);
        // 修复IOS
        if (navigator.userAgent.match(/iphone/i) && MegaPixImage) {

            var mpImg = new MegaPixImage(base64);
            mpImg.render(canvasTemp, {
                maxWidth: w,
                maxHeight: h,
                quality: quality
            });

            base64 = canvasTemp.toDataURL('image/jpeg', quality);
        } else if (navigator.userAgent.match(/Android/i) && JPEGEncoder) {
            // 修复Android
            var encoder = new JPEGEncoder();
            base64 = encoder.encode(ctxTemp.getImageData(0, 0, w, h), quality * 100);
        }
        ctxTemp = null;
        canvasTemp = null;
        // 生成结果
        return {
            base64: base64,
            clearBase64: base64.substr(base64.indexOf(',') + 1)
        };
    };

    /**
     * 清除整个操作面板
     */
    self.empty = function () {
        self.$dom.find(".gm-image-item").each(function () {
            var _this = $(this);
            var _gmo = _this.data("gm-gmo");
            _gmo.remove();
            _this.remove();
        });
        self.elem = null;
    };

    /**
     * 重置整个操作面板
     */
    self.reset = function () {
        self.$dom.find(".gm-image-item").each(function () {
            var _this = $(this);
            var _gmo = _this.data("gm-gmo");
            _gmo.reset();
        });
    };

    /**
     * 冒泡排序
     */
    var bubbleSort = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i; j < arr.length; j++) {
                if (arr[i].zIndex > arr[j].zIndex) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    };
}

/**
 * 操作图片对象
 * @param gmp 操作面板对象
 * @param result 图片
 * @param options 参数
 * @constructor
 */
var GMO = function (gmp, result, options) {
    if (!gmp) return false;
    options = options || {};
    var self = this;
    self._width = gmp._width;
    self._height = gmp._height;

    //元素单独样式定义
    self.zIndex = options.zIndex || 50; //元素 z-index 层叠位置
    self.minScale = options.minScale || gmp.minScale; //最小缩放倍数 (如果不允许超屏会重新计算缩小值)
    self.maxScale = options.maxScale || gmp.maxScale; //最大缩放倍数

    self.allowBeyondScreen = options.allowBeyondScreen || gmp.allowBeyondScreen; //是否允许超出屏幕
    self.openEvent = options.openEvent === undefined ? gmp.openEvent : options.openEvent; //是否开启事件支持
    self.openDrag = options.openDrag === undefined ? gmp.openDrag : options.openDrag; //在开启事件支持的情况下是否开启拖拽的支持
    self.openPinch = options.openPinch === undefined ? gmp.openPinch : options.openPinch; //在开启事件支持的情况下是否开启缩放的支持
    self.openRotate = options.openRotate === undefined ? gmp.openRotate : options.openRotate; //在开启事件支持的情况下是否开启旋转的支持， 开启旋转支持的话是会强制超出屏幕
    if (self.openRotate) self.allowBeyondScreen = true;

    self.initScaleType = options.initScaleType || 0; // 初始化缩放类型 0表示 自动缩放到和窗口一样大小， 1表示如果比窗口大就使用0如果比窗口小就原始大小

    //事件
    self.loadComplete = options.loadComplete || null; //图片载入完成后的回调

    self._currX = 0; //当前图片的X轴坐标
    self._currY = 0; //当前图片的Y轴坐标
    self._scale = 1; //当前图片的缩放值
    self._rotate = 0; //当前图片的旋转度数
    self._originX = "center"; //当前图片旋转中心的X轴坐标
    self._originY = "center"; //当前图片旋转中心的Y轴坐标
    self._angle = 0;
    //拖拽
    self.__dragX__ = 0;
    self.__dragY__ = 0;
    self.__isDrag__ = false;
    //缩放
    self.__cpx__ = 0;
    self.__cpy__ = 0;
    self.__offset__ = 0;
    self.__isPinch__ = false;
    self.__scale_temp__ = 1;

    var imgSrc = "";

    if (result instanceof HTMLElement) {
        imgSrc = result.src;
    } else if (typeof(result) === "string") {
        imgSrc = result;
    } else {
        imgSrc = result.base64;
        self._original_width = result.image.width;
        self._original_height = result.image.height;
    }

    var img = new Image();
    img.onload = function () {
        self.image = img;
        self.$image = $(img);
        self.$item = $('<div class="gm-image-item" style="z-index: ' + self.zIndex + '"></div>').append(img);
        self.$item.data("gm-gmo", self);
        gmp.gmo = self;
        gmp.$dom.find(".gmo-image-select").removeClass("gmo-image-select");
        self.$item.addClass("gmo-image-select");
        self._reality_width = img.width; //原始的宽
        self._reality_height = img.height;//原始的高
        (!self._original_width) && (self._original_width = self._reality_width); //最原始的宽
        (!self._original_height) && (self._original_height = self._reality_height);

        gmp.$dom.append(self.$item);

        if (!self.allowBeyondScreen) self.minScale = 1;

        self.initImageWHPos();

        self.loadComplete && (self.loadComplete.call(self));
    };
    img.src = imgSrc;

    /**
     * 移动图片
     * @param x 移动到的X轴坐标
     * @param y 移动到的Y轴坐标
     */
    self.move = function (x, y) {
        var self = GMO.elem || this;
        self._currX = x;
        self._currY = y;

        //self._originX = (self._currX * -1 + self._width / 2) + "px";
        //self._originY = (self._currY * -1 + self._height / 2) + "px";

        if (!self.allowBeyondScreen) self.reviseImagePos();
        else self.$item.css({left: self._currX, top: self._currY});
    };

    /**
     * 放大缩小图片
     * @param scale 缩放值
     * @param x 缩放中心X轴坐标 默认图片中心
     * @param y 缩放中心Y轴坐标 默认图片中心
     */
    self.scale = function (scale, x, y) {
        var self = this;
        if (x === undefined) x = self._curr_width / 2;
        if (y === undefined) y = self._curr_height / 2;
        self.scaleTo(scale, x, y, true);
    };

    /**
     * 旋转图片
     * @param rotate 旋转角度
     */
    self.rotate = function (rotate) {
        var self = this;
        if (!self.openRotate) return false;
        self._rotate = rotate;
        self.addTransformToImage();
    };

    /**
     * 重置图片
     */
    self.reset = function () {
        var self = this;
        self._currX = 0; //当前图片的X轴坐标
        self._currY = 0; //当前图片的Y轴坐标
        self._scale = 1; //当前图片的缩放值
        self._rotate = 0; //当前图片的旋转度数
        self._originX = "center"; //当前图片旋转中心的X轴坐标
        self._originY = "center"; //当前图片旋转中心的Y轴坐标
        self._angle = 0;
        self.__scale_temp__ = 1;
        self.addTransformToImage();
        self.initImageWHPos();
    };

    /**
     * 删除
     */
    self.remove = function () {
        var self = this;
        self.$item.data("gm-gmo", null);
        self.$item.remove();
        self = null;
        gmp.gmo = null;
    };

    self.scaleTo = function (scale, x, y, type) {
        var self = this;
        var ratio = scale;
        ratio = ratio < self.minScale ? self.minScale : (ratio > self.maxScale ? self.maxScale : ratio);
        self._currX = self._currX - (x - self._currX) * (ratio - self._scale) / (self._scale);
        self._currY = self._currY - (y - self._currY) * (ratio - self._scale) / (self._scale);

        self._scale = ratio;

        self._curr_width = self._image_width * ratio;
        self._curr_height = self._image_height * ratio;

        self.$item.css({
            left: self._currX,
            top: self._currY,
            width: self._curr_width,
            height: self._curr_height
        });

        if (type && !self.allowBeyondScreen)  self.reviseImagePos();
    };

    self.addTransformToImage = function () {
        var self = this;
        var rotate = self._rotate;
        var originX = self._originX;
        var originY = self._originY;

        self.$item.css({
            "transform": "rotate(" + rotate + "deg)",
            "-webkit-transform": "rotate(" + rotate + "deg)",
            "transform-origin": originX + " " + originY + "",
            "-webkit-transform-origin": originX + " " + originY + ""
        });
    };

    //初始化图片的宽高和位置
    self.initImageWHPos = function () {
        var self = this;
        var ratioA = 0;
        if (self.initScaleType != 0 && self._original_width < self._width && self._original_width < self._height) {
            ratioA = 1;
            self.$item.css({width: self._original_width * ratioA, height: self._original_width * ratioA});
        } else {
            ratioA = self._width / self._reality_width;
            var ratioB = self._height / self._reality_height;
            if (ratioA < ratioB) ratioA = ratioB;
            self.$item.css({width: self._reality_width * ratioA, height: self._reality_height * ratioA});
        }


        //当前图片的宽           缩放后第一次图片的宽
        self._curr_width = self._image_width = self.$item.outerWidth();
        //当前图片的高           缩放后第一次图片的高
        self._curr_height = self._image_height = self.$item.outerHeight();

        var ofx = (self._width - self._curr_width) / 2;
        var ofy = (self._height - self._curr_height) / 2;

        self.$item.css({top: ofy, left: ofx});

        self._currX = ofx;
        self._currY = ofy;

        self._oneX = ofx;
        self._oneY = ofy;
    };

    self.reviseImagePos = function () {
        var self = this;
        if (self.allowBeyondScreen) return;

        //真实的图片宽高
        var minX = Math.round(self._width - self._curr_width);
        var minY = Math.round(self._height - self._curr_height);


        var x = self._currX;
        var y = self._currY;

        if (minX > 0)  self._currX = x > minX ? minX : x < 0 ? 0 : x;
        else  self._currX = x > 0 ? 0 : x < minX ? minX : x;

        if (minY > 0)  self._currY = y > minY ? minY : y < 0 ? 0 : y;
        else  self._currY = y > 0 ? 0 : y < minY ? minY : y;


        self.$item.css({left: self._currX, top: self._currY});
    }
};
