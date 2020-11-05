import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    //图文订单
    tworder(key, pics, description, price, order_pay, expert_id, codeDiscount) {
        const datas = { 'key': key, 'pay_result': 1, "class_order": 3, "pics": pics, "description": description, "goods_amount": price, "order_amount": price, "order_pay": order_pay, 'expert_id': expert_id,  'code_result':codeDiscount.code_result, 'tationcode':codeDiscount.tationcode, 'discount':codeDiscount.discount }
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
    //电话订单
    dhorder(key, pics, description, quserttel, price, order_pay, expert_id, codeDiscount) {
        const datas = { 'key': key, 'pay_result': 1, "class_order": 4, "pics": pics, "description": description, "qusert_tel": quserttel, "goods_amount": price, "order_amount": price, "order_pay": order_pay, 'expert_id': expert_id, 'code_result':codeDiscount.code_result, 'tationcode':codeDiscount.tationcode, 'discount':codeDiscount.discount }
        
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
    doctordetail(id) {
        const datas = { 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_expert_info&op=expert_inf_details',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },

    allprice() {
        const datas = {}
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=con_price',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    uploadImage(key, pics){
        const datas = { 'key': key,'pics':pics }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=image_tw',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    }
}