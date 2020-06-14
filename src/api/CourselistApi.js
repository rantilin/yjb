import request from '@/utils/request';
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
  column(columnid) {
    const req = request({
      method: 'get',
      url: 'index.php?act=yjb_course_info&op=new_columnsp',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      params: {
        "column_id": columnid
      },
    })
    return req
  },
  newsplist(column_id, type_id, curpage) {
    const req = request({
        method: 'get',
        url: '/index.php?act=yjb_course_info&op=new_ysplist',
        cancelToken: new axios.CancelToken(c => {
            Vue.$httpRequestList.push(c);
        }),
        params: {
            "column_id": column_id,
            "type_id": type_id,
            'curpage':curpage,
        },
    })
    return req
}
};