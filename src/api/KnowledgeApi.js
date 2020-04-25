import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    wledgelist() {
        const req = request({
            method: 'get',
            url: '/index.php?act=wledge_class',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    }
}