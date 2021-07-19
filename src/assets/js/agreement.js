import Vue from "vue";
import common from "./common";
import ComponentHead from '@/components/ComponentHead';
Vue.use(ComponentHead);
Vue.component('component-head', ComponentHead)
import { Image } from 'vant';
Vue.use(Image);
export default {
    data() {
      return {
        imgsrc: decodeURIComponent(this.$route.query.imgsrc),
      }
    },
    created () {
      
    },
    mounted () {
      this.$refs.scroll.refresh()
    },
}