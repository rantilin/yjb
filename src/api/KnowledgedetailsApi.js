import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    konwdetail(id) {
        const req = request({
            method: 'get',
            url: '/index.php?act=wledge_class&op=wledge_details',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "id": id,
            },
        })
        return req
    },
    msglists(id) {
        const datas = { "id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=wledge_class&op=msglist',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
    collectstate(key, id) {
        const datas = { 'key': key, 'wledge_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=wz_coll',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    collection(key, id, states) {
        const datas = { 'key': key, 'wledge_id': id, 'states': states }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=wledge_collection',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    addcollection(id) {
        const datas = { 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=readingnum',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    addmsg(key, comment_wledge, comment_content) {
        const datas = { 'key': key, "comment_wledge": comment_wledge, "comment_content": comment_content }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=addmsg',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}