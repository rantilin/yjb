import Vue from "vue";
import conversationapi from "@/api/ConversationApi";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'conversation',
    data() {
        return {
            comname: '',
            key: this.$store.state.key.value,
            id: this.$route.query.id,
            description: '',
            expert_image: "",
            expert_name: "",
            expert_title: "",
            member_avatar: "",
            tw_price: "",
            expert_id: '',
            chatlists: [],
            loding: true,
        }
    },
    methods: {
        list1() {
            conversationapi.chatlist(this.key, this.id).then(res => {
                this.description = res.data.datas.duihua.description
                this.expert_image = res.data.datas.duihua.expert_image
                this.expert_name = res.data.datas.duihua.expert_name
                this.comname = this.expert_name;
                this.expert_title = res.data.datas.duihua.expert_title
                this.member_avatar = res.data.datas.duihua.member_avatar
                this.tw_price = res.data.datas.duihua.tw_price
                this.chatlists = res.data.datas.duihua.duihua
                this.expert_id = res.data.datas.duihua.expert_id
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
        consultway() {
            this.$router.push({
                name: 'consult',
                query: {
                    id: 3,
                    doctorid: this.expert_id
                }
            })
        },
        godoctor() {
            this.$router.push({
                name: 'doctor',
                query: {
                    id: this.expert_id,
                }
            })
        }
    },
    created() {
        if (this.key) {
            this.list1();
        } else {
            this.$router.push({ path: '/login' })
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