import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    lists(id) {
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
    msglist(id) {
        const datas = { "id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=msglist',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    addmsg(key, id, content) {
        const datas = { "key": key, "comment_wledge": id, "comment_content": content }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=addgroup',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    apply(key, class_order, goods_id) {
        const datas = { "key": key, "class_order": class_order, "goods_id": goods_id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=order_yz',
            data: qs.stringify(datas),
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