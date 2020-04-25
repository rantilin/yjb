import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    audiodetail(id) {
        const datas = { 'goods_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=course_yp_details',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    collectstate(key, id) {
        const datas = { 'key': key, 'goods_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=kc_coll',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    collection(key, id, states) {
        const datas = { 'key': key, 'goods_id': id, 'states': states, 'room_jibie': 1 }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=course_collection',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    addlearning(key, classid, zjid, vo_num) {
        const datas = { 'key': key, 'room_id': classid, 'chapter_id': zjid, 'vo_num': vo_num }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=add_learning',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    order(key, pay_result, class_order, goods_id, price, order_pay) {
        const datas = { 'key': key, 'pay_result': pay_result, "class_order": class_order, "goods_id": goods_id, "goods_amount": price, "order_amount": price, "order_pay": order_pay }
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
    audioshare(key, id) {
        const datas = { 'key': key, 'goods_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=share_yp_yz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    order_yz(key, id) {
        const datas = { 'key': key, "class_order": 2, "goods_id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=order_yz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    notice() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=notice_ysp',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    yzphone(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=yz_sj',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req;
    },
}