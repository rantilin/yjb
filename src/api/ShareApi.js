import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    share(urls) {
        const datas = { 'urls': urls }
        const req = request({
            method: 'post',
            url: '/index.php?act=wxshare&op=share',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    addshares(key, goods_id) {
        const datas = { 'key': key, 'goods_id': goods_id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=share_yp_add',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}