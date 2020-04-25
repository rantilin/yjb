import Vue from "vue";
import chatapi from "@/api/ChatApi";
import common from "./common";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import { Image, NoticeBar } from 'vant';
Vue.use(Image);
Vue.use(NoticeBar);
export default {
    name: 'chat',
    data() {
        return {
            imageurl: require('../image/xt.png'),
            comname: '',
            value: '',
            placeholder: '',
            autofocus: false,
            indicator: false,
            maxlength: 1000,
            padding: false,
            key: this.$store.state.key.value,
            id: '',
            description: '',
            expert_image: '',
            member_avatar: '',
            chatlists: [],
            loding: true,
            number: 3,
            chatval: '',
            expert_id: '',
            chartlist: [],
            loding: true,
            stateapi: false,
            name: '',
            id: '',
            xtid: '',
            loop: 0
        }
    },
    methods: {
        touchinUk(id, index) {
            var that = this;
            this.Loop = setTimeout(function() {
                that.Loop = 0;
                //执行长按要执行的内容，如弹出菜单
                that.shanchu(id)
            }, 500);
            return false;
        },
        cleartime(id, type, type_id) {
            let that = this

            clearTimeout(this.Loop);
            if (that.Loop != 0) {

                that.list6(id, type, type_id)
            }
            return false;

        },
        shanchu(id) {
            console.log(id)
            chatapi.shanchu(this.key, id).then(res => {
                this.toast('删除成功')
                this.list5()
            }).catch(err => {

            });
        },

        focus() {
            this.padding = true
        },
        blur() {
            this.padding = false
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        godoctor(ids) {
            this.$router.push({
                name: 'doctor',
                query: {
                    id: ids,
                }
            })
        },
        list1() {
            chatapi.chatlist(this.key, this.id).then(res => {
                this.description = res.data.datas.duihua.description
                this.expert_image = res.data.datas.duihua.expert_image
                this.member_avatar = res.data.datas.duihua.member_avatar
                this.expert_id = res.data.datas.duihua.expert_id
                this.chatlists = res.data.datas.duihua.duihua
                for (let i in res.data.datas.duihua.duihua) {
                    if (res.data.datas.duihua.duihua[i].class_dia == 2) {
                        this.chatval += res.data.datas.duihua.duihua[i].id + ",";
                    }
                }
                this.chatval = this.chatval.substring(0, this.chatval.length - 1);
                this.list3();
                this.loding = false;
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list2() {
            chatapi.chats(this.key, this.id).then(res => {
                this.number = this.number - res.data.datas;
            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list3() {
            chatapi.chatsstate(this.key, this.chatval).then(res => {

            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list4() {
            chatapi.addchat(this.key, this.id, this.value).then(res => {

            }).catch(err => {
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list5() {
            chatapi.chatxitong(this.key).then(res => {
                if (common.dataisnull(res.data.datas)) {
                    this.chartlist = res.data.datas;
                    console.log(this.chartlist)

                } else {
                    this.chartlist = null
                }
                this.loding = false;
                this.stateapi = true;


            }).catch(err => {
                console.log(err)
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },
        list6(id, type, type_id) {
            chatapi.qkxitong(this.key, id).then(res => {
                this.list5()
                if (type == 1) {
                    this.$router.push({
                        path: '/class',
                        query: {
                            classid: type_id
                        }
                    })
                } else if (type == 2) {
                    this.$router.push({
                        path: '/paygroup',
                        query: {
                            id: type_id
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/doctor',
                        query: {
                            id: type_id
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
                if (err.message != "interrupt") {
                    let errmsg = '请求失败';
                    if (err.message.includes('timeout')) {
                        errmsg = "请检查网络再刷新重试"
                    }
                    this.toast(errmsg);
                }
            });
        },


        send() {
            if (this.value.trim() == '') {
                this.toast('内容不能为空');
            } else {
                if (this.number <= 0) {
                    this.toast('您的对话次数已用完');
                    this.value = '';
                } else {
                    this.number--;
                    var arr = [];
                    arr.push({ 'class_dia': 1, 'dialogue': this.value })
                    this.chatlists = this.chatlists.concat(arr);
                    this.list4();
                    this.value = '';
                }
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        if (this.key && this.$route.query.id != undefined) {
            this.list1();
            this.list2();
            let _this = this;
            document.onkeydown = function(event) {
                if (event.keyCode == 13) {
                    _this.send();
                }
            }
        } else if (this.key && this.$route.query.id == undefined) {
            this.list5()
        } else {
            this.$router.push({ path: '/login' })
        }
        if (this.$route.query.id == undefined) {
            this.comname = '系统消息'
        } else {
            this.comname = '聊天对话'
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.refresh();
        });
        window.onresize = () => {
            this.$refs.scroll.refresh();
        }

    }
}