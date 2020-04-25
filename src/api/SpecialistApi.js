import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
export default {
    expert_list() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=case_expert_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    disease_list() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=disease_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    disease_list_info(id, curpage) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=disease_list_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "expert_good": id,
                "curpage": curpage
            },
        })
        return req
    },
    rm_qusert(id, curpage) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=rm_qusert',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "case_id": id,
                "curpage": curpage
            },
        })
        return req
    },
    notice() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=notice_kf',
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