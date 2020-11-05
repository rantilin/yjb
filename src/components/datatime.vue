<template>
	<div class="container">
		<!-- tab栏 -->
		<cube-scroll ref="navScroll" direction="horizontal" class="scrollview">
				<div class="flex-box" v-for="(item, index) in dateArr" :key="index" :class="index == dateActive ? 'onflex-box' : ''" @click="selectDateEvent(index, item)">
					<div class="date-box">
						<div class="date" :style="{ color: index == dateActive ? selectedTabColor : '#666666' }">{{ item.date }}</div>
						<div class="days" :style="{ color: index == dateActive ? selectedTabColor : '#666666' }">{{ item.week }}</div>
					</div>
				</div>
		</cube-scroll>
      <div class="datahours">
           <div class="item" v-for="(item, index) in datahors" :key="index" :class="hoursindex==index?'onitem':''" @click="clickhours(index)">
                {{item.text}}
           </div>
      </div>
      <div class="hourstext">
           <div class="item">
             09：00—11：30
           </div>
           <div class="item">
             13：30—18：00
           </div>
      </div>
      <div class="tiptext">
           <p>温馨提示：</p>
           <p class="p2">预约后请提前与医生联系，避免错过时间。最长可预约14天内的服务时间。</p>
      </div>
      <div class="selectbuton" @click="selectbuton">确认选择</div>
    </div>
</template>
<script>
import { dateData, timeData, timeStamp } from '../utils/date.js';
let maxIndex;
export default {
  props: {
     //选中的tab颜色
		selectedTabColor: {
			type: String,
			default: '#fff'
		},
  },
  data() {
    return {
      dateArr: [], //日期数据
      dateActive: 0, //选中的日期索引
      datahors: [{  //选中上午下午
        text: '上午',
        value: '09:00'
      },
      {
        text: '下午',
        value: '13:30'
      }],
      hoursindex:0,
      selectDate:'',
      }
  },
  created(){
    //获取日期tab数据
    this.dateArr = dateData();
    
  },
  methods:{
    selectDateEvent(index, item){
         this.dateActive = index;
       
    },
    clickhours(val){
        this.hoursindex = val
    },
    selectbuton(){
       this.selectDate=this.dateArr[this.dateActive]['date'] +' ' + this.datahors[this.hoursindex].value
       this.$emit('selectTime', `${this.selectDate}`);
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
	div,text,image{
		box-sizing: border-box;
	}
	.scrollview{
		width: 100%;
		white-space: nowrap;
    height: 52px;
    display: flex;
		position: relative;
	
		.flex-box{
			display: inline-block;
			height: 100%;
      margin:2.5px 12px 2.5px 0 ;
      padding: 5px;
      background: #F4F5FA;
      border-radius:8px;
			&.active{
				// border-bottom: 4px solid #0092D5;
				// box-shadow: inset 0 -4px 0 0 #0092D5;
				.date-box{
					.days{
						color: #FFFFFF;
					}
					.date{
						color: #FFFFFF;
					}
				}
			}
			.date-box{	
				height: 100%;
        line-height: 15px;
        color: #666666;
        padding: 7px 0 0 0;
        text-align: center;
				.date{
					color: #666666;
					font-size: 14px;
					// margin-top: 10px;
        }
      	.days{
          font-size: 10px;
					color: #666666;
				}
			}
		}
		.onflex-box{
      background: #3398FF;
    }
  }
  .datahours{
    margin: 16px auto 8px auto;
    display: flex;
    justify-content: space-between;
    .item{
       width: 164px;
       height: 40px;
       line-height: 40px;
       background: #F4F5FA;
       color: #666666;
       font-size: 14px;
       text-align: center;
       border-radius: 8px;
    }
    .onitem{
      background: #3398FF;
      color: #fff;
    }
  }
  .hourstext{
    margin: 0 auto 16px auto;
    display: flex;
    justify-content: space-between;
    .item{
      width: 164px;
      line-height: 20px;
      font-size: 14px;
      color: #333333;
      text-align: center;
    }
  }
  .tiptext{
      color: #666666;
      font-size: 14px;
      line-height: 20px;
      .p2{
        margin-top: 5px;
        color: #999999;
        text-indent: 20px;
      }
  }
  .selectbuton{
     color: #fff;
     background: #3398FF;
     border-radius: 8px;
     text-align: center;
     font-size: 16px;
     line-height: 45px;
     margin: 28px auto;
  }
}
</style>