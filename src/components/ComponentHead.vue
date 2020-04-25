<template>
  <div>
    <div class="commontitles">
      <div class="commontitle">
        <div class="commonback" @click="back">
          <div class="commonbackpic"></div>
        </div>
        <div class="commontitlename">{{comname}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Head",
  props: ["comname"],
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    comname() {
       this.comname=comname
    }
  },
  created() {}
};
</script>
<style scoped>
.commontitles {
  width: 100%;
  position: fixed;
  z-index: 51;
  background-color: #ffffff;
  height: 60px;
  top: 0px;
}

.commontitle {
  width: 100%;
  height: 100%;
  position: relative;
}

.commonback {
  position: absolute;
  top: 0;
  left: 15px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 3;
}

.commonbackpic {
  width: 24px;
  height: 24px;
  background: url("../assets/image/back.png");
  background-size: 100% 100%;
}

.commontitlename {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 18px;
  color: #333333;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
}
</style>

