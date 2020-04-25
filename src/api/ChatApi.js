import request from '@/utils/request'
import qs from 'qs';
import Vue from 'vue'
import axios from 'axios'
export default {
    chatlist(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=buy_problem_put',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    chats(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=dialogue_yz',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    chatsstate(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=dialogue_statu',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    addchat(key, id, dialogue) {
        const datas = { 'key': key, 'id': id, 'dialogue': dialogue }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=add_dialogue',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    qkxitong(key, id) {
        const datas = { 'key': key, 'comment_id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=system_statu',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },

    chatxitong(key) {
        const datas = { 'key': key }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=system_new',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    },
    shanchu(key, id) {
        const datas = { 'key': key, 'id': id }
        const req = request({
            method: 'post',
            url: '/index.php?act=yjb_member_info&op=del_system',
            cancelToken: new axios.CancelToken(c => {
                Vue.$httpRequestList.push(c);
            }),
            data: qs.stringify(datas)
        })
        return req
    }
}