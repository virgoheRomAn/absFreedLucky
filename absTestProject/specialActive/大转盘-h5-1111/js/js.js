;
(function ($) {
    var lottery = function (ele, option) {
        var defaults = {
            w: 640,
            location: "",
            occasion: 5,
            diskEle: "",
            allNum: "",
            productText: [],
            productColor: ["#ffcb50", "#ffbf27", "#ffcb50", "#ffbf27", "#ffcb50", "#ffbf27", "#ffcb50", "#ffbf27", "#ffcb50", "#ffbf27"],
            timer: "2016.11.01-2016.11.11",
            initFun: null,
            finishFun: null
        };

        var that = this;
        var element = ele;
        var canvas = $(element).find("canvas").get(0);
        var btn = $(element).find("label");

        that.opt = $.extend({}, defaults, option);

        var images = [
            {"id": "awardsNone", "src": that.opt.location + "img/lottery-awards0.png"},  //哭脸
            {"id": "awardsCash", "src": that.opt.location + "img/lottery-awards1.png"},  //现金券
            {"id": "awardsCoupon", "src": that.opt.location + "img/lottery-awards2.png"},  //优惠券
            {"id": "winNone", "src": that.opt.location + "img/disk-img-text1.png"},
            {"id": "winThis", "src": that.opt.location + "img/disk-img-text2.png"},
            {"id": "winNo", "src": that.opt.location + "img/disk-img-text3.png"},
            {"id": "winNothing", "src": that.opt.location + "img/disk-img-text4.png"},
            {"id": "headBg", "src": that.opt.location + "img/lottery-bg1.jpg"},
            {"id": "gameBg", "src": that.opt.location + "img/lottery-bg2.jpg"},
            {"id": "textBg", "src": that.opt.location + "img/disk-img-textbg.png"},
            {"id": "btnBg", "src": that.opt.location + "img/disk-img-btnbg.png"},
            {"id": "gameRound", "src": that.opt.location + "img/lottery-game-background.png"},
            {"id": "gameBtn", "src": that.opt.location + "img/lottery-bth.png"},
            {"id": "two", "src": that.opt.location + "img/2.png"},
            {"id": "three", "src": that.opt.location + "img/3.png"},
            {"id": "five", "src": that.opt.location + "img/5.png"},
            {"id": "eight", "src": that.opt.location + "img/8.png"},
            {"id": "ten", "src": that.opt.location + "img/10.png"},
            {"id": "fifteen", "src": that.opt.location + "img/15.png"},
            {"id": "twenty", "src": that.opt.location + "img/20.png"}
        ];
        var loadImg = new prepareImg({
            cache: true,
            delayTime: 1,
            images: images,
            onProgressFun: function (images, curNum, allNum) {
                $(".loading-progress").html("加载进度：" + ~~(curNum / allNum * 100) + "%");
                if (curNum < allNum) {
                    return false;
                }
            },
            onAllLoaded: function () {
                $(".loading").hide();
                $("html,body").removeClass("overflow-hidden");
                that.init();
            },
            onErrorFun: function (images, callback) {
                console.log(images.src + "加载失败，请注意路径。");
                callback();
            }
        });
        loadImg.init();


        that.init = function () {
            var opt = that.opt;
            var W = 528, H = 528;
            var canvasW = 360, canvasH = 360;
            opt.bRotate = false;
            $(window).resize(function () {
                opt.window_w = $(this).width();
                opt.ratio = opt.window_w / defaults.w;
                canvas.width = canvasW;
                canvas.height = canvasH;
                canvas.style.width = canvasW * opt.ratio + "px";
                canvas.style.height = canvasH * opt.ratio + "px";
                canvas.style.marginLeft = -canvasW * opt.ratio / 2 + "px";
                canvas.style.marginTop = -canvasH * opt.ratio / 2 - 3 + "px";
                $(element).css({
                    "width": W * opt.ratio + "px",
                    "height": H * opt.ratio + "px",
                    "margin-left": -W * opt.ratio / 2 + "px"
                });

                btn.css({
                    "width": 137 * opt.ratio + "px",
                    "height": 160 * opt.ratio + "px",
                    "margin-left": -137 * opt.ratio / 2 + "px",
                    "margin-top": -160 * opt.ratio / 2 - 10 + "px"
                });
                if (!canvas) return false;
                drawFun(canvas, canvasW, canvasH);

                if (opt.initFun) opt.initFun.call(that, opt);
            }).trigger("resize");
            btn.on("click", lotteryFun);
        };

        var drawFun = function (canvas, w, h) {
            var opt = that.opt;
            var awardsNone = loadImg.getImg("awardsNone");
            var awardsCash = loadImg.getImg("awardsCash");
            var awardsCoupon = loadImg.getImg("awardsCoupon");

            var ctx = canvas.getContext("2d");
            var pro = opt.productText;
            var arc = Math.PI * 2 / pro.length;
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = "#ba3a13";

            for (var i = 0; i < opt.productText.length; i++) {
                var angle = i * arc;
                ctx.fillStyle = opt.productColor[i];
                ctx.beginPath();
                //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                ctx.arc(180, 180, 170, angle, angle + arc, false);
                ctx.arc(180, 180, 10, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save();

                //改变画布文字颜色
                ctx.fillStyle = "#c42303";
                ctx.font = 'normal 20px Microsoft YaHei';
                var text = opt.productText[i].text;

                ctx.translate(180 + Math.cos(angle + arc / 2) * 135, 180 + Math.sin(angle + arc / 2) * 135);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                if (i == 2 || i == 5 || i == 7) {
                    ctx.drawImage(awardsCoupon, -15, 10);
                } else if (i == 0 || i == 4) {
                    ctx.drawImage(awardsCash, -15, 15);
                } else {
                    ctx.drawImage(awardsNone, -22, 20);
                }
                ctx.restore();
            }
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
            $(canvas).stopRotate();
            $(canvas).rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 8000,
                bRotate: true,
                callback: function () {
                    opt.bRotate = !opt.bRotate;
                    if (opt.finishFun) opt.finishFun.call(that, opt.lotteryType);
                    appendHtml(cont);
                }
            });
        };

        var lotteryFun = function () {
            var resultNum = 1;
            var num = randomNum(1, 100);
            if (num == 100) {
                resultNum = 6;
            } else if (num == 99 || num == 98) {
                resultNum = 8;
            } else if (num == 97 || num == 96 || num == 95) {
                resultNum = 1;
            } else if (num == 94 || num == 93 || num == 92 || num == 91 || num == 90) {
                resultNum = 3;
            } else if (num < 90 && num >= 80) {
                resultNum = 5;
            } else {
                resultNum = [2, 4, 7][randomNum(0, 2)];
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
                    $(".lottery-number").find("i").text(opt.occasion);
                    if (resultNum == 2 || resultNum == 4 || resultNum == 7) {
                        var resultAry = [2, 4, 7];
                        rotateFun(resultAry[randomNum(0, 2)], resultHtmlFun(2));
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
                case 0: //奖券发完
                    resultHtml = html.replace("*%src%*", loadImg.getImg("winNone").src)
                        .replace("*%diskText%*", "亲，很遗憾~<br>今天的优惠券/现金券已经发放完了<br>明天早点来哟")
                        .replace("*%diskImg%*", "<label><img src='" + loadImg.getImg("awardsNone").src + "'></label>");
                    break;
                case 1: //机会用完
                    resultHtml = html.replace("*%src%*", loadImg.getImg("winNo").src)
                        .replace("*%diskText%*", "您今天的抽奖机会已经用完啦<br>现在下单还可以抽取免单机会哟")
                        .replace("*%diskImg%*", "<label><img src='" + loadImg.getImg("awardsNone").src + "'></label>");
                    break;
                case 2: //中奖-再接再厉
                    opt.lotteryType = "none";
                    resultHtml = html.replace("*%src%*", loadImg.getImg("winNothing").src)
                        .replace("*%diskText%*", "运气好像不太好<br>再接再厉哟")
                        .replace("*%diskImg%*", "<label><img src='" + loadImg.getImg("awardsNone").src + "'></label>");
                    break;
                case 3: //中奖-中到奖品
                    var tips = "无门槛使用", types = "现金券";
                    var str = "", imgSrc = "";
                    opt.lotteryType = "现金券";
                    if (nameObj.text.indexOf("券") < 0) {
                        opt.lotteryType = "满减券";
                        nameObj.text = nameObj.text + "元满减券";
                        tips = nameObj.text.substr(0, nameObj.text.indexOf("减")) + "使用";
                        types = "满减券";
                    }
                    switch (nameObj.price) {
                        case 2:
                            imgSrc = loadImg.getImg("two").src;
                            break;
                        case 3:
                            imgSrc = loadImg.getImg("three").src;
                            break;
                        case 5:
                            imgSrc = loadImg.getImg("five").src;
                            break;
                        case 8:
                            imgSrc = loadImg.getImg("eight").src;
                            break;
                        case 10:
                            imgSrc = loadImg.getImg("ten").src;
                            break;
                        case 15:
                            imgSrc = loadImg.getImg("fifteen").src;
                            break;
                        case 20:
                            imgSrc = loadImg.getImg("twenty").src;
                            break;
                    }
                    str += "<div class='lottery-ticket'>";
                    str += "<span class='price-symbol'>￥</span>";
                    str += "<label class='price-number'><img src='" + imgSrc + "'></label>";
                    str += "<div class='ticket-tips'><span>" + types + "</span><span>" + tips + "</span></div>";
                    str += "</div>";
                    resultHtml = html.replace("*%src%*", loadImg.getImg("winThis").src)
                        .replace("*%diskText%*", "恭喜您获得一张" + nameObj.text + "")
                        .replace("*%diskImg%*", str);
                    break;
            }
            return resultHtml;
        };

        var appendHtml = function (html) {
            var opt = that.opt;
            $(document.body).append(html);
            opt.diskBar = $(".disk-bar");
            var $disk = $(".disk-container"), $btn = $(".disk-handle");
            $btn.on("click", closeFun);
            $disk.css("margin-top", -$disk.height() / 2 + "px");
        };

        var closeFun = function () {
            var opt = that.opt;
            $(opt.diskBar).fadeOut(function () {
                $(this).remove();
            });
        };

        function randomNum(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        }
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
