import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    order(key, pay_result, class_order, goods_amount, order_amount, order_pay, goods_id, child_name, child_age, child_grades, wechat_number, codeDiscount) {
        const datas = {
            'key': key,
            'pay_result': pay_result,
            "class_order": class_order,
            "goods_amount": goods_amount,
            "order_amount": order_amount,
            "order_pay": order_pay,
            "goods_id": goods_id,
            "child_name": child_name,
            "child_age": child_age,
            "child_grades": child_grades,
            "wechat_number": wechat_number,
            'code_result': codeDiscount.code_result,
            'tationcode': codeDiscount.tationcode,
            'discount': codeDiscount.discount
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_buy&op=buy_step',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}