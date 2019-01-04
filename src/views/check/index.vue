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
                    v-model="formData.houseType"
                    @change="handleGetCash()"   
                    placeholder="请选择房型">
                      <el-option 
                      v-for="(item,index) in AData"
                      :key="index"
                      :label="item.houseinfo"
                      :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!--改编版-->
                  <el-form-item label="入住时间" prop="checkTime">
                    <!-- <el-date-picker
                      v-model="formData.starttime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker> -->
                    <el-date-picker
                      v-model="formData.starttime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="离店时间" prop="leaveTime">
                    <!-- <el-date-picker
                      v-model="formData.endtime"
                      type="datetime"
                      placeholder="选择日期时间"
                      >
                    </el-date-picker> -->
                    <el-date-picker
                      v-model="formData.endtime"
                      type="date"
                      placeholder="选择日期"
                      @change="handleTime">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="房间编号" prop="houseId">
                    <el-input class="w300" v-model="formData.houseId"></el-input>
                  </el-form-item>
                  <el-form-item label="支付方式" prop="payType" class="payType">
                    <label :class="{active: checkPay == 1}" @click="handlePayToZFB">
                      <input :value="1" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 2}" @click="handlePayToWX">
                      <input :value="2" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 3}" @click="handlePayToOnline">
                      <input :value="3" type="radio" v-model="checkPay" class="radio-input" name="pay">
                      <div class="dui"></div>
                    </label>
                    <label :class="{ active: checkPay == 4}" @click="handlePayToMoney">
                      <input :value="4" type="radio" v-model="checkPay" class="radio-input" name="pay">
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
                  <div class="item">房价<span class="span data">RMB {{formData.price}}</span></div>
                  <div class="item">时间<span class="span data">{{formData.long}}/晚</span></div>
                  <div class="item">押金 <span class="span data">RMB {{formData.cash}}</span></div>
                  <div class="lastItem">总金额<span class="span lastData">RMB {{formData.total}}</span></div>
                  <div class="btnss fs14" @click="handleCheck">入住</div>
                  <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                    <div class="content" v-if="isSuccess">
                      <p class="fw">{{userData.username}}</p>
                      <p>已成功入住{{userData.houseType}} <span class="blue">{{userData.houseId}}</span> 室</p>
                    </div>
                    <div class="content" v-else>
                      <p class="blue fs16 mb15 fw">入住失败</p>
                      <p>{{userData.houseType}} <span class="blue">{{userData.houseId}}</span> 室,已被网上预订</p>
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
        <el-col :span="12" v-for="(item, index) in arr" style="margin-bottom: 15px" :key="index">
          <div class="grid-content bg-purple">
            <el-card class="btm-left box-card carditem clearfix">
              <div slot="header" class="header"><span class="title">入住人0{{index + 1}}</span></div>
              <el-form :model='userData' label-width="100px" label-position='left'>
                <el-form-item label="姓名" prop="username">
                  <el-input placeholder='请输入姓名' v-model="item.username"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="IDcard">
                  <el-input placeholder='请输入身份证号' @blur="idVerify(index)" v-model="item.idCard"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                  <el-input placeholder='请输入联系电话' @blur="phoneVerify(index)" v-model="item.phone"></el-input>
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
    <div class="box" v-if="Yes">
      <div class="box-inner">
        <div class="face">
          <span>{{username}}</span>
          <span>已成功入住{{houseType}} {{201}}室</span>
          <div class="btn" @click="handleOk">确定</div>
        </div>
        <div class="back">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Check',
    data() {
      return {
        centerDialogVisible: false,
        isSuccess: false,
        getcashIndex:'',
        Yes: false,
        isOk: true,
        // 入住订单绑定的数据
        formData: {
          price: "0",
          long: "0",
          cash: "0",
          total: "0",

          houseType: '',
          check: '',
          leaveTime: '',      
          houseId: '',
          // payType: '1',
          // 需要上传的数据
          merchantid:this.$store.state.mchid,//商户id
          orderType:2,
          hotelid:'',
          orderSource:'',//订单来源
          cashPledge:'',//押金 （需要根据选择的房型渲染）
          starttime:'',//开始时间
          endtime:'',//开始时间,
          roomnumber:'',//分配的房间编号
          payType:'1',
          count:'',//入住天数 需自己计算
          payCountPrice:'',//订单支付总金额
          roomPrice:'',//房间单价
          roomamount:1//房间数量
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
        arr: [
          {
            username: '',
            houseId: '',
            houseType: '',
            idCard: '',
            phone: '',
            idIsOk: false,
            phoneIsOk: false,
          }
        ],
        AData:[

        ]
      }
    },
    methods: {
      // 根据房型id的变化得到相对应的押金
      handleGetCash(index){
        console.log("触发了change事件...",this.formData.houseType)
        this.AData.map(item=>{       
          if(item.id == this.formData.houseType){
            this.formData.cash = item.cash
          }
        })
      },
      // 选择结束时间之后进行的逻辑  需要请求接口拿到时间段内的房价
      handleTime(){
        var UNIX1 = Number(this.formData.starttime)
        var UNIX2 = Number(this.formData.endtime)
        // console.log(UNIX1,UNIX2)
        if(UNIX2>UNIX1){
          var d = new Date(this.formData.starttime)
          var d1 = new Date(this.formData.endtime)
          this.formData.starttime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          this.formData.endtime = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
          // console.log('this.formData',this.formData.starttime,this.formData.endtime)
          var data = {
            merchantid:this.$store.state.mchid,
            hotelid:this.formData.houseType,
            starttime:this.formData.starttime,
            endtime:this.formData.endtime
          }
            this.$axios.post('/zftds/hotel/house/selectHotelCalendar',data).then(res=>{
              console.log(res)
            })
        }else{
          this.$message.warning('入住时间不能为空且必须小于离店时间')
          this.formData.starttime = ''
          this.formData.endtime = ''
        }
      },
      // 身份证号验证
      idVerify(index) {
        var reg = /(^\d{17}(\d|X|x)$)/
        if (!reg.test(this.arr[index].idCard)) {
          this.$message.error('身份证格式填写错误')
        } else {
          this.arr[index].idIsOk = true
        }
      },
      // 手机号验证
      phoneVerify(index) {
        var regs = /^1[3-9]\d{9}$/
        if (!regs.test(this.arr[index].phone)) {
          this.$message.error('手机号格式填写错误')
        } else {
          this.arr[index].phoneIsOk = true
        }
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
      // 点击添加一个新的入住人
      handleAdduser() {
        // 如果数据不为空且身份证号手机号验证通过
        if (this.arr[this.arr.length - 1].username &&
          this.arr[this.arr.length - 1].idCard &&
          this.arr[this.arr.length - 1].phone &&
          this.arr[this.arr.length - 1].idIsOk &&
          this.arr[this.arr.length - 1].phoneIsOk) {
          //   添加一个新的空白入住人盒子
          this.arr.push({
            username: '',
            houseId: this.arr[this.arr.length - 1].houseId,
            houseType: this.arr[this.arr.length - 1].houseType,
            idCard: '',
            phone: '',
            idIsOk: false,
            phoneIsOk: false
          })
        } else {
          this.$message.warning('请先完善上一入住人信息哦~')
        }
      },
      handleCheck() {
        this.centerDialogVisible = true
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
          // res.data.map(item=>{ // console.log(item.id,item.houseinfo,item.price,item.cash)})
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

  .el-input__inner {
    padding-left: 20px;
  }

  .el-dialog--center {
    color: #2b2b2b;
    margin-top: 30vh !important;
    width: 35%;
    background: url('../../image/bigbox.png') no-repeat center;
    background-size: 100% 101.5%;
    background-position: 0 -5px;
    .el-dialog__body {
      height: 60px;
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
