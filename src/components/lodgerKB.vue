<template>
  <div class="lodgerkanban">
    <el-card class="box-card auditLeave carditem">
      <div slot="header" class="header clearfix">
          <span class="title">住客看板</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleMuch">查看全部<i class="iconfont icon-arw-top-copy"></i></el-button>
      </div>
      <div class="progress clearfix">
        <div class="inline arriveHotelTime">
          <span class="arriveHotelTimeSpan fs12">{{arr[0]&&arr[0].starttime}}</span>
          <br/>
          <span class="arriveHotelTimeTitleSpan fs12 blue">预计到店时间</span>
        </div>
        <div class="inline timeItem">
          <hr size=1 class="dottedLine">
          <!-- v-for="(i,d) in arr" :key="d" -->
          <div  class="inline inlineTimeItem">
            <div  class="beginTime">
              <span class="inline inlineTimeItemSpan fs14">{{date}}</span>
              <br/>
              <img class="circle" id="imgArr">
            </div>
            <!-- v-if="d == 1" -->
            <div  class="endTime">
              <span class="inline inlineTimeItemSpan fs14">{{date1}}</span>
              <br/>
              <img class="circle">
            </div>
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
          <el-button type="primary" @click="handleok(item,index)">接受</el-button>
          <el-button @click="dialogFormVisible = true">拒绝</el-button>
           <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible">
              <el-input v-model="arr[index].refusal"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleRefase(item,index)">确 定</el-button>
              </div>
            </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
var imgArr = document.getElementById("imgArr")
  export default {
    name: 'lodgerKB',
    data(){
        return{
          dialogFormVisible:false,
          date:"",
          date1:"",
           arr:[],
            KBdata:{
                arriveTime:'09-30'
            }
        }
    },
    methods:{
       handleRefase(item,index) {
      // console.log(this.arr[index].refusal)
      if(this.arr[index].refusal!=""){
        this.$axios.post("/zftds/hotel/order/updateHotelOrder",{
                merchantid:this.$store.state.mchid,
                id:item.id,
                orderType:4,
                payCountPrice:item.payCountPrice,
                totalRefund:item.payCountPrice,
                refusal:this.arr[index].refusal,
                orderNumber:item.orderNumber
              }).then(res=>{
                  // console.log(res)
                  if(res.code == 1){
                    this.$message.success("已拒绝该订单")
                    this.dialogFormVisible = false;
                    this.getData()
                  }else{
                    this.$message.error(res.msg)
                    this.dialogFormVisible = false;
                  }
              })
        }else{
          this.$message.warning('请填写拒绝原因')
        }
      },
      handleok(item,index){
        //  console.log(item.id);
        this.$axios.post('/zftds/hotel/order/updateHotelOrder',{
            id:item.id,
            orderType:1
        }).then(res=>{
            if(res.code == 1){
                this.$message.success('接受订单成功')
                this.getData()
            }else{
                this.$message.error("未知错误")
            }
        })
        },
      getData(){
        // let date = moment().format("YYYY-MM-DD")
        this.$axios.post('/zftds/hotel/order/selectHotelOrder',{
          merchantid:this.$store.state.mchid,
          orderType:0
        }).then(res=>{
          // console.log(res);
          this.arr = [...res.data]
          this.arr = this.arr.splice(0,2)
          this.date = this.arr[0].lateTime.substring(10)
          this.date1 = this.arr[1].lateTime.substring(10)

          // console.log(this.date.substring(0,3));
          
          // console.log(this.arr);
          // if(res.code==1){
          // }
          console.log(imgArr,"imgArr");
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
    width:47.8%;
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
      // text-align: center;
      /deep/ .el-button{
        // margin-right: 20px;
        width:25%;
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
      // width: 460px;
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
      width: 480px;
      height: 40px;
    }
    .dottedLine {
      // width:100%;
      color: #409eff;
      border-style: dashed;
      border-bottom: 1px solid transparent;
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 25px;
      box-sizing: border-box;
    }
    .inlineTimeItem {
      position: relative;
    }
    .inlineTimeItemSpan {
      color: #409eff;
    }  
    .beginTime{
      // margin-top: -7px;
      margin-top: -20px;
      margin-left: 10px;
      // position: absolute;
      // top: -33px;
      
      // img:nth-last-child(){
      //   display: block;
      //   background-color: #409eff;
      //   height: 10px;
      //   width: 10px;
      //   border-radius: 7.5px;
      //   }
    }
    .endTime {
      position: absolute;
      right: -220px;
      top: -20px;
    }
     img{
        // display: none;
        display: block;
        background-color: #409eff;
        height: 10px;
        width: 10px;
        border-radius: 7.5px;
        
      }
  }
  .time-time{
      margin: 3px 5px;
  }

</style>
