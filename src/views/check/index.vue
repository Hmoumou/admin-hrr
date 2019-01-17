<template>
  <div class="check">
    <div class="top">
      <el-card class="box-card carditem clearfix">
        <div slot="header" class="header clearfix"><span class="title">入住房间及订单</span></div>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <div class="left ">
                <el-form  label-width="140px" label-position='left'>
                  <el-form-item label="房型选择" prop="houseType" >
                    <el-select class="w300" 
                    v-model="formData.hotelid"
                    @change="handleGetCash"   
                    placeholder="请选择房型">
                      <el-option 
                      v-for="(item,index) in AData"
                      :key="index"
                      :label="item.houseinfo"
                      :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="预订房间数量" prop="roomamount">
                    <el-input class="w300" v-model="formData.roomamount" @blur="computeCount"></el-input>
                  </el-form-item>
                  <!--改编版-->
                  <el-form-item label="入住时间" prop="checkTime">
                    <el-date-picker
                      v-model="formData.starttime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="离店时间" prop="leaveTime">
                    <el-date-picker
                      v-model="formData.endtime"
                      type="date"
                      placeholder="选择日期"
                      @change="handleTime">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="房间编号" prop="roomnumber">
                    <el-input class="w300" v-model="formData.roomnumber"></el-input>
                  </el-form-item>
                  <el-form-item label="支付方式" prop="payType" class="payType">
                    <label :class="{active: formData.payType == 1}" @click="handlePayToZFB">
                      <input :value="1" type="radio" v-model="formData.payType" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: formData.payType == 2}" @click="handlePayToWX">
                      <input :value="2" type="radio" v-model="formData.payType" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: formData.payType == 3}" @click="handlePayToOnline">
                      <input :value="3" type="radio" v-model="formData.payType" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: formData.payType == 4}" @click="handlePayToMoney">
                      <input :value="4" type="radio" v-model="formData.payType" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="right  clearfix">
                <div class="right-data ">
                  <div class="item">房价<span class="span data">RMB {{formData.countPrice}}</span></div>
                  <div class="item">时间<span class="span data">{{formData.count}}/晚</span></div>
                  <div class="item">押金 <span class="span data">RMB {{formData.cashPledge}}</span></div>
                  <div class="lastItem">总金额<span class="span lastData">RMB {{formData.payCountPrice}}</span></div>
                  <div class="btnss fs14" @click="handleCheck">入住</div>
                  <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                    <div class="content" v-if="isSuccess">
                      <!-- <p class="fw">{{userData.username}}</p> -->
                      <p class="blue fs16 mb15 fw">入住成功</p>
                      <p>已成功入住{{userData.houseType}} <span class="blue" v-text="formData.roomnumber">{{formData.roomnumber}}</span> 室</p>
                    </div>
                    <div class="content" v-else>
                      <p class="blue fs16 mb15 fw">入住失败</p>
                      <p>{{userData.houseType}}<span class="blue">{{formData.roomnumber}}</span> 室,已被网上预订</p>
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
        <el-col :span="12" v-for="(item, index) in formData.hop" style="margin-bottom: 15px" :key="index">
          <div class="grid-content bg-purple">
            <el-card class="btm-left box-card carditem clearfix">
              <div slot="header" class="header"><span class="title">入住人0{{index + 1}}</span></div>
              <el-form  label-width="100px" label-position='left'>
                <el-form-item label="姓名" prop="name">
                  <el-input placeholder='请输入姓名' v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="card">
                  <!-- @blur="idVerify(index)"  -->
                  <el-input placeholder='请输入身份证号' v-model="item.card"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                  <!-- @blur="phoneVerify(index)" -->
                  <el-input placeholder='请输入联系电话'  v-model="item.mobile"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12" @click.native="handleAdduser()">
          <div class="grid-content bg-purple-light">
            <el-card class="btm-right box-card clearfix ">
              <div class="icon">
                <i class="iconfont icon-jiahao1"></i>
                <span class="add">添加入住人</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="box" v-if="Yes">
      <div class="box-inner">
        <div class="face">
          <span>{{username}}</span>
          <span>已成功入住{{houseType}} {{201}}室</span>
          <div class="btn" @click="handleOk">确定</div>
        </div>
        <div class="back">
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import moment from "moment"
  export default {
    name: 'Check',
    data() {
      return {
        centerDialogVisible: false, //弹框是否显示
        isSuccess: false,//是否成功入住
        getcashIndex:'',
        Yes: false, //是否入住成功
        isOk: true,
        // 入住订单绑定的数据
        formData: {
          // 需要上传的数据
          merchantid:this.$store.state.mchid,//商户id
          orderType:"2",//订单状态
          hotelid:'',
          orderSource:'酒店订单',//订单来源
          cashPledge:'0',//押金 （需要根据选择的房型渲染）
          starttime:'',//开始时间
          endtime:'',//开始时间,
          roomnumber:'',//房间编号
          payType:'1',
          count:'0',//入住天数 需自己计算
          countPrice:'0',//房间总价
          payCountPrice:'0',//订单支付总金额
          roomPrice:'',//房间单价
          roomamount:'1',//预订房间数量
          orderNumber:'', //订单编号
          name:'', //预订人姓名
          moble:'',//联系方式
          lateTime :'' , // 最晚到店时间        
          remark :'' ,  // 备注             
          preferentialPrice :'' , //优惠价格
          roomRefund  :'' ,  // 应退房费合计金额
          otherRefund :'' ,  //其他退款金额
          totalRefund :'' ,  //总计应退款金额
          sign :'' , //设备收款验签码        
          starttime :'' , // 开始时间      
          endtime :'' , // 结束时间      
          refusal :'' , //拒绝描述    
          renewType :'0' , // 续租状态0直接入住1续租
          hop: [
              {
                merchantid:this.$store.state.mchid,
                // idIsOk: false,
                // phoneIsOk: false,
                //需要数据
                name:'胡然然',
                card:'412722199502106143',
                mobile: '17335468823',
              }
            ],
            hoy:[
                {
                  merchantid:this.$store.state.mchid,//商户ID
                  price:"", //价格
                  ytd:"", //日期
                }
            ]
        },

        // 入住人数据
        userData: {
          username: '王小明',
          houseId: '110',
          houseType: '豪华大床房',
          IDcard: '',
          phone: ''
        },
        checkPay: 1,
        AData:[]
      }
    },
    methods: {
      computeCount(){//input失焦的时候计算总价
        this.formData.cashPledge = String(this.formData.cashPledge*this.formData.roomamount)
      },
      // 根据房型id的变化得到相对应的押金
      handleGetCash(){
        // console.log("触发了change事件...",this.formData)
        this.AData.map(item=>{       
          if(item.id == this.formData.hotelid){
            this.formData.cashPledge = item.cash
            this.formData.roomPrice = item.price
            // console.log(this.formData.countPrice)
          }
        })
      },

      // 选择结束时间之后进行的逻辑  需要请求接口拿到时间段内的房价
      handleTime(){
        var UNIX1 = Number(this.formData.starttime)
        var UNIX2 = Number(this.formData.endtime)
        if(UNIX2>UNIX1){
          var d = new Date(this.formData.starttime)
          var d1 = new Date(this.formData.endtime)
          this.formData.starttime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          this.formData.endtime = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
          // 拼接天数 总天数
          var days = d1.getTime()-d.getTime()
          var dayy = parseInt(days/(1000*60*60*24))
          //以下操作是为了求两个时间段之间的时间集合start
          var timeArr = [];
          var date1 = new Date(this.formData.starttime);
          var date2 = new Date(this.formData.endtime);
          var dateSpan = (date2.getTime() - date1.getTime()) / 86400000;
          // console.log(dateSpan); 
          // timeArr.push(moment(startDate).format("YYYY-MM-DD")); // 利用momentjs生成指定格式的字符串
          for(let i = 0; i < dateSpan; i++) {
              let startDate = new Date(this.formData.starttime); // 开始时间
              var nowDate = new Date(startDate.setDate(startDate.getDate()+i)); // setDate设置一个日期天数，getDate得到日期天数。然后返回一个新的日期的unix时间戳。然后利用new Date方法生成新的时间对象。
              timeArr.push(moment(nowDate).format("YYYY-MM-DD"))
          }
          // 时间集合end
          this.formData.count = String(dayy)
           var data = {
            merchantid:this.$store.state.mchid,
            hotelid:this.formData.hotelid,
            starttime:this.formData.starttime,
            endtime:this.formData.endtime,
            // price:this.formData.roomPrice
          }
            this.$axios.post('/zftds/hotel/house/selectHotelCalendar',data).then(res=>{
              console.log("res",res);
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
          this.$message.warning('入住时间不能为空且必须小于离店时间')
          this.formData.starttime = ''
          this.formData.endtime = ''
        }
      },
      // 身份证号验证
      // idVerify(index) {
      //   var reg = /(^\d{17}(\d|X|x)$)/
      //   if (!reg.test(this.formData.hop[index].card)) {
      //     this.$message.error('身份证格式填写错误')
      //   } else {
      //     this.formData.hop[index].idIsOk = true
      //   }
      // },
      // 手机号验证
      // phoneVerify(index) {
      //   var regs = /^1[3-9]\d{9}$/
      //   if (!regs.test(this.formData.hop[index].mobile)) {
      //     this.$message.error('手机号格式填写错误')
      //   } else {
      //     this.formData.hop[index].phoneIsOk = true
      //   }
      // },
      // 支付方式
      handlePayToWX() {
        // console.log('微信');
      },
      handlePayToZFB() {
        // console.log('支付宝');
      },
      handlePayToOnline() {
        // console.log('在线');
      },
      handlePayToMoney() {
        // console.log('现金支付');
      },
      // 点击添加一个新的入住人
      handleAdduser() {
        // 如果数据不为空且身份证号手机号验证通过
        if (this.formData.hop[this.formData.hop.length - 1].name &&
          this.formData.hop[this.formData.hop.length - 1].card &&
          this.formData.hop[this.formData.hop.length - 1].mobile 
          // this.formData.hop[this.formData.hop.length - 1].idIsOk &&
          // this.formData.hop[this.formData.hop.length - 1].phoneIsOk
          ) {
          //   添加一个新的空白入住人盒子
          this.formData.hop.push({
            merchantid:this.$store.state.mchid,
            name: '胡然然',
            // houseId: this.formData.hop[this.formData.hop.length - 1].houseId,
            // houseType: this.formData.hop[this.formData.hop.length - 1].houseType,
            card: '412722199502106143',
            mobile: '17335468823',
            // idIsOk: false,
            // phoneIsOk: false
          })
        } else {
          this.$message.warning('请先完善上一入住人信息哦~')
        }
      },
      handleCheck() {
        // console.log(this.formData);
        this.$axios.post('/zftds/hotel/order/insertHotelOrder',this.formData).then(res=>{
          // console.log(res)
          if(res.code == 1){
            this.centerDialogVisible = true
            this.isSuccess = true
            this.formData = {
                 // 需要上传的数据
              merchantid:this.$store.state.mchid,//商户id
              orderType:"2",//订单状态
              hotelid:'',
              orderSource:'酒店订单',//订单来源
              cashPledge:'0',//押金 （需要根据选择的房型渲染）
              starttime:'',//开始时间
              endtime:'',//开始时间,
              roomnumber:'',//房间编号
              payType:'1',
              count:'0',//入住天数 需自己计算
              countPrice:'0',//房间总价
              payCountPrice:'0',//订单支付总金额
              roomPrice:'',//房间单价
              roomamount:'',//预订房间数量
              orderNumber:'', //订单编号
              name:'', //预订人姓名
              moble:'',//联系方式
              roomPrice :'' , // 房间价格
              count :'' ,  // 入驻天数
              lateTime :'' , // 最晚到店时间        
              remark :'' ,  // 备注             
              preferentialPrice :'' , //优惠价格
              roomRefund  :'' ,  // 应退房费合计金额
              otherRefund :'' ,  //其他退款金额
              totalRefund :'' ,  //总计应退款金额
              sign :'' , //设备收款验签码        
              starttime :'' , // 开始时间      
              endtime :'' , // 结束时间      
              refusal :'' , //拒绝描述    
              renewType :'0' , // 续租状态0直接入住1续租
              hop: [
                  {
                    merchantid:this.$store.state.mchid,
                    name:'',
                    card:'',
                    mobile: '',
                  }
                ],
            }
          }else{
            this.centerDialogVisible = true
            this.isSuccess = false
          }
        })
      },
      handleOk() {
        this.isOk = false;
      },
      handleClose() {
        this.centerDialogVisible = false
      },
      // 得到房型信息与房价信息等
      getHotelData(){
        this.$axios.post('/zftds/hotel/house/selectHotelHouseS',{merchantid:this.$store.state.mchid}).then(res=>{
          // res.data.map(item=>{
          //   //  console.log(item.id,item.houseinfo,item.price,item.cash)
          //    })
          this.AData = [...res.data]
        })
      }
    },
    created() {
      this.getHotelData()
    }
  }
</script>

<style scoped lang='scss'>

  .top {
    .payType {
      label {
        box-sizing: border-box;
        display: inline-block;
        width: 92px;
        height: 56px;
        margin-right: 15px;
        border: 1px solid transparent;
        &:nth-of-type(1) {
          background: url('../../image/办理入住/支付宝.png') no-repeat #f1f1f1 center;
          background-size: 75%;
        }
        &:nth-of-type(2) {
          background: url('../../image/办理入住/微信支付.png') no-repeat #f1f1f1 center;
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
        .span { float: right;}
        .item {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .data { color: #409eff; }
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
    margin-top: 10px;
    .btm-left { padding: 10px; }
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
  }
  .content {
    margin-top: 20px;
    text-align: center;
    line-height: 2;
    color: #333;
  }
  /deep/ .el-form-item__label {  font-weight: 700}
  /deep/ .el-input__inner { padding-left: 30px;}
</style>
<style lang='scss'>
  .el-date-editor .el-range-separator {  width: 10%;}
  .el-main {
    text-align: left !important;
    line-height: 1;
  }
  .el-select__caret {color: #409eff;}
 
  .el-dialog--center {
    color: #2b2b2b;
    margin-top: 30vh !important;
    width: 35%;
    background: url('../../image/bigbox.png') no-repeat center;
    background-size: 100% 101.5%;
    background-position: 0 -5px;
    .el-dialog__body {
      // height: 60px;
      padding: 20px 0 10px 0;
    }
    .el-dialog__footer { height: 100px;}
    .el-icon-close { display: none;}
  }

</style>
