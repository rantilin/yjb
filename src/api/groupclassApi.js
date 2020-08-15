import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'

export default {
    gourpdetail(key, id) {
        const datas = {
            'key': key,
            'goods_id': id,
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=group_info&op=index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req;
    },
    gourpkt(key, id){
        const datas = {
            'key': key,
            'goods_id': id,
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=group_info&op=add_group',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req;
    },
    gourpktuser(key, secret){
        const datas = {
            'key': key,
            'group_order_secret': secret,
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=group_info&op=group_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req;
    },
    gourpuser(key){
        const datas = {
            'key': key,
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=group_info&op=random',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req;
    },
    groupinfo(key, secret){
        
        const datas = {
            'key': key,
            'group_order_secret': secret,
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=group_info&op=group_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req;
    },
    loginvideodetail(key, id, classtype) {
        const datas = {
            "key": key,
            'goods_id': id,
            'room_state': classtype
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=course_sp_details ',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    order(key, pay_result, class_order, room_audio_id, goods_id, price, order_pay, codeDiscount, giftid,secret) {
        if(giftid == undefined){
            giftid = null
        }
        const datas = {
            'key': key,
            'pay_result': pay_result,
            "class_order": class_order,
            "room_audio_id": room_audio_id,
            "goods_id": goods_id,
            "goods_amount": price,
            "order_amount": price,
            "order_pay": order_pay,
            'code_result': codeDiscount.code_result,
            'tationcode': codeDiscount.tationcode,
            'discount': codeDiscount.discount,
            'gift_id' : giftid,
            'group_order_secret':secret
        }

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