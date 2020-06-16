import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    videodetail(id, classtype) {
        const datas = { 'goods_id': id, 'room_state':classtype}
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
    loginvideodetail(key, id, classtype) {
        const datas = { "key": key, 'goods_id': id, 'room_state':classtype}
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
    msglist(id) {
        const datas = { 'goods_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=course_msglist',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    msgadd(key, id, content) {
        const datas = { 'key': key, 'comment_course': id, 'comment_content': content }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=addmsg_ysp',
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
    order(key, pay_result, class_order, room_audio_id, goods_id, price, order_pay, codeDiscount) {
        const datas = { 'key': key, 'pay_result': pay_result, "class_order": class_order, "room_audio_id": room_audio_id, "goods_id": goods_id, "goods_amount": price, "order_amount": price, "order_pay": order_pay, 'code_result':codeDiscount.code_result, 'tationcode':codeDiscount.tationcode, 'discount':codeDiscount.discount}
         
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
    yqmcode(key,tationcode) {
        const datas = { 'key': key,'tationcode':tationcode};
        const req = request({
            method: 'post',
            url: '/index.php?act=tation_code&op=yqm_yz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}