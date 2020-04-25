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
    //返回0 执行注册
    yzmreg(value) {
        const req = request({
            method: 'get',
            url: '/index.php?act=wapapi&op=smszc',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "phone": value
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
    //注册  获取保存token
    offreg(value) {
        const datas = { "your_tel": value, "client": "wap" }
        const req = request({
            method: 'post',
            url: '/index.php?act=login&op=register',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
    //登录  获取保存token
    onreg(value) {
        const datas = { "username": value, "client": "wap" }
        const req = request({
            method: 'post',
            url: '/index.php?act=login&op=index_phone',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    }
}