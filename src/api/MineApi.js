import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    users(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    order(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=order_one_new',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    toker(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=order_two_new',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}