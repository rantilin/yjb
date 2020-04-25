import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    //wxpay浏览器
    wxpay(key, pay_sn, subject, money, roomid, class_order) {
        const datas = {
            'key': key,
            'trade_no': pay_sn,
            'ordsubject': subject,
            'ordtotal_fee': money,
            'roomid': roomid,
            'yjb_type': class_order
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=wx_Phone&op=index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    //微信内部支付
    wxpayn(key, pay_sn, subject, money, roomid, class_order) {
        const datas = {
            'key': key,
            'trade_no': pay_sn,
            'ordsubject': subject,
            'ordtotal_fee': money,
            'roomid': roomid,
            'yjb_type': class_order
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=wx_pay&op=wxpay',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    //支付宝zfb
    zfb(key, pay_sn, subject, money, roomid, class_order) {
        const datas = {
            'key': key,
            'trade_no': pay_sn,
            'ordsubject': subject,
            'ordtotal_fee': money,
            'roomid': roomid,
            'yjb_type': class_order
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=doalipay_Phone&op=doalipay',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}