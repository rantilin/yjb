import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'
export default {
    column(columnid) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=newcolumnyp',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "column_id": columnid
            },
        })
        return req
    },
    newsplist(column_id, gc_id, curpage) {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=newyplist',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            params: {
                "column_id": column_id,
                "gc_id": gc_id,
                "curpage": curpage
            },
        })
        return req
    }
}