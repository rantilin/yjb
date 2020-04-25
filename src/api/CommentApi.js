import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    expertdetails(key, order_sn) {
        const datas = { "key": key, "order_sn": order_sn }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=evaluate_pj',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
    addmsg(key, comment_expert_id, comment_order_id, comment_content) {
        const datas = { "key": key, "comment_expert_id": comment_expert_id, "comment_order_id": comment_order_id, "comment_content": comment_content }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=add_evaluate',
            data: qs.stringify(datas),
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
        })
        return req
    },
}