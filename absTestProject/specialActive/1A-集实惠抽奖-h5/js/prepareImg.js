/**
 * 图片预加载
 * $.prepareImg
 */
;
(function ($) {
    var curNum = 0, isLoadNum = 0;
    var allNum = 0, IMG = {};
    var initData = {
        images: [],
        cache: true,
        delayTime: 1,
        container: null,
        onProgressFun: function () {
        },
        onAllLoaded: function () {
        },
        onErrorFun: function () {
        }
    };
    window.PrepareImg = function (options) {
        var opt = $.extend(initData, options || {});
        this.init = function () {
            allNum = opt.images.length;
            if (!opt.cache) {
                for (var i = 0; i < allNum; i++) {
                    opt.images[i].src += "?time=" + new Date().getTime();
                }
            }
            _loadImg(opt.images, curNum);
        };
        this.getImg = function (id) {
            if (!id) return false;
            var image = IMG[id];
            if (!image) return false;
            return image;
        };

        var _loadImg = function (imgs, index) {
            index = index || 0;
            var image = imgs[index];
            if (image && index !== allNum) {
                loadImg(image, function () {
                    isLoadNum++;
                    _loadImg(imgs, index + 1);
                    if (isLoadNum === allNum) {
                        opt.onAllLoaded(isLoadNum);
                    }
                });
            }
            opt.onProgressFun(image, isLoadNum, allNum);
        };

        var loadImg = function (img, callbcak) {
            var image = new Image();
            image.onload = function () {
                IMG[img.id] = image;
                setTimeout(function () {
                    callbcak.call(image);
                }, opt.delayTime);
            };
            image.onerror = function () {
                opt.onErrorFun(img, callbcak);
            };
            image.src = img.src;
        };
    };
})(jQuery);
