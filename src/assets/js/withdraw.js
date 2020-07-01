import vue from 'vue'
import common from '@/assets/js/common'

export default {
  data() {
    return {
      key: ''
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'mywallet',
      })
    },
  },
};