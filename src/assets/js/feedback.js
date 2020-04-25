import Vue from "vue";
import feedbackapi from "@/api/FeedbackApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image, Uploader } from 'vant';
Vue.use(Image);
Vue.use(Uploader);
export default {
    name: 'feedback',
    data() {
        return {
            comname: '意见反馈',
            loding: true,
            textareas: '',
            textnum: 0,
            value: '',
            placeholder: '微信/邮箱',
            maxlength: 200,
            autocomplete: true,
            clearable: {
                visible: true,
                blurHidden: true
            },
            wtlist: [],
            fbid: '',
            currentTab: '?',
            fileList: [],
            imgbase: [],
        }
    },
    methods: {

        afterRead(file) {
            this.imgbase.push(file.content);
        },
        del(detail) {
            this.imgbase.splice(this.imgbase.indexOf(detail.content), 1)
        },
        listbtn(index, id) {
            if (this.currentTab == index) {
                return false;
            } else {
                this.currentTab = index;
                this.fbid = id
            }
        },
        subbtn() {
            if (this.fbid != "") {
                if (this.textareas != "") {
                    feedbackapi.sublist(this.fbid, this.textareas, this.imgbase, this.value).then(res => {
                        this.$router.push({
                            path: '/success'
                        })
                    }).catch(err => {
                        if (err.message != "interrupt") {
                            let errmsg = '请求失败';
                            if (err.message.includes('timeout')) {
                                errmsg = "请检查网络再刷新重试"
                            }
                            this.toast(errmsg);
                        }
                    });
                } else {
                    this.toast('反馈内容不能为空');
                }
            } else {
                this.toast('相关问题需选择');
            }
        },
        list1() {
            feedbackapi.feedback().then(res => {
                this.wtlist = res.data.datas;
                this.loding = false
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
        upkeys() {
            const u = navigator.userAgent
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            if (isAndroid) {
                var dom = document.getElementById('textarea')
                setTimeout(() => {
                    dom.scrollIntoView(true);
                    dom.scrollIntoViewIfNeeded();
                }, 500);
            }
        },
        upkey() {
            const u = navigator.userAgent
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            if (isAndroid) {
                var dom = document.getElementById('dianhuas')
                setTimeout(() => {
                    dom.scrollIntoView(true);
                    dom.scrollIntoViewIfNeeded();
                }, 500);
            }
        },
        blur() {
            document.getElementById("babytopanelview").classList.remove("focusState");
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        }
    },
    created() {
        this.list1();
    },
    watch: {
        textareas() {
            this.textnum = this.textareas.length;
        },
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