import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
  walist(key) {
    const datas = {
      'key': key
    }
    const req = request({
      method: 'post',
      url: '/index.php?act=member_wallet&op=index',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      data: qs.stringify(datas)
    })
    return req
  },
  constprice(key) {
    const datas = {
      'key': key
    }
    const req = request({
      method: 'post',
      url: '/index.php?act=member_wallet&op=price_info',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      data: qs.stringify(datas)
    })
    return req
  },
  notice(key) {
    const datas = {
      'key': key
    }
    const req = request({
      method: 'post',
      url: '/index.php?act=member_wallet&op=notice_qb',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      data: qs.stringify(datas)
    })
    return req
  },
  postdeposit(key, promotion_id, tx_price) {
    const datas = {
      'key': key,
      'promotion_id': promotion_id,
      'tx_price': tx_price
    }
    const req = request({
      method: 'post',
      url: '/index.php?act=member_wallet&op=add_promotion',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      data: qs.stringify(datas)
    })
    return req
  },
  deposit(key) {
    const datas = {
      'key': key
    }
    const req = request({
      method: 'post',
      url: '/index.php?act=member_wallet&op=withdrawal',
      cancelToken: new axios.CancelToken(c => {
        Vue.$httpRequestList.push(c);
      }),
      data: qs.stringify(datas)
    })
    return req
  }
}