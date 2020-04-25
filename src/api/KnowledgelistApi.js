import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    wledgelist(id, val) {
        const req = request({
            method: 'get',
            url: '/index.php?act=wledge_class&op=wledge_list',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "gc_id": id,
                "curpage": val
            },
        })
        return req
    },
}