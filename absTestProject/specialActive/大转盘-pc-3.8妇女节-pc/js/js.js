;
(function ($) {
    var lottery = function (ele, option) {
        var defaults = {
            lotteryImg: {
                src: "img/lottery-turntable1-3.8.png",
                w: 601,
                h: 601
            },
            location: "",
            occasion: 5,
            diskEle: "",
            allNum: "",
            productText: [],
            timer: "2017.02.23-2017.03.08",
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
                    var imgtxt='<img src="img/tips-img.png" alt=""/>'+
                        '<div class="text-prompt">今天的抽奖优惠劵领完啦 <br/> 明天在来呦！</div>';
                    resultHtml = html.replace("*%class%*", "disk-container2")
                        .replace("*%text%*", "亲，很遗憾~")
                        .replace("*%img%*", imgtxt);
                    break;
                case 0: //机会用完
                    var imgtxt1='<img src="img/tips-img.png" alt=""/>'+
                        '<div class="text-prompt">今天的抽奖机会已经用完啦！<br/> 现在下单还可以抽奖哟！</div>';
                    resultHtml = html.replace("*%class%*", "disk-container2")
                        .replace("*%text%*", "亲，很遗憾~")
                        .replace("*%img%*", imgtxt1);
                    break;
                case 2: //中奖-再接再厉
                    var imgtxt2='<img src="img/tips-img.png" alt=""/>'+
                        '<div class="text-prompt">运气好像不太好<br>再接再厉哟！</div>';
                    opt.lotteryType = "none";
                    resultHtml = html.replace("*%class%*", "disk-container")
                        .replace("*%text%*", "亲，很遗憾~")
                        .replace("*%img%*", imgtxt2);
                    break;
                case 3: //中奖-中到奖品
                    var imgStr = '<div class="img-bg">\
                        <label><i> '+nameObj.price+'</i>元<br>现金券</label></div>\
                         <p>全品类（特例商品除外）<br>使用时间：'+opt.timer+'</p>';
                    resultHtml = html.replace("*%class%*", "disk-container")
                        .replace("*%text%*", "中奖啦<br/>获得张"+nameObj.price+"元现金券")
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
            var $clsBtn=$(".divClose .spclose");
            $btn.on("click", closeFun);
            $clsBtn.on("click",closeFun);
        };

        var closeFun = function () {
            var opt = that.opt;
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
