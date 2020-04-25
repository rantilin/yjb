import request from '@/utils/request'
import qs from 'qs';
export default {
    chatlist(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=problem_buy_qusert',
            data: qs.stringify(datas)
        })
        return req
    },
    chatxitong(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=system_weidu_new',
            data: qs.stringify(datas)
        })
        return req
    },
}