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
            productColor: ["#ffdeb6", "#fdf7e1", "#ffdeb6", "#fdf7e1", "#ffdeb6", "#fdf7e1", "#ffdeb6", "#fdf7e1", "#ffdeb6", "#fdf7e1"],
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
            {"id": "defeated1", "src": that.opt.location + "img/defeated1.png"},  //再接再厉
            {"id": "defeated2", "src": that.opt.location + "img/defeated2.png"},  // 发放完毕-没有机会了
            {"id": "succeed1", "src": that.opt.location + "img/succeed1.png"},  // 中奖
            {"id": "awardsNone", "src": that.opt.location + "img/lottery-awards0.png"},  //哭脸
            {"id": "awardsCash", "src": that.opt.location + "img/lottery-awards1.png"},  //现金券
            {"id": "awardsCoupon", "src": that.opt.location + "img/lottery-awards2.png"},  //优惠券
            {"id": "btnBg", "src": that.opt.location + "img/disk-btnBg.png"},   //确定按钮背景
            {"id": "gameRound", "src": that.opt.location + "img/lottery-game-background.png"},  //转盘背景
            {"id": "gameBtn", "src": that.opt.location + "img/lottery-bth.png"}     //转盘按钮
        ];
        var loadImg = new PrepareImg({
            cache: false,
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
            var W = 566, H = 566;
            var canvasW = 566, canvasH = 566;
            opt.bRotate = false;
            $(window).resize(function () {
                opt.window_w = $(this).width();
                opt.ratio = opt.window_w / defaults.w;
                canvas.width = canvasW;
                canvas.height = canvasH;
                canvas.style.width = canvasW * opt.ratio + "px";
                canvas.style.height = canvasH * opt.ratio + "px";
                canvas.style.marginLeft = -canvasW * opt.ratio / 2 + "px";
                canvas.style.marginTop = -canvasH * opt.ratio / 2 + "px";
                $(element).css({
                    "width": W * opt.ratio + "px",
                    "height": H * opt.ratio + "px",
                    "margin-left": -W * opt.ratio / 2 + "px"
                });

                btn.css({
                    "width": 155 * opt.ratio + "px",
                    "height": 181 * opt.ratio + "px",
                    "margin-left": -155 * opt.ratio / 2 + "px",
                    "margin-top": -181 * opt.ratio / 2 - 6 + "px"
                });

                if (!canvas || !canvas.getContext) {
                    return false;
                } else {
                    drawFun(canvas, canvasW, canvasH);
                }
            }).trigger("resize");

            if (!canvas || !canvas.getContext) {
                $.jBox.btnAlert("非常抱歉，您的浏览器不支持canvas！<br>请您更换浏览器浏览本页，谢谢！", ["确定"], {
                    w: 280,
                    onEnsureFun: function () {
                        if (opt.initFun) opt.initFun.call(that, opt);
                    }
                }, "jError1.png");
                return false;
            } else {
                if (opt.initFun) opt.initFun.call(that, opt);
            }
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
            ctx.save();
            ctx.translate(43, 43);
            for (var i = 0; i < opt.productText.length; i++) {
                //绘制外部扇形
                var angle = i * arc;
                ctx.beginPath();
                ctx.arc(240, 240, 240, angle, angle + arc, false);
                ctx.arc(240, 240, 40, angle + arc, angle, true);
                ctx.closePath();
                ctx.fillStyle = opt.productColor[i];
                ctx.fill();

                //绘制内部圆形
                ctx.beginPath();
                ctx.arc(240, 240, 180, angle, angle + arc, false);
                ctx.arc(240, 240, 40, angle + arc, angle, true);
                ctx.closePath();
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.save();

                //改变画布方向
                ctx.translate(240 + Math.cos(angle + arc / 2) * 190, 240 + Math.sin(angle + arc / 2) * 190);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                //绘制文本
                var text = opt.productText[i].text;
                ctx.fillStyle = "#303030";
                ctx.font = 'normal 20px Microsoft YaHei';
                ctx.fillText(text, -ctx.measureText(text).width / 2, -10);

                //绘制奖品
                if (i == 1 || i == 6) {
                    ctx.drawImage(awardsNone, -44, 18);
                } else {
                    ctx.drawImage(awardsCash, -21, 30);
                }
                ctx.restore();
            }
            ctx.save();
            //绘制分割线
            ctx.globalCompositeOperation = 'destination-out';
            drawLine(0, 240, 480, 240);
            drawLine(240, 0, 240, 480);
            drawLine(0, 0, 480, 480);
            drawLine(480, 0, 0, 480);
            //绘制外部小圆点（浅色半圆）
            drawCircle(240, 0, 10, "#000");
            drawCircle(410, 70, 10, "#000");
            drawCircle(480, 240, 10, "#000");
            drawCircle(410, 410, 10, "#000");
            drawCircle(240, 480, 10, "#000");
            drawCircle(70, 410, 10, "#000");
            drawCircle(0, 240, 10, "#000");
            drawCircle(70, 70, 10, "#000");
            ctx.restore();
            //绘制外部小圆点（白色全圆）
            drawCircle(240, -11, 9, "#FFFFFF");
            drawCircle(418, 62, 9, "#FFFFFF");
            drawCircle(491, 240, 9, "#FFFFFF");
            drawCircle(418, 418, 9, "#FFFFFF");
            drawCircle(240, 491, 9, "#FFFFFF");
            drawCircle(59, 418, 9, "#FFFFFF");
            drawCircle(-11, 240, 9, "#FFFFFF");
            drawCircle(59, 62, 9, "#FFFFFF");

            /**
             * 绘制线
             * @param a 触笔移动到X坐标
             * @param b 触笔移动到Y坐标
             * @param c 触笔绘制到X坐标
             * @param d 触笔绘制到X坐标
             */
            function drawLine(a, b, c, d) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(a, b);
                ctx.lineTo(c, d);
                ctx.closePath();
                ctx.strokeStyle = "#f5b460";
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.restore();
            }

            /**
             * 绘制小圆点
             * @param x 起点X坐标
             * @param y 起点Y坐标
             * @param r 圆半径
             * @param color 填充颜色
             */
            function drawCircle(x, y, r, color) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
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
                resultNum = [2, 7][randomNum(0, 1)];
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
                    if (resultNum == 2 || resultNum == 7) {
                        var resultAry = [2, 7];
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
                case 0: //奖券发完
                    resultHtml = html.replace("*%titleCls%*", "disk-none")
                        .replace("*%diskText%*", "现金券已经发完了<br>明天早点来哦~")
                        .replace("*%diskImg%*", "<label><img style='width: 80px;' src='" + loadImg.getImg("defeated2").src + "'></label>");
                    break;
                case 1: //机会用完
                    resultHtml = html.replace("*%titleCls%*", "disk-none")
                        .replace("*%diskText%*", "您的抽奖机会已用完<br>再接再厉哦~")
                        .replace("*%diskImg%*", "<label><img style='width: 80px;' src='" + loadImg.getImg("defeated2").src + "'></label>");
                    break;
                case 2: //中奖-再接再厉
                    opt.lotteryType = "none";
                    resultHtml = html.replace("*%titleCls%*", "disk-none")
                        .replace("*%diskText%*", "运气好像不太好<br>再接再厉哦~")
                        .replace("*%diskImg%*", "<label><img style='width: 156px;' src='" + loadImg.getImg("defeated1").src + "'></label>");
                    break;
                case 3: //中奖-中到奖品
                    var str = "", text = "";
                    opt.lotteryType = "现金券";
                    text = nameObj.text;
                    if (nameObj.text.indexOf("券") < 0) {
                        opt.lotteryType = "满减券";
                        text = nameObj.text + "元满减券";
                    }
                    str += "<div class='lottery-ticket'>";
                    str += "<span class='price-symbol'>￥</span>";
                    str += "<label class='price-number'>" + nameObj.price + "</label>";
                    str += "</div>";
                    resultHtml = html.replace("*%titleCls%*", "disk-block").replace("*%title%*", "恭喜您")
                        .replace("*%diskText%*", "<span>恭喜您获得一张" + text + "</span><span class='time'>有效期：" + opt.timer + "</span>")
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
