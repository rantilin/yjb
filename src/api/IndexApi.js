import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

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
            url: '/index.php?act=index_yjb_new&op=new_index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    realllist(item){  //改版后请求首页所有数据api
        const req = request({
            method: 'get',
            url: `/index.php?act=index_yjb_new&op=${item}`,
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    recomlist(item, curpage){  //推荐接口
        const req = request({
            method: 'get',
            url: `/index.php?act=index_yjb_new&op=${item}`,
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "curpage": curpage,
            },
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