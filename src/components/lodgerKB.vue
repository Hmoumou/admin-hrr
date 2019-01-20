<template>
  <div class="lodgerkanban">
    <el-card class="box-card auditLeave carditem">
      <div slot="header" class="header clearfix">
          <span class="title">住客看板</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleMuch">查看全部<i class="iconfont icon-arw-top-copy"></i></el-button>
      </div>
      <div class="progress clearfix">
        <div class="inline arriveHotelTime">
          <span class="arriveHotelTimeSpan fs14">{{arr[0]&&arr[0].starttime}}</span>
          <br/>
          <span class="arriveHotelTimeTitleSpan fs14">预计到店时间</span>
        </div>
        <div class="inline timeItem">
          <hr size=1 class="dottedLine">
          <div v-for="(i,d) in arr" :key="d" class="inline inlineTimeItem">
            <div v-if="d == 0" class="beginTime">
              <span class="inline inlineTimeItemSpan fs14">{{date}}</span>
              <br/>
              <img class="circle">
            </div>
            <!--<div v-if="d == 1" class="endTime">-->
              <!--<span class="inline inlineTimeItemSpan fs14">{{i.lateTime}}}</span>-->
              <!--<br/>-->
              <!--<img class="circle">-->
            <!--</div>-->
          </div>
        </div>
        <div class="inline rightTitlt">
          <span class="arriveHotelTimeSpan fs14">仅显示</span>
          <br/>
          <span class="arriveHotelTimeSpan fs14">两条信息</span>
        </div>
      </div>
      <div v-for="(item,index) in arr" :key="index" class="text orderitem" >
        <div class="auditLeave-top ">
          <div class="first clearfix">
            <span class="flr fs14">共 <span class="time">{{item.count}}</span> 晚</span>
            <span class="name fs14 fw">{{item.name}}</span>
          </div>
          <span class="summoney fs12 mb5"><span class="fw" style="display: inline-block;margin-right: 5px">RMB</span>{{item.countPrice}}</span>
          <div class="fs12 clearfix"><span class="fll cb5">预达时间</span><span class="time-time blue fll">{{item.lateTime}}</span></div>
          <div class="fw fs14">{{item.houseinfo}}</div>
        </div>
        <div class="auditLeave-btm">
          <el-button type="primary">接受</el-button>
          <el-button>拒绝</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'lodgerKB',
    data(){
        return{
          date:"",
           arr:[],
            KBdata:{
                arriveTime:'09-30'
            }
        }
    },
    methods:{
      getData(){
        // let date = moment().format("YYYY-MM-DD")
        this.$axios.post('/zftds/hotel/order/selectHotelOrder',{
          merchantid:this.$store.state.mchid,
          orderType:0
        }).then(res=>{
          console.log(res);
          this.arr = [...res.data]
          this.arr = this.arr.splice(0,2)
          this.date = this.arr[0].lateTime.substring(10)
          console.log(this.date);
          // console.log(this.arr);
          // if(res.code==1){
          // }
        })
      },

      handleMuch(){
        this.$router.push('/layout/order')
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang='scss'>
  .orderitem {
    width: 47.8%;
    border: 1px solid #f1f1f1;
    padding: 18px;
    margin-right: 10px;
    display: inline-block;
    span, strong {
      display: block;
    }
  }

  .auditLeave {
    .auditLeave-top {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .auditLeave-btm {
      width: 100%;
      /deep/ .el-button{
        width:48%;
      }
      // span, strong {
      //   display: block;
      // }
    }
    .time {
      display: inline-block;
      font-size: 12px;
      color: #409eff;
    }
    .summoney {
      font-size: 12px;
    }
  }
  .carditem { margin-bottom: 10px;}
  .title { padding-left: 6px; border-left: 3px solid #75b8fc;}
  .header { font-weight: 700;}

  .progress {
    margin-bottom: 10px;
    .inline {
      float: left;
    }
    .arriveHotelTime {
      .arriveHotelTimeSpan {
        color: #409eff;
        font-size: 15px;
      }
      .arriveHotelTimeTitleSpan {
        font-size: 15px;
      }
    }
    .rightTitlt {
      float: right;
      color: #409eff;
      font-size: 15px;
    }
    .timeItem {
      width: 75%;
      height: 40px;
    }
    .dottedLine {
      color: #409eff;
      border-style: dashed;
      border-bottom: 1px solid transparent;
      margin-left: 20px;
      margin-top: 25px;
    }
    .inlineTimeItem {
      position: relative;
    }
    .inlineTimeItemSpan {
      color: #409eff;
    }
    .circle {
      display: block;
      background-color: #409eff;
      height: 15px;
      width: 15px;
      border-radius: 7.5px;
      margin-top: 8px;
      margin-left: 12px;
    }
    .beginTime {
      position: absolute;
      top: -33px;
    }
    .endTime {
      position: absolute;
      right: -420px;
      top: -33px;
    }
  }
  .time-time{
      margin: 3px 5px;
  }

</style>
