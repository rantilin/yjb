import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    problem_buy(key, id) {
        const datas = { "key": key, "id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=yz_problem_buy ',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
    buydetail(key, id) {
        const datas = { "key": key, "id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=buy_problem',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
    order(key, qusert_id, price, order_pay, ) {
        const datas = { 'key': key, 'pay_result': 1, "class_order": 5, "qusert_id": qusert_id, "goods_amount": price, "order_amount": price, "order_pay": order_pay }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=buy_step',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}