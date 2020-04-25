import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    swiperlist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=index_yjb_new&op=newshouye',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    alllist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=index_yjb_new&op=newindex',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    classlist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=classgroup',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
}