import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    videodetail(id) {
        const datas = { 'goods_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=course_sp_details',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
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
    groupdetail(id) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=groupdetails',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "goods_id": id,
            },
        })
        return req
    },
    activate(key, kalman_id, kalman_kzb_id, kalman_code, chapter){
        const datas = { 'key': key, "kalman_id": kalman_id, 'kalman_kzb_id': kalman_kzb_id, 'kalman_code': kalman_code, 'chapter': chapter }
        const req = request({
            method: 'post',
            url: '/index.php?act=kalman_code&op=km_yz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    eaitordersn(key, order_sn, code_result, kalman_code_id, kalman_code){
        const datas = { 'key': key, "order_sn": order_sn, 'code_result': code_result, 'kalman_code_id': kalman_code_id, 'kalman_code': kalman_code }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=kami_order',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    }
}