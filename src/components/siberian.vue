<template>
  <div class="siberian clear">
     <input type="text">
     <div class="">激活</div>
  </div>
</template>
<script>
import classapi from "@/api/ClassApi";
import {
    Notify
} from "vant";
export default {
  name: "siberian",
  props: ["datatime"],
  data() {
    return {
      key: this.$store.state.key.value,
      data:'',
    };
  },
  methods: {
   
  },
  watch: {},
  created() {}
};
</script>
<style lang='scss' scoped>
  .siberian{
      width: 100%;
  }
</style>

