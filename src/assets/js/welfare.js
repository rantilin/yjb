import Vue from "vue";
import welfareapi from "@/api/WelfareApi";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'welfare',
    data() {
        return {
            comname: '本月福利',
            id: this.$route.query.id,
            loding: true,
            database: '',
            scrollEvents: ['before-scroll-start'],
        }
    },
    methods: {
        scrollnow() {
            this.$refs.scroll.refresh();
        },
        list1() {
            welfareapi.welfarelist(this.id).then(res => {
                this.database = res.data.datas
                this.$refs.content.innerHTML = this.database.acontent
                if (res.data.datas.status_sp == 1) {
                    document.getElementsByTagName("embed")[0].type = "";
                    document.getElementsByTagName("embed")[0].width = "100%";
                    document.getElementsByTagName("embed")[0].height = "auto";
                    document.getElementsByTagName("embed")[0].textIndent = "0";
                }
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
        }
    },
    created() {
        this.list1();
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