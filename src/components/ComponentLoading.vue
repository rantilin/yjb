<template>
  <div>
    <div class="loadingdv">
      <div class="load">
        <Lottie :options="loadingoption" @animCreated="loadingAnimation" />
      </div>
    </div>
  </div>
</template>
<script>
import Lottie from "vue-lottie/src/lottie.vue";
import loadingAnim from "@/assets/json/loading.json";

export default {
  name: "ComponentLoading",
  components: {
    Lottie
  },
  data() {
    return {
      loadingoption: {
        animationData: loadingAnim,
        loop: true,
        autoplay: true
      },
      loadinganim: ""
    };
  },
  methods: {
    loadingAnimation(anim) {
      this.loadinganim = anim;
    }
  }
};
</script>
<style lang="scss" scoped>
.loadingdv {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  z-index: 50;
  top: 0;
  left: 0;
}
.load {
  width: 250px;
  height: 250px;
}
</style>

