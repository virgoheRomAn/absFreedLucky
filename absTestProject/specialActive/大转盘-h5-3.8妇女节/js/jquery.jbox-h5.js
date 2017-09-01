/**
 * 弹出框组件-h5
 * 引用方式：$.jBox
 */
(function ($) {
    function Jbox() {
        var that = this;
        var _timer = 0;
        clearTimeout(_timer);

        this.configFun = function () {
            //配置路径
            var src = window.locationSrc ? window.locationSrc : "img/Jbox/";
            return {
                basicSrc: src,
                alertImg: src + "Jalert.png",
                errorImg: src + "Jerror.png",
                loadingImg: src + "Jloading.gif",
                successImg: src + "Jsuccess.png"
            }
        };

        preLoadImage(this.configFun().alertImg);
        preLoadImage(this.configFun().errorImg);
        preLoadImage(this.configFun().loadingImg);
        preLoadImage(this.configFun().successImg);

        this.alert = function (cont, obj) {
            var newObj = {};
            if (!obj) {
                newObj.w = 100;
                newObj.h = 50;
                newObj.cls = "jDisk-tips jDisk-noIcon";
                tip(cont ? cont : "提示信息", newObj);
            } else {
                obj.w = obj.w ? obj.w : 100;
                obj.h = obj.h ? obj.h : 100;
                obj.cls = obj.cls ? obj.cls : "jDisk-tips jDisk-noIcon";
                tip(cont ? cont : "提示信息", obj);
            }
        };

        this.error = function (cont, obj, icon) {
            var iconSrc = icon ? this.configFun().basicSrc + icon : this.configFun().errorImg;
            preLoadImage(iconSrc, function () {
                tip(cont ? cont : "", obj, iconSrc);
            });
        };

        this.success = function (cont, obj, icon) {
            var iconSrc = icon ? this.configFun().basicSrc + icon : this.configFun().successImg;
            preLoadImage(iconSrc, function () {
                tip(cont ? cont : "", obj, iconSrc);
            });
        };

        this.waring = function (cont, obj, icon) {
            var iconSrc = icon ? this.configFun().basicSrc + icon : this.configFun().alertImg;
            preLoadImage(iconSrc, function () {
                tip(cont ? cont : "", obj, iconSrc);
            });
        };

        this.loading = function (cont, obj, icon) {
            var iconSrc = icon ? this.configFun().basicSrc + icon : this.configFun().loadingImg;
            preLoadImage(iconSrc, function () {
                tip(cont ? cont : "", obj, iconSrc, true);
            });
        };

        this.confirm = function (cont, btn, obj, icon) {
            if (icon) {
                preLoadImage(this.configFun().basicSrc + icon, function () {
                    tipButton("confirm", cont, btn, obj, that.configFun().basicSrc + icon);
                });
            } else {
                tipButton("confirm", cont, btn, obj, this.configFun().basicSrc + icon);
            }
        };

        this.btnAlert = function (cont, btn, obj, icon) {
            if (icon) {
                preLoadImage(this.configFun().basicSrc + icon, function () {
                    tipButton("alert", cont, btn, obj, that.configFun().basicSrc + icon);
                });
            } else {
                tipButton("alert", cont, btn ? btn : ["确定"], obj, this.configFun().basicSrc + icon);
            }
        };

        this.prompt = function (cont, btn, obj, icon) {
            if (icon) {
                preLoadImage(this.configFun().basicSrc + icon, function () {
                    tipButton("prompt", cont, btn, obj, that.configFun().basicSrc + icon);
                });
            } else {
                tipButton("prompt", cont, btn, obj, this.configFun().basicSrc + icon);
            }
        };

        this.close = function () {
            $("#jDisk").fadeOut(function () {
                $(this).remove();
            });
        };

        var tip = function (cont, obj, icon, type) {
            var w, h, cls, time;
            if (!obj) {
                w = 90;
                h = 66;
                cls = "jDisk-tips jDisk-hasIcon";
                time = 1500;
            } else {
                w = !obj.w ? 90 : obj.w;
                h = !obj.h ? 66 : obj.h;
                cls = !obj.cls ? "jDisk-tips jDisk-hasIcon" : obj.cls;
                time = !obj.t ? 1500 : obj.t;
            }

            var textCls = cont ? "" : "noText";
            var iconStr = icon ? "<img class='jDisk-icon' width='26px' height='26px' src='" + icon + "'>" : "";
            var _html = "";
            _html += '<div id="jDisk" class="jDisk-box">';
            _html += '  <div class="' + cls + ' j-alert-ani animated" style="width:' + w + 'px; margin:' + -(h / 2) + 'px 0 0 ' + -(w / 2) + 'px;">';
            _html += '      <div class="jDisk-middle" style="height: '+h+'px;">';
            _html += iconStr;
            _html += '          <span class="' + textCls + '">' + cont + '</span>';
            _html += '      </div>';
            _html += '  </div>';
            _html += '</div>';
            $(document.body).append(_html);
            var tipsBar = $(".jDisk-tips");
            var new_h = tipsBar.height();
            if (new_h != h) tipsBar.css("margin-top", -new_h / 2);

            if (!type) {
                _timer = setTimeout(function () {
                    that.close();
                }, time);
            }
        };

        var tipButton = function (type, cont, btn, obj, icon) {
            var w, h, cls, sFun, cFun;
            if (!obj) {
                w = 210;
                h = 76;
                cls = "jDisk-tips jDisk-btnTips jDisk-hasIcon";
                sFun = false;
                cFun = false;
            } else {
                w = !obj.w ? 210 : obj.w;
                h = !obj.h ? 76 : obj.h;
                cls = !obj.cls ? "jDisk-tips jDisk-btnTips jDisk-hasIcon" : obj.cls;
                sFun = obj.onEnsureFun;
                cFun = obj.onCancelFun;
            }
            var btnAry = !btn ? ["确定", "取消"] : btn;
            var textCls = cont ? "" : "noText";
            var iconStr = icon ? "<img class='jDisk-icon' width='26px' height='26px' src='" + icon + "'>" : "";

            //添加HTML
            var _html = "", btnHtml = "", contHTML = "";
            switch (type) {
                case "alert":
                    btnHtml = '<a id="jEnsure" href="javascript:;" class="flex-item">' + btnAry[0] + '</a>';
                    contHTML = '' + iconStr + '<span class="' + textCls + '">' + cont + '</span>';
                    break;
                case "confirm":
                    btnHtml = '<a id="jCancel" href="javascript:;" class="flex-item">' + btnAry[1] + '</a>';
                    btnHtml += '<a id="jEnsure" href="javascript:;" class="flex-item" style=" border-left: 1px solid #dcdada;">' + btnAry[0] + '</a>';
                    contHTML = '' + iconStr + '<span class="' + textCls + '">' + cont + '</span>';
                    break;
                case "prompt":
                    btnHtml = '<a id="jCancel" href="javascript:;" class="flex-item">' + btnAry[1] + '</a>';
                    btnHtml += '<a id="jEnsure" href="javascript:;" class="flex-item" style=" border-left: 1px solid #dcdada;">' + btnAry[0] + '</a>';
                    contHTML = '<label class="jDisk-prompt textCls">' + iconStr + cont + '</label>';
                    contHTML += '<label class="jDisk-input"><input type="text" placeholder="请输入信息"></label>';
                    break;
            }

            _html += '<div id="jDisk" class="jDisk-box" style=" background: rgba(0,0,0,0.5);">';
            _html += '  <div class="' + cls + ' j-alert-ani animated" style="width:' + w + 'px; margin:' + -((h + 44) / 2) + 'px 0 0 ' + -(w / 2) + 'px;">';
            _html += '      <div class="jDisk-middle" style="height: ' + h + 'px;">';
            _html += '          <p>';
            _html += contHTML;
            _html += '          </p>';
            _html += '      </div>';
            _html += '      <div class="j-confirm-btn display-flex">';
            _html += btnHtml;
            _html += '      </div>';
            _html += '  </div>';
            _html += '</div>';
            $(document.body).append(_html);

            var tipsBar = $(".jDisk-tips");
            var new_h = tipsBar.height();
            if (new_h != h + 44) tipsBar.css("margin-top", -new_h / 2);

            $("#jCancel").on("click", jCancel);
            $("#jEnsure").on("click", jEnsure);

            function jEnsure() {
                $("#jDisk").fadeOut(300, function () {
                    $(this).remove();
                    if (!sFun) {
                        return false;
                    } else {
                        obj.onEnsureFun.call(this);
                    }
                });
            }

            function jCancel() {
                $("#jDisk").fadeOut(300, function () {
                    $(this).remove();
                    if (!cFun) {
                        return false;
                    } else {
                        obj.onCancelFun.call(this);
                    }
                });
            }
        };
    }

    function preLoadImage(src, Fun) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            Fun ? Fun() : "";
        };
    }


    $.extend({
        jBox: new Jbox()
    });

    var style = '<style id="jBoxStyle">' +
        '.jDisk-box{ position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 1500;}  ' +
        '.jDisk-tips{ display: table; position: absolute; top: 50%; left: 50%;  z-index: 1000; background: rgba(0,0,0,0.5); text-align: center; border-radius: 3px;} ' +
        '.jDisk-tips .jDisk-middle{ display:table-cell; vertical-align: middle;}' +
        '.jDisk-middle > span{ display: block; padding: 12px; font-size: 14px; color: #FFFFFF; line-height: 22px; word-wrap:break-word; word-break:normal;}' +
        '.jDisk-tips.jDisk-hasIcon .jDisk-middle > span{ padding:5px 8px 0;}' +
        '.jDisk-tips.jDisk-hasIcon .jDisk-middle > span.noText{ padding:0;}' +
        '.jDisk-box .jDisk-icon{ width:26px; height:26px; margin:auto;}' +
        '.jDisk-tips.jDisk-btnTips{ display:block; background:#ffffff;border-radius:5px; box-shadow: 2px 2px 3px #444040;}' +
        '.jDisk-tips.jDisk-btnTips .jDisk-middle{ display:table; width:100%;}' +
        '.jDisk-tips.jDisk-btnTips .jDisk-middle > p{ display:table-cell; vertical-align: middle; margin:0; padding:0; font-size:14px; padding:8px;}' +
        '.jDisk-tips.jDisk-btnTips .jDisk-middle > p span{ display:block; padding:0 8px;}' +
        '.j-confirm-btn{ width: 100%; height: 44px; line-height: 44px; overflow: hidden; border-top: 1px solid #dcdada;}' +
        '.j-confirm-btn a{ color:#037cff; text-decoration:none;}' +
        'label.jDisk-prompt{ display:block; margin:0; text-align:left; padding: 3px 0 8px 0; font-size:12px;}' +
        'label.jDisk-prompt.noText{ padding:0;}' +
        'label.jDisk-prompt .jDisk-icon{ float:left; width:14px; height:14px; margin:1px 5px 0 0;}' +
        '.jDisk-input{ display:block; margin:0; border-radius:3px; border:1px solid #ccc; height:24px; line-height:24px; padding:0 5px;}' +
        '.jDisk-input input{ display: block; width:100%; margin-top:3px; border:0 none; background:transparent; font-size:12px; padding:0;}' +
        '</style>';
    $(document.head).append(style);
})
(jQuery);