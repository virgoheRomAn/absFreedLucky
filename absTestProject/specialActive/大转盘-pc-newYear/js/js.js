;
(function ($) {
    var lottery = function (ele, option) {
        var defaults = {
            lotteryImg: {
                src: "img/lottery-turntable.png",
                w: 601,
                h: 601
            },
            location: "",
            occasion: 5,
            diskEle: "",
            allNum: "",
            productText: [],
            timer: "2016.11.01-2016.11.11",
            initFun: null,
            finishFun: null
        };

        var that = this;
        var element = ele;

        that.opt = $.extend({}, defaults, option);


        that.init = function () {
            var opt = that.opt;
            opt.bRotate = false;
            $(document).on("click", ".turntable-btn", lotteryFun);
            if (opt.initFun) opt.initFun.call(that, opt);
        };
        var rotateFun = function (item, cont) {
            var opt = that.opt;
            opt.bRotate = !opt.bRotate;
            var angles = item * (360 / opt.productText.length) - (360 / (opt.productText.length * 2));
            if (angles < 270) {
                angles = 270 - angles;
            } else {
                angles = 360 - angles + 270;
            }
            $(element).stopRotate();
            $(element).rotate({
                angle: 0,
                animateTo: angles + 1440,
                duration: 5000,
                bRotate: true,
                callback: function () {
                    opt.bRotate = !opt.bRotate;
                    if (opt.finishFun) opt.finishFun.call(that, opt.lotteryType);
                    appendHtml(cont);
                    var canvas = document.createElement("canvas");
                    if (canvas) {
                        if (item != 2 && item != 5) {
                            window.petardFun();
                        }
                        canvas.remove();
                    }
                }
            });
        };

        var lotteryFun = function () {
            $(document).off("click", ".turntable-btn", lotteryFun);
            var resultNum = 6;
            var num = randomNum(1, 100);
            //if (num == 100) {
            //    resultNum = 8;
            //} else if (num == 99 || num == 98) {
            //    resultNum = 3;
            //} else if (num == 97 || num == 96 || num == 95) {
            //    resultNum = 4;
            //} else if (num == 94 || num == 93 || num == 92 || num == 91 || num == 90) {
            //    resultNum = 6;
            //} else if (num < 90 && num >= 80) {
            //    resultNum = 1;
            //} else {
            //    resultNum = [2, 5][randomNum(0, 1)];
            //}
            if (num >= 50) {
                resultNum = [1, 3, 5, 6, 7, 8][randomNum(0, 5)];
            } else {
                resultNum = [2, 5][randomNum(0, 1)];
            }
            resultNum = 6;
            console.log(resultNum);
            var opt = that.opt;
            if (opt.bRotate) return false;
            if (!opt.occasion) {
                appendHtml(resultHtmlFun(1));
            } else {
                if (!opt.allNum) {
                    appendHtml(resultHtmlFun(0));
                } else {
                    opt.allNum--;
                    if (opt.occasion > 0) opt.occasion--;
                    $(".residue-num").text(opt.occasion);
                    if (resultNum == 2 || resultNum == 5) {
                        var resultAry = [2, 5];
                        rotateFun(resultAry[randomNum(0, 1)], resultHtmlFun(2));
                    } else {
                        rotateFun(resultNum, resultHtmlFun(3, opt.productText[resultNum - 1]));
                    }
                }
            }
        };

        var resultHtmlFun = function (type, nameObj) {
            var opt = that.opt;
            var html = $(opt.diskEle).html();
            var resultHtml = "";
            switch (type) {
                case 1: //奖券发完
                    resultHtml = html.replace("*%class%*", "disk-content" + (type + 1))
                        .replace("*%title%*", "亲，很遗憾~")
                        .replace("*%text%*", "您今天的抽奖机会已经用完啦！<br>现在下单还可以抽取免单机会哟!！")
                        .replace("*%img%*", "<img src='img/tips-img.png'>");
                    break;
                case 0: //机会用完
                    resultHtml = html.replace("*%class%*", "disk-content" + (type + 1))
                        .replace("*%title%*", "亲，很遗憾~")
                        .replace("*%text%*", "今天的优惠卷/现金券已经发放完了<br>明天早点来呦！")
                        .replace("*%img%*", "<img src='img/tips-img.png'>");
                    break;
                case 2: //中奖-再接再厉
                    opt.lotteryType = "none";
                    resultHtml = html.replace("*%class%*", "disk-content" + (type))
                        .replace("*%title%*", "亲，很遗憾~")
                        .replace("*%text%*", "运气好像不太好<br>再接再厉哟！")
                        .replace("*%img%*", "<img src='img/tips-img.png'>");
                    break;
                case 3: //中奖-中到奖品
                    var tips = "无门槛使用", types = "现金券";
                    opt.lotteryType = "现金券";
                    if (nameObj.text.indexOf("券") < 0) {
                        opt.lotteryType = "满减券";
                        nameObj.text = nameObj.text + "元满减券";
                        tips = nameObj.text.substr(0, nameObj.text.indexOf("减")) + "使用";
                        types = "满减券";
                    }
                    var imgStr = '\
                        <div class="img-bg">\
                            <label><i>' + nameObj.price + '</i>元<br>' + types + '</label>\
                            <span>感恩大回馈低于5折</span>\
                        </div>\
                        <p>优惠卷【' + tips + '】<br>全品类（特例商品除外）<br>使用时间：' + opt.timer + '</p>';
                    resultHtml = html.replace("*%class%*", "disk-content" + (type))
                        .replace("*%title%*", "")
                        .replace("*%text%*", "获得张<span>" + nameObj.price + "元</span>" + types + "！")
                        .replace("*%img%*", imgStr);
                    break;
            }
            return resultHtml;
        };

        var appendHtml = function (html) {
            var opt = that.opt;
            $(document.body).append(html);
            opt.diskBar = $(".disk-bar");
            var $btn = $(".disk-handle");
            $btn.on("click", closeFun);
        };

        var closeFun = function () {
            var opt = that.opt;
            //clearInterval(clearTimer);
            $(opt.diskBar).fadeOut(function () {
                $(this).remove();
                $(document).on("click", ".turntable-btn", lotteryFun);
            });
        };

        function randomNum(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        }

        that.init();
    };

    $.fn.lottery = function (option) {
        return this.each(function () {
            if ($(this).data("lottery") == undefined || !$(this).data("lottery")) {
                $(this).data("lottery", new lottery(this, option));
            }
        });
    }
})
(jQuery);
