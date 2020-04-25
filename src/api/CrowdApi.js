import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    crowdlist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=group_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    infolist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    cation_list(gc_id) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=cation_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "gc_id": gc_id
            },
        })
        return req
    },
}