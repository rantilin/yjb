import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    //手机号获取验证码 为0表示该手机没注册》注册 为1表示该手机已注册》去登录
    phoneyzm(value) {
        const datas = { "username": value }
        const req = request({
            method: 'post',
            url: '/index.php?act=login&op=phonecz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
    //获取验证码
    yzmreg(value) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_revision&op=send_code',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "phone": value,
                'sfyz': 'sfyz'
            },
        })
        return req
    },
    //返回1 执行登录
    yzmlogin(value) {
        const req = request({
            method: 'get',
            url: '/index.php?act=login&op=smsdl',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "phone": value
            },
        })
        return req
    },

    onreg(value, key) {
        console.log(key)
        const datas = { "member_mobile": value, "client": "wap", "key": key }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=member',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    }
}