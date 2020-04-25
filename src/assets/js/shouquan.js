import Vue from "vue";
import ComponentLoading from '@/components/ComponentLoading';
Vue.use(ComponentLoading);
Vue.component('component-loading', ComponentLoading);
export default {
    name: 'shouquan',
    data() {
        return {
            loding: true,
        }
    },
    methods: {

    },
    created() {
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            window.location.href = process.env.VUE_APP_SERVICE_URL + "/index.php?act=wx_auto_new&op=login";
        }
    }
}