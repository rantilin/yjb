import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    expertdetails(id) {
        const datas = { "id": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_expert_info&op=expert_inf_details',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    problemlist(id, curpage) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=problem_details',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "id": id,
                "curpage": curpage
            },
        })
        return req
    },
    msglist(id, curpage) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_expert_info&op=evaluate_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "id": id,
                "curpage": curpage
            },
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