import Vue from "vue";
import knowledgeapi from "@/api/KnowledgeApi";
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
export default {
    name: 'knowledge',
    data() {
        return {
            comname: '知识库',
            active: '',
            list: [],
            smlist: [],
            loding: true,
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
            localStorage.removeItem('lanmuvales');
        },
        plantab() {
            window.localStorage.setItem('lanmuvales', this.active);
            this.smlist = this.list[this.active].xia_list['class_list'];
            this.$nextTick(() => {
                this.$refs.scroll.refresh()
            });
            this.$refs.scroll.scrollTo(0, 0)
        },
        knowledgelist() {
            this.$router.push({
                name: 'knowledgelist',
                query: {
                    id: event.currentTarget.dataset.id,
                    name: event.currentTarget.dataset.name,
                }
            })
        },
        list1() {
            knowledgeapi.wledgelist().then(res => {
                if (parseInt(localStorage.getItem('lanmuvales')) >= 0) {
                    this.active = parseInt(localStorage.getItem('lanmuvales'));
                } else {
                    this.active = 0;

                }
                this.list = res.data.datas.class_list;
                this.smlist = this.list[this.active].xia_list['class_list'];
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