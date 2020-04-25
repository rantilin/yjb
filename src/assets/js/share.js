import ShareApi from "@/api/ShareApi";
import wx from 'weixin-js-sdk'

function share_yp(key, goods_id, title, shareimg, desc, url, present) {
    ShareApi.share(url).then(res => {
        wx.config({
            debug: false, ////生产环境需要关闭debug模式
            appId: res.data.datas.appId, //appId通过微信服务号后台查看
            timestamp: res.data.datas.timestamp, //生成签名的时间戳
            nonceStr: res.data.datas.nonceStr, //生成签名的随机字符串
            signature: res.data.datas.signature, //签名
            jsApiList: [ //需要调用的JS接口列表
                'hideMenuItems', //判断当前客户端版本是否支持指定JS接口
                'onMenuShareTimeline', // 分享到朋友圈
                'onMenuShareAppMessage', //分享给好友
                'onMenuShareQQ', // 分享到QQ
                'onMenuShareQZone' // 分享到QQ空间
            ]
        });
        var wxdata = {
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: present, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareimg, // 分享图标
            success: function(res) {
                if (key == 1 || key == '1') {
                    msgtip("分享成功");
                } else {
                    ShareApi.addshares(key, goods_id).then(res => {
                        msgtip("分享成功");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
                    }).catch(err => {
                        let errmsg = '请求失败';
                        if (err.message.includes('timeout')) {
                            errmsg = "请检查网络再刷新重试"
                        }
                        msgtip(errmsg);
                    });
                }
            },
            cancel: function() {
                msgtip("您已取消分享");
            },
            fail: function(res) {
                msgtip("分享失败");
            }
        };
        wx.ready(function() {
            wx.hideMenuItems({
                menuList: [
                    'menuItem:share:weiboApp',
                    /*    'menuItem:favorite',*/
                    'menuItem:share:facebook',
                    'menuItem:editTag',
                    'menuItem:delete',
                    'menuItem:originPage',
                    'menuItem:copyUrl',
                    'menuItem:readMode',
                    'menuItem:openWithQQBrowser',
                    'menuItem:openWithSafari',
                    'menuItem:share:email',
                    'menuItem:share:brand'
                ]
            });
            wx.onMenuShareTimeline(wxdata);
            wx.onMenuShareAppMessage(wxdata);
            wx.onMenuShareQQ(wxdata);
            wx.onMenuShareQZone(wxdata);
        });
    }).catch(err => {
        if (err.message != "interrupt") {
            let errmsg = '请求失败';
            if (err.message.includes('timeout')) {
                errmsg = "请检查网络再刷新重试"
            }
            msgtip(errmsg);
        }
    });

}

function msgtip(msg) {
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "max-width:60%;min-width: 100px;padding:12px 14px;color: rgb(255, 255, 255);text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 15px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(m)
        }, d * 1000);
    }, 1000);
}

export { share_yp }