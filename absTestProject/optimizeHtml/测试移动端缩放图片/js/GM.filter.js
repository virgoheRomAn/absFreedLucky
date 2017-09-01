/**
 * Graphic Image Filter
 * 图形处理滤镜插件
 *
 * @作者: 中恒玖联前端团队
 * @版权: 中恒玖联
 */

/**
 * 阵积卷
 *  滤镜类型有 ：
 *
 *  底片： negative
 *  灰色调： grayTone
 *  灰化： grayScale
 *  黑白化：blackWhite
 *  浮雕： relief
 *  雕刻： engrave
 *  镜子效果： mirror
 *  连环画效果： comicStrip
 *  熔铸效果： casting
 *  复古： retro
 *  红色蒙板效果： redMask
 *
 * 下面这两个方法是双参数 表示模糊程度 (1 ~ 10) 和 加亮/变暗 程度 (1 ~ 255)/(-1 ~ -255)
 *  blur： 模糊
 *  brightness： 加亮/变暗
 */

(function () {

    var GMF = {
        /**
         * 底片效果
         */
        negative: function (imageData) {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];

                data[i] = 255 - r;
                data[i + 1] = 255 - g;
                data[i + 2] = 255 - b;
            }

            return imageData;
        },

        /**
         * 灰色调
         */
        grayTone: function (imageData) {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                data[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
                data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                data[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
            }
            return imageData;
        },

        /**
         *  灰化
         */
        grayScale: function (imageData) {
            var data = imageData.data;
            for (var i = 0, n = data.length; i < n; i += 4) {
                var grayscale = data[i] * .3 + data[i + 1] * .59 + data[i + 2] * .11;
                data[i] = grayscale; // red
                data[i + 1] = grayscale; // green
                data[i + 2] = grayscale;  // blue
            }
            return imageData;
        },
        /**
         * 模糊效果
         */
        blur: function (imageData, num) {
            num = num || 1;
            num = num < 0 ? 1 : num > 10 ? 10 : num;
            for (var i = 0; i < num; i++) {
                var tempCanvasData = copyImageData(imageData);

                var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
                for (var x = 0; x < tempCanvasData.width; x++) {
                    for (var y = 0; y < tempCanvasData.height; y++) {

                        var idx = (x + y * tempCanvasData.width) * 4;
                        for (var subCol = -2; subCol <= 2; subCol++) {
                            var colOff = subCol + x;
                            if (colOff < 0 || colOff >= tempCanvasData.width) {
                                colOff = 0;
                            }
                            for (var subRow = -2; subRow <= 2; subRow++) {
                                var rowOff = subRow + y;
                                if (rowOff < 0 || rowOff >= tempCanvasData.height) {
                                    rowOff = 0;
                                }
                                var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
                                var r = tempCanvasData.data[idx2 + 0];
                                var g = tempCanvasData.data[idx2 + 1];
                                var b = tempCanvasData.data[idx2 + 2];
                                sumred += r;
                                sumgreen += g;
                                sumblue += b;
                            }
                        }

                        var nr = (sumred / 25.0);
                        var ng = (sumgreen / 25.0);
                        var nb = (sumblue / 25.0);

                        sumred = 0.0;
                        sumgreen = 0.0;
                        sumblue = 0.0;

                        imageData.data[idx + 0] = nr;
                        imageData.data[idx + 1] = ng;
                        imageData.data[idx + 2] = nb;
                        imageData.data[idx + 3] = 255;
                    }
                }
            }


            return imageData;
        },

        /**
         * 浮雕效果 凸出
         */
        relief: function (imageData) {
            var tempCanvasData = copyImageData(imageData);
            for (var x = 1; x < tempCanvasData.width - 1; x++) {
                for (var y = 1; y < tempCanvasData.height - 1; y++) {

                    var idx = (x + y * tempCanvasData.width) * 4;
                    var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                    var aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                    var nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
                    var ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
                    var nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
                    nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                    ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                    nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                    imageData.data[idx + 0] = nr;
                    imageData.data[idx + 1] = ng;
                    imageData.data[idx + 2] = nb;
                    imageData.data[idx + 3] = 255;
                }
            }

            return imageData;
        },

        /**
         *  雕刻效果 凹陷
         */
        engrave: function (imageData) {
            var tempCanvasData = copyImageData(imageData);
            for (var x = 1; x < tempCanvasData.width - 1; x++) {
                for (var y = 1; y < tempCanvasData.height - 1; y++) {

                    var idx = (x + y * tempCanvasData.width) * 4;
                    var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                    var aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                    var nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
                    var ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
                    var nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
                    nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                    ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                    nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                    imageData.data[idx + 0] = nr;
                    imageData.data[idx + 1] = ng;
                    imageData.data[idx + 2] = nb;
                    imageData.data[idx + 3] = 255;
                }
            }
            return imageData;
        },

        /**
         *  镜子效果
         */
        mirror: function (imageData) {
            var tempCanvasData = copyImageData(imageData);

            for (var x = 0; x < tempCanvasData.width; x++) {
                for (var y = 0; y < tempCanvasData.height; y++) {

                    var idx = (x + y * tempCanvasData.width) * 4;
                    var midx = (((tempCanvasData.width - 1) - x) + y * tempCanvasData.width) * 4;

                    imageData.data[midx + 0] = tempCanvasData.data[idx + 0];
                    imageData.data[midx + 1] = tempCanvasData.data[idx + 1];
                    imageData.data[midx + 2] = tempCanvasData.data[idx + 2];
                    imageData.data[midx + 3] = 255;
                }
            }

            return imageData;
        },
        /**
         * 连环画效果
         */
        comicStrip: function (imageData) {
            //R = |g – b + g + r| * r / 256
            //G = |b – g + b + r| * r / 256;
            //B = |b – g + b + r | * g / 256;
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                data[i] = Math.abs(g - b + g + r) * r / 256;
                data[i + 1] = Math.abs(b - g + b + r) * r / 256;
                data[i + 2] = Math.abs(b - g + b + r) * g / 256;
            }
            return imageData;
        },

        /**
         * 黑白化， 二值化
         */
        blackWhite: function (imageData) {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var avg = (r + g + b) / 3;
                var value = (avg >= 100) ? 255 : 0;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
            }
            return imageData;
        },

        /**
         * 熔铸效果
         */
        casting: function (imageData) {
            //r = r*128/(g+b +1);
            //g = g*128/(r+b +1);
            //b = b*128/(g+r +1);
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];

                data[i] = r * 128 / (g + b + 1);
                data[i + 1] = g * 128 / (r + b + 1);
                data[i + 2] = b * 128 / (g + r + 1);
            }
            return imageData;
        },

        /**
         * 复古效果
         * @param imageData
         */
        retro: function (imageData) {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];

                data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
            }
            return imageData;
        },

        /**
         * 红色蒙板效果
         * @param imageData
         */
        redMask: function (imageData) {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];

                data[i] = (r + g + b) / 3;        // 红色通道取平均值
                data[i + 1] = data[i + 2] = 0; // 绿色通道和蓝色通道都设为0
            }
            return imageData;
        },

        /**
         * 加亮 或者 变暗
         * @param imageData
         * @param delta 正值 与 负值
         * @returns {*}
         */
        brightness: function (imageData, delta) {

            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                data[i] += delta;
                data[i + 1] += delta;
                data[i + 2] += delta;
            }
            return imageData;

        }
    };

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var copyImageData = function (imageData) {
        var dst = ctx.createImageData(imageData.width, imageData.height);
        if (dst.data.set) {
            dst.data.set(imageData.data);
        } else {
            var data = imageData.data;
            for (var i = 0, l = data.length; i < l; i += 4) {
                dst.data[i] = data[i];
                dst.data[i + 1] = data[i + 1];
                dst.data[i + 2] = data[i + 2];
                dst.data[i + 3] = data[i + 3];
            }
        }
        return dst;
    };

    window.GMF = GMF;
})();
