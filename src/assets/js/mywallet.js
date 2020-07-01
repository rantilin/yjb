import Vue from 'vue';
import common from '@/assets/js/common'


export default {
   name:'mywallet',
   data() {
     return {
       key: ''
     }
   },
   methods: {
    back() {
      this.$router.push({
        name: 'mine',
      })
    },
    gowithdraw(){
      this.$router.push({
        name:'withdraw',
      })
    }
   },
};