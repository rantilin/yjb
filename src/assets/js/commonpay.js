import WeCahtApi from "@/api/WeCahtApi";
export default {
    //wxpay浏览器
    wapwxpay(key, pay_sn, subject, money, roomid, class_order) {
        WeCahtApi.wxpay(key, pay_sn, subject, money, roomid, class_order).then(res => {
            if (this.CheckUrl(res.data)) {
                window.location.href = res.data;
            } else {
                alert("访问失败，请联系管理员");
            }
        }).catch(err => {
            let errmsg = '请求失败';
            if (err.message.includes('timeout')) {
                errmsg = "请检查网络再刷新重试"
            }
            alert(errmsg);
        });
    },
    //wxpayjs微信内部
    wxpay(key, pay_sn, subject, money, roomid, class_order) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            WeCahtApi.wxpayn(key, pay_sn, subject, money, roomid, class_order).then(ress => {
                if (ress.data.datas.error == null) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": ress.data.datas.appId, //公众号名称，由商户传入
                            "timeStamp": ress.data.datas.timeStamp.toString(), //时间戳
                            "nonceStr": ress.data.datas.nonceStr, //随机串
                            "package": ress.data.datas.package,
                            "signType": ress.data.datas.signType, //微信签名方式
                            "paySign": ress.data.datas.paySign //微信签名
                        },
                        function(res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                alert("微信支付成功！");
                                window.location.href = process.env.VUE_APP_SERVICE_URLS + '#/myorder'
                            } else if (res.err_msg == "get_brand_wcpay_request：cancel") {
                                alert("支付失败");
                            } else {
                                var m = document.createElement('div');
                                m.innerHTML = "取消支付";
                                m.style.cssText = "max-width:60%;min-width: 100px;padding:12px 14px;color: rgb(255, 255, 255);text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 15px;";
                                document.body.appendChild(m);
                                setTimeout(function() {
                                    var d = 0.5;
                                    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                                    m.style.opacity = '0';
                                    setTimeout(function() {
                                        document.body.removeChild(m)
                                    }, d * 1000);
                                    window.location.reload();
                                }, 1000);
                            }
                        });
                } else {
                    alert(ress.data.datas.error);
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            }).catch(err => {
                let errmsg = '请求失败';
                if (err.message.includes('timeout')) {
                    errmsg = "请检查网络再刷新重试"
                }
                alert(errmsg);
            });
        }
    },
    zfb(key, pay_sn, subject, money, roomid, class_order) {
        WeCahtApi.zfb(key, pay_sn, subject, money, roomid, class_order).then(res => {
            const div = document.createElement('div');
            div.innerHTML = (res.data); //res.data是返回的表单
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit();
        }).catch(err => {
            let errmsg = '请求失败';
            if (err.message.includes('timeout')) {
                errmsg = "请检查网络再刷新重试"
            }
            alert(errmsg);
        });
    },
    CheckUrl(str) {
        var RegUrl = new RegExp();
        RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
        if (!RegUrl.test(str)) {
            return false;
        }
        return true;
    },
}