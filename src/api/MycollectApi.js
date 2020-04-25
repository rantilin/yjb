import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    collectlist(key) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_member_info&op=kc_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "key": key
            },
        })
        return req
    },
    wzcollectlist(key) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_member_info&op=wz_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "key": key
            },
        })
        return req
    },
    delvideolist(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=kc_del',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    delwzlist(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=wz_del',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}