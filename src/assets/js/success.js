import Vue from "vue";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead);
import { Image } from 'vant';
Vue.use(Image);
export default {
    name: 'success',
    data() {
        return {
            comname: '意见反馈',
            accomplish: require("../image/accomplish.png"),
            timeset: '',
            time: 3,
        }
    },
    methods: {
        gohref() {
            clearInterval(this.timeset);
            this.$router.push({
                path: "/"
            });
        }
    },
    created() {
        this.timeset = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                clearInterval(this.timeset);
                this.$router.push({
                    path: "/"
                });
            }
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timeset);
    },
}