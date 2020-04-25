import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    users(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_index',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    userpic(key, imgData) {
        const datas = { 'key': key, 'pics': imgData }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=ajaxUpload',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    nicknames(key, val) {
        const datas = { 'key': key, 'nicknames': val }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=member',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    autograph(key, val) {
        const datas = { 'key': key, 'autograph': val }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=member',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    member_mobile(key, val) {
        const datas = { 'key': key, 'member_mobile': val }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=member',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    member_sex(key, val) {
        const datas = { 'key': key, 'member_sex': val }
        const req = request({
            method: 'post',
            url: '/index.php?act=member_info&op=member',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
}