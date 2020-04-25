import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    chatlist(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=problem_buy_qusert',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },

    chatxitong(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=system_weidu_new',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },

}