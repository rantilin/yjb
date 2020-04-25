import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    testlist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=evaluation_new&op=wapcp',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
}