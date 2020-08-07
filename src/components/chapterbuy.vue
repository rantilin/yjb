<template>
  <div class="chapter">
    <div
      class="ctxtli"
      :class="[item.price_count > 0? '' :'on',checkarr.includes(index)?'buy':'']"
      v-for="(item,index) in listdata"
      :key="index"
    >
      <div class="text1">{{item.courseware}}</div>
      <div
        class="text3"
        v-if="item.price_count > 0"
      >
        <template v-if="pricebool(item.chapter_text)">
           {{ item.price_count.toFixed(2)}}
       </template>
       <template v-else>
            已购买
       </template>
     
      </div>
      <div class="text3" v-else>免费</div>
      <input
        class="cks"
        type="checkbox"
        :value="item.chapter_text|chapterarr"
        v-model="checkedNames"
        :disabled="item.price_count > 0 && pricebool(item.chapter_text) ? false:true"
        @click="checkedBox(index, item.chapter_text)"
      />
    </div>
    <!-- <div class="ctxtli buy">
           <div class="text1">第二章</div>
           <div class="text2">前言与试看</div>
           <div class="text3">￥2000.00</div>
         </div>
         <div class="ctxtli">
           <div class="text1">第三章</div>
           <div class="text2">前言与试看</div>
           <div class="text3">￥2000.00</div>
         </div> -->
  </div>
</template>
<script>
export default {
  name: 'chapterbuy',
  props: ['listdata','quanxuan'],
  data() {
    return {
      checkarr:[],
      checkedNames:[],
    }
  },
  created() {
    //console.log(this.checkqx)
  },

  methods: {
   
    checkedBox(index, item) {
          if (this.checkarr.includes(index)) {
                this.checkarr = this.checkarr.filter(ele=> ele != index);
            } else {
                this.checkarr.push(index);
            }
        
    },
    pricebool(item) {
      let iszjbuy = false
      for (let i = 0;i<item.length;i++) {
        if(item[i].gm == '1'){
           iszjbuy = false
        }else{
           iszjbuy = true
        }
      }
      return iszjbuy;
    },
    qxchapterarr(val){
          let checkarr = [];
          for (const key in val) {
               checkarr.push(`${val[key].vo_id},${val[key].video_price}`)
          }
          return checkarr;
    }
  },
  computed: {},
  watch:{
      checkedNames(val,oldval){
           let buyarr = []
           for (let index = 0; index < val.length; index++) {

                for (let index2 = 0; index2 < val[index].length; index2++) {
                    buyarr.push(val[index][index2])
                }
           }
          this.$emit('section',buyarr)
      },
      quanxuan(val, oldval){
         if(val){
           for (let i in this.listdata) {
                 if (this.listdata[i].price_count > 0 && this.pricebool(this.listdata[i].chapter_text)) {
                       this.checkarr.push(parseInt(i));
                   }
            }
         }else{
             this.checkedNames = [],
             this.checkarr= [];
         }
      }
  },
  filters:{
     chapterarr(val){
          let checkarr = [];
          for (const key in val) {
               checkarr.push(`${val[key].vo_id},${val[key].video_price}`)
          }
          return checkarr;
     }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.chapter {
  padding: 16px 16px 0 16px;
  .on {
    background-color: #c8cccb;
    color: #fff;
  }
  .buy {
    background-color: #21c891;
    color: #fff;
  }
}
.ctxtli {
  background: #f7f9fc;
  width: 100%;
  height: 46px;
  line-height: 46px;
  margin-bottom: 16px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 16px;
  color: #bfbfbf;
  padding: 0 12px;
  border-radius: 6px;
  .text1 {
    width: 58%;
  }
  .text2 {
    align-content: flex-start;
  }
  .text3 {
    text-align: right;
    width: 70px;
  }
  .cks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 5;
  }
}
</style>