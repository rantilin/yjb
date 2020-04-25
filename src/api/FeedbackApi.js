import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    feedback() {
        const req = request({
            method: 'get',
            url: '/index.php?act=yjb_course_info&op=yjb_feedback',
        })
        return req
    },
    sublist(column_id, content, images, member_contact) {
        const datas = { "column_id": column_id, "content": content, "images": images, "member_contact": member_contact }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_course_info&op=add_feedback',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas),
        })
        return req
    },
}