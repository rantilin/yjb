import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    welfarelist(id) {
        const req = request({
            method: 'get',
            url: '/index.php?act=index_yjb_new&op=fuliinfo',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "id": id
            },
        })
        return req
    },
}