import Vue from "vue";
import commentapi from "@/api/CommentApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'comment',
    data() {
        return {
            comname: '发表评价',
            key: this.$store.state.key.value,
            doctorid: this.$route.query.doctorid,
            ordersn: this.$route.query.ordersn,
            textareas: '',
            expert_image: '',
            expert_name: '',
            description: '',
            disabled: false,
            loding: true,
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        fabubtn() {
            if (this.textareas == '') {
                this.toast('评价不能为空', 'warn');
            } else {
                this.disabled = true;
                this.list2();
            }
        },
        blur() {
            setTimeout(() => {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight, 0))
            }, 10)
        },
        list1() {
            commentapi.expertdetails(this.key, this.ordersn).then(res => {
                this.expert_image = res.data.datas.info[0].expert_image
                this.expert_name = res.data.datas.info[0].expert_name
                this.description = res.data.datas.info[0].description
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
            commentapi.addmsg(this.key, this.doctorid, this.ordersn, this.textareas).then(res => {
                this.toast('发布成功');
                setTimeout(() => {
                    this.disabled = false;
                    this.$router.go(-1);
                }, 1000)
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