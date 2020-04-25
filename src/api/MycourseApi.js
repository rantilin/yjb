import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    courselist(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=coll_order',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    dellist(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=order_del',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}