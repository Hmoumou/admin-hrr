<template>
  <div class="check">
    <div class="top">
      <el-card class="box-card carditem clearfix">
        <div slot="header" class="header clearfix">
          <div class="backwraper flr fw500" @click="goBack">
           <i class="backImg fll"></i><span class="blue fll back">返回</span>
          </div>
          <span class="title">续住办理</span>
          </div>
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <div class="left ">
                <el-form  label-width="140px" label-position='left'>
                  <el-form-item label="续住房型" prop="houseType">
                    {{formData.houseinfo}}
                    <!-- <el-input v-model="" disabled></el-input> -->
                  </el-form-item>
                  <!--改编版-->
                  <el-form-item label="预定时间" prop="bookTime">
                    {{formData.starttime}}  至  {{formData.endtime}}
                   <!-- <el-input disabled></el-input> -->
                  </el-form-item>
                  <el-form-item label="续住至" prop="LeaveTimePlus">
                    <el-date-picker
                      v-model="Data.endtime"
                      type="datetime"
                      placeholder="选择日期时间"
                      @change="handleChange" 
                      default-time="12:00:00">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="房间编号" prop="houseId">
                    {{formData.roomnumber}}
                    <!-- <el-input class="w300" v-model="formData.roomnumber" disabled></el-input> -->
                  </el-form-item>
                  <el-form-item label="支付方式" prop="payType" class="payType">
                    <label :class="{ active: checkPay == 1}">
                      <input :value="1" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 2}">
                      <input :value="2" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 3}">
                      <input :value="3" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 4}">
                      <input :value="4" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <div class="right  clearfix">
                <div class="right-data " >
                  <div class="item">房价<span class="span data">RMB {{formData.countPrice}}</span></div>
                  <div class="item">时间<span class="span data">共{{formData.count}}晚</span></div>
                  <div class="item">押金 <span class="span data">RMB {{formData.cashPledge}}</span></div>
                  <div class="lastItem">总金额<span class="span lastData">RMB {{formData.payCountPrice}}</span></div>
                  <div class="btnss fs14" @click="handleCheck">办理续住</div>
                  <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                    <div class="content" v-if="isSuccess">
                      <p class="fw">{{formData.username}}</p>
                      <p>已成功入住{{formData.houseType}} <span class="blue">{{formData.roomnumber}}</span> 室</p>
                    </div>
                    <div class="content" v-else>
                      <p class="blue fs16 mb15 fw">入住失败</p>
                      <p>{{formData.houseType}} <span class="blue">{{formData.roomnumber}}</span> 室,已被网上预订</p>
                    </div>
                    <div slot="footer" class="dialog-footer">
                      <div class="btn1" @click="centerDialogVisible = false">确 定</div>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="btm">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in formData.hop" style="margin-bottom: 15px" :key="index">
          <div class="grid-content bg-purple">
            <el-card class="btm-left box-card carditem clearfix">
              <div slot="header" class="header"><span class="title">入住人0{{index + 1}}</span></div>
              <el-form  label-width="100px" label-position='left'>
                <el-form-item label="姓名" prop="username">
                  <el-input placeholder='请输入姓名' v-model="item.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="IDcard">
                  <el-input placeholder='请输入身份证号' v-model="item.card" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                  <el-input placeholder='请输入联系电话' v-model="item.mobile" disabled></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box" v-if="Yes">
      <div class="box-inner">
        <div class="face">
          <span>{{formData.username}}</span>
          <span>已成功入住{{formData.houseType}} {{formData.roomnumber}}室</span>
          <div class="btn" @click="handleOk">确定</div>
        </div>
        <div class="back">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'url'
import moment from 'moment'
  export default {
    name: 'Check',
    data() {
      return {
        centerDialogVisible: false,
        isSuccess: false,
        Yes: false,
        isOk: true,
        checkPay: 2,
        // 入住订单绑定的数据
        formData: {},
        Data:{
          merchantid:this.$store.state.mchid,//商户ID
          endtime:"",
          hotelid:"",
          orderNumber:"",
          orderType:2,
          count:"",
          payType:"",
          payCountPrice:"",
          hoy:[
              {
                merchantid:this.$store.state.mchid,//商户ID
                // orderNumber:this.formData.orderNumber,
                orderNumber:'',
                price:"",  //价格
                ytd :"",//日期
              }
          ],
        },
      }
    },
    methods: {
      handleChange(){//选择时间之后的事件
        let d1 = this.Data.endtime
        let d2 = new Date(this.formData.endtime)
        let d3 = d1.getTime()
        let d4 = d2.getTime()
        console.log(d1,d2,d3,d4);
        // 拼接日期字符串
        let Y1 = d1.getFullYear() + '-';
        let M1 = (d1.getMonth()+1 < 10 ? '0'+(d1.getMonth()+1) : d1.getMonth()+1) + '-';
        let D1 = d1.getDate() + ' ';
        let h1 = d1.getHours() + ':';
        let m1 = d1.getMinutes() + ':';
        let s1 = d1.getSeconds(); 
        let str = Y1+M1+D1+h1+m1+s1  
        str = str.split(" ")[0]
        // console.log(str);
        if(d3>d4){
          // let da = { //这是续住需要的数据
          //    merchantid:this.$store.state.mchid,
          //    hotelid:this.formData.hotelid,
          //    orderNumber:this.formData.orderNumber,
          //    payType:this.formData.payType,
          //   //  sign:"",//验签码
          //    orderType:2,
          //    endtime:str,
          //    payCountPrice:"",//订单支付总金额
          //    count:"",//入住总天数
          //    hoy:[]
          // }
          // console.log(da);
          console.log(this.formData);
          let dat = {
            merchantid:this.$store.state.mchid,
            hotelid:this.formData.hotelid,
            starttime:this.formData.endtime,
            endtime:str
          }
          console.log(dat); 
          var dayy = parseInt((d3-d4)/(1000*60*60*24)) // 拼接天数 总天数
          this.formData.count = Number(this.formData.count) + Number(dayy)
          console.log(this.formData.count);
          // 计算拼接后的房价
            //以下操作是为了求两个时间段之间的时间集合start
          var timeArr = [];
          var date1 = new Date(this.formData.endtime);
          var date2 = new Date(str);
          var dateSpan = (date2.getTime() - date1.getTime()) / 86400000;
          // console.log(dateSpan); 
          // timeArr.push(moment(startDate).format("YYYY-MM-DD")); // 利用momentjs生成指定格式的字符串
          for(let i = 0; i < dateSpan; i++) {
              let startDate = new Date(this.formData.endtime); // 开始时间
              var nowDate = new Date(startDate.setDate(startDate.getDate()+i)); // setDate设置一个日期天数，getDate得到日期天数。然后返回一个新的日期的unix时间戳。然后利用new Date方法生成新的时间对象。
              timeArr.push(moment(nowDate).format("YYYY-MM-DD"))
          }
          console.log("timeArr",timeArr);
          // 时间集合end

          //计算拼接后的Hoy
          this.$axios.post("/zftds/hotel/house/selectHotelCalendar",dat).then(res=>{
              console.log(res);
              if(res.code == 0){
                this.formData.countPrice = String(this.formData.roomPrice*dayy*this.formData.roomamount)
                this.formData.payCountPrice = String(Number(this.formData.countPrice) + Number(this.formData.cashPledge))
              }else{
                var arr = []
                var arr1 = []
                res.data.map(item=>{
                 if(item.activityprice!=""){
                  arr.push(item.activityprice)
                  arr1.push(item.ytd)
                 }
                })
                // console.log("timeArrtimeArr",timeArr);//这是两个时间段的所有日期
                // 去掉整体日期里面相同的日期，不同时存在的日期即为原价日期
                var arr2 = []
                var arr3 = []
                for(var j=0;j<arr1.length;j++){
                  arr2[arr1[j]]=true
                }
                for(var c=0;c<timeArr.length;c++){//得到应原价日期
                  if(!arr2[timeArr[c]]){
                    arr3.push(timeArr[c])
                  }
                }
                console.log("arr3arr3arr3arr3arr3",arr3);
                let ress = []//这是最后拼成的数组
                for(let i=0; i<arr.length;i++){
                  ress.push({
                  merchantid:this.$store.state.mchid,
                  ytd:arr1[i],
                  price:arr[i]
                })
                } 
                 for(let n=0; n<arr3.length;n++){
                  ress.push({
                    merchantid:this.$store.state.mchid,
                    ytd:arr3[n],
                    price:this.formData.roomPrice
                  })
                }
                this.formData.hoy = [...ress]
                console.log("this.formData.hoy",this.formData.hoy);
                var sum = 0
                for(let q=0; q<arr.length;q++){
                  sum += Number(arr[q])
                }
                //有活动价的时候计算的房间总价
                this.formData.countPrice = String((this.formData.roomPrice*(Number(dayy)-Number(arr.length))+sum)*this.formData.roomamount)
                this.formData.payCountPrice = String(Number(this.formData.countPrice) + Number(this.formData.cashPledge))
              }
          })
        }else{
          this.$message.warning("续订日期需大于预订日期")
          this.Data.endtime = ""
        }
      },
      goBack(){//点击返回按钮，返回订单页
        this.$router.go(-1)
      },
      // 支付方式
      handlePayToWX() {
        console.log('微信');
      },
      handlePayToZFB() {
        console.log('支付宝');
      },
      handlePayToOnline() {
        console.log('在线');
      },
      handlePayToMoney() {
        console.log('现金支付');
      },
      handleCheck() {
        console.log(this.formData.endtime);
        console.log(this.Data);
        // if(this.Data.endtime){
        //   this.$axios.post("",{
        //     endtime:this.Data.endtime
        //   }).then(res=>{
        //     console.log(res);
        //     if(res.code==1){

        //     }else{
        //       this.$message.error(res.msg)
        //     }
        //   })
        // }else{
        //   this.$message.warning("请输入续订日期")
        // }
        this.centerDialogVisible = true
        console.log(this.formData);
      },
      handleOk() {
        this.isOk = false;
      },
      handleClose() {
        this.centerDialogVisible = false
      }
    },
    created() {
      // console.log(this.$route.query);
      this.formData = this.$route.query
      this.Data.orderNumber = this.formData.orderNumber
      // console.log(this.formData.endtime);
    }
  }
</script>

<style scoped lang='scss'>

  .top {
    /deep/ .el-card__header{border-bottom: none; padding:15px 20px 0px;}
   /deep/ .el-input__inner{color:#333; background: #f9fafd;padding-left:30px}
    .payType {
      label {
        box-sizing: border-box;
        display: inline-block;
        width: 92px;
        height: 56px;
        margin-right: 15px;
        border: 1px solid transparent;
        &:nth-of-type(1) {
          background: url('../../image/办理入住/微信支付.png') no-repeat #f1f1f1 center;
          background-size: 75%;

        }
        &:nth-of-type(2) {
          background: url('../../image/办理入住/支付宝.png') no-repeat #f1f1f1 center;
          background-size: 75%;
        }
        &:nth-of-type(3) {
          background: url('../../image/办理入住/银联支付.png') no-repeat #f1f1f1 center;
          background-size: 75%;
        }
        &:nth-of-type(4) {
          background: url('../../image/办理入住/现金支付.png') no-repeat #f1f1f1 center;
          background-size: 75%;
        }
      }
      .active {
        position: relative;
        border: 1px solid #518dfd;
      }
      .active .dui {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        // background: #518dfd;
        background: url('../../image/办理入住/对.png') no-repeat #518dfd center;
        background-size: 85%;
      }
      input {
        display: none
      }
    }
    .icon-duigou2 {
      font-size: 14px;
      position: absolute;
      top: 0;
      color: #409eff;
      right: 0;
    }
    .check {
      position: relative;
      .carditem {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
      }
    }
    .left {
    }
    .right {
      box-sizing: border-box;
      padding: 30px 20px 20px 50px;
      // border-left: 1px virtual #f1f1f1;
      border-left: 1px solid #f1f1f1;
      .right-data {
        .span {
          float: right;
        }
        .item {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .data {
          color: #409eff;
        }
        .lastItem {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 50px;
        }
        .lastData {
          font-size: 16px;
          color: #409eff;
          font-weight: 900;
        }

      }
    }
    .btnss {
      box-sizing: border-box;
      cursor: pointer;
      margin: 0 auto;
      color: #fff;
      width: 60%;
      margin-top: 20px;
      height: 54px;
      line-height: 40px;
      font-weight: 550px;
      background: url('../../image/home/btn1.png') no-repeat center;
      background-size: 100% 100%;
      text-align: center;
    }
    .btn1 {
      font-size: 14px;
      box-sizing: border-box;
      cursor: pointer;
      margin: 0 auto;
      color: #fff;
      width: 50%;
      margin-top: 20px;
      height: 54px;
      line-height: 40px;
      font-weight: 550px;
      background: url('../../image/home/btn1.png') no-repeat center;
      background-size: 100% 100%;
      text-align: center;
    }

  }

  .btm {
     /deep/ .el-input__inner{color:#555; text-align: center;background: #fff;}
    margin-top: 10px;
    .btm-left {
      padding: 10px;
    }
    .btm-right {
      border: 1px dashed #518dfd;
      box-sizing: border-box;
      position: relative;
      height: 286px;
      .icon {
        width: 100%;
        position: absolute;
        top: 38%;
      }
      .icon-jiahao1 {
        margin-left: 45%;
        font-size: 50px;
        color: #518dfd;
      }
      .add {
        font-size: 14px;
        margin-top: 10px;
        display: block;
        color: #518dfd;
        text-align: center;
      }
    }
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .title {
    padding-left: 6px;
    border-left: 3px solid #75b8fc;
  }

  .header {
    font-weight: 700;
    .backwraper{
      cursor: pointer;
        .backImg{
        margin-right: 10px;
        margin-top: 5px;
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../image/home/leftArrow.png')no-repeat;
        background-size: 100% 100%;
      }
      .back{
        display: inline-block;
        width: 30px;
        line-height: 40px;
      }
    }
    
  }

  .content {
    margin-top: 20px;
    text-align: center;
    line-height: 2;
    color: #333;
  }

  /deep/ .el-form-item__label {
    font-weight: 700
  }
  .fw500{font-weight: 500;}
</style>
<style lang='scss'>
  .el-date-editor .el-range-separator {
    width: 10%;
  }
  .el-main {
    text-align: left !important;
    line-height: 1;
  }
  .el-select__caret {
    color: #409eff;
  }
  .el-dialog--center {
    color: #2b2b2b;
    margin-top: 30vh !important;
    width: 35%;
    background: url('../../image/bigbox.png') no-repeat center;
    background-size: 100% 101.5%;
    background-position: 0 -5px;
    .el-dialog__body {
      height: 90px;
      padding: 20px 0 10px 0;
    }
    .el-dialog__footer {
      height: 100px;
    }
    .el-icon-close {
      display: none;
    }
  }

</style>
