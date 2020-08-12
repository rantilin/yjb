import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'

export default {
  gourpdetail(id) {
    const datas = {
        'goods_id': id,
    }
    const req = request({
        method: 'post',
        url: '/index.php?act=group_info&op=index',
        cancelToken: new axios.CancelToken(c => {
            Vue.$httpRequestList.push(c);
        }),
        data: qs.stringify(datas)
    })
    return req
},
}