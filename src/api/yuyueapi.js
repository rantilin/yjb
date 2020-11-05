import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
   
    yuyue(buyer_name,buyer_tel,member_year,member_yuyue,content,goods_amount,xiangmu,key){
        const datas = {
             'buyer_name':buyer_name,
             'buyer_tel':buyer_tel,
             'member_year':member_year,
             'member_yuyue':member_yuyue,
             'content':content,
             'goods_amount':goods_amount,
             'xianmu':xiangmu,
             'key': key
        }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_buy_yjbgh&op=buy_step_gq',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    order(order_sn,key){
      const datas = {
           'order_sn':order_sn,
           'key': key
      }
      const req = request({
          method: 'post',
          url: '/index.php?act=member_buy_yjbgh&op=order_yz',
          cancelToken: new axios.CancelToken(c => {
              Vue.$httpRequestList.push(c);
          }),
          data: qs.stringify(datas)
      })
      return req
  }
}