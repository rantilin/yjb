import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    zixun(id) {
        const datas = { 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_expert_info&op=problem_one',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    orderdetail(key, order_sn) {
        const datas = { 'key': key, "order_sn": order_sn }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=select_order',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}