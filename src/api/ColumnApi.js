import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    caselist(id) {
        const datas = { "expert_case": id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_expert_info&op=case_list_info',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    }
}