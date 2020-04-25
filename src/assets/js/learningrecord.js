import Vue from "vue";
import learningrecordapi from "@/api/LearningrecordApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'learningrecord',
    data() {
        return {
            comname: '学习记录',
            key: this.$store.state.key.value,
            nocontent: require("../image/nocontent.png"),
            daymm: 60 * 60 * 24,
            gettoday: Date.parse(new Date()) / 1000,
            jt: [],
            zt: [],
            gz: [],
            recordlist: [],
            val: '',
            loding: true,
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        list1() {
            learningrecordapi.cordlist(this.key).then(res => {
                this.recordlist = res.data.datas;
                for (let i in this.recordlist) {
                    this.day = this.gettoday - this.recordlist[i].addtime;
                    if (this.day <= this.daymm) {
                        this.jt.push(this.recordlist[i]);
                    }
                    if (this.day > this.daymm && this.day < this.daymm * 2) {
                        this.zt.push(this.recordlist[i]);
                    }
                    if (this.day > this.daymm * 2) {
                        this.gz.push(this.recordlist[i]);
                    }
                    this.val += this.recordlist[i].id + ',';
                }
                this.val = this.val.substring(0, this.val.length - 1);
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
        delbtn() {
            if (this.recordlist == 0) {
                this.toast('没有学习记录可清理');
                return false;
            }
            this.$createDialog({
                type: 'confirm',
                title: '清空记录',
                content: '是否清空学习记录？',
                confirmBtn: {
                    text: '清空',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    const toast = this.$createToast({
                        time: 0,
                        txt: '正在清理'
                    })
                    toast.show()
                    learningrecordapi.dellist(this.key, this.val).then(res => {
                        toast.hide()
                        this.toast('清空成功');
                        this.list1();
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
            }).show()
        },
        goclass(id, val) {
            if (val == 1) {
                this.$router.push({
                    name: 'class',
                    query: {
                        classid: id
                    }
                })
            } else {
                this.$router.push({
                    name: 'audio',
                    query: {
                        classid: id,
                    }
                })
            }
        },
    },
    created() {
        if (this.key) {
            this.list1();
        } else {
            this.$router.push({ path: '/login' })
        }
    },
    mounted() {
        if (this.recordlist != 0) {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
            window.onresize = () => {
                this.$refs.scroll.refresh();
            }
        }
    }
}