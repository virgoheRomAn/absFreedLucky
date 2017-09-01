var $phone = $(".up-bar-btn");
var $img = $(".show-img");
var $btn = $(".upload-again");

var gmo, _gm_operate_shade = $(".gm-operate-shade");

//初始化图片操作面板
var gmp = new GMP($img, {
    openRotate: false
});

$phone.GM({
    beforeFun: function () {
        $phone.hide();
        _gm_operate_shade.addClass("load-image");
    },
    completeFun: function (result) {
        gmo && gmo.remove();
        gmo = new GMO(gmp, result, {
            loadComplete: function () {
                //GMO中图片载入完成
                setTimeout(function () {
                    _gm_operate_shade.removeClass("load-image");
                    $btn.show();
                    $btn.GM({
                        beforeFun: function () {
                            _gm_operate_shade.addClass("load-image");
                        },
                        completeFun: function (result) { //图片生成完毕后调用的方法
                            gmo && gmo.remove();
                            $btn.fadeIn();
                            gmo = new GMO(gmp, result, {
                                loadComplete: function () {
                                    _gm_operate_shade.removeClass("load-image");
                                }
                            });
                        },
                        errorFun: function (file) { //错误的回调
                            alert('你选择的“' + file.name + '”文件不是一个有效的图片！');
                        }
                    })
                }, 300);
            }
        });
    },
    errorFun: function (file) { //错误的回调
        $phone.show();
        alert('你选择的“' + file.name + '”文件不是一个有效的图片！');
    }
});

$("#sureBtn").click(function () {
    if ($(".declaration-text").find("textarea").val() != "" && $(".show-img").find("img").length > 0) {
        popDisk(1, "#save", "正在保存信息...");
        setTimeout(function () {
            $("#save").removeClass("fadeDown-end");
        }, 1000);
        setTimeout(function () {
            popDisk(2, "#save", "保存成功！<br>正在跳转“我的分享”页面");
        }, 2000);
        setTimeout(function () {
            //window.location.href = "myShare.html";
        }, 2600);

        //保存图片数据
        var rel = gmp.complete();
        console.log(rel.base64);
    } else {
        popDisk(0, "#save", "您填写的数据不完整！");
    }
});

