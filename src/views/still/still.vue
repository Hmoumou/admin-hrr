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
                <el-form :model='formData' label-width="140px" label-position='left'>
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
                      placeholder="选择日期时间">
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
                  <div class="item">房价<span class="span data">RMB {{formData.price}} /晚</span></div>
                  <div class="item">时间<span class="span data">{{formData.long}}/晚</span></div>
                  <div class="item">押金 <span class="span data">RMB {{formData.earnest}}</span></div>
                  <div class="lastItem">总金额<span class="span lastData">RMB {{formData.total}}/晚</span></div>
                  <div class="btnss fs14" @click="handleCheck">办理续住</div>
                  <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                    <div class="content" v-if="isSuccess">
                      <p class="fw">{{formData.username}}</p>
                      <p>已成功入住{{formData.houseType}} <span class="blue">{{formData.houseId}}</span> 室</p>
                    </div>
                    <div class="content" v-else>
                      <p class="blue fs16 mb15 fw">入住失败</p>
                      <p>{{formData.houseType}} <span class="blue">{{formData.houseId}}</span> 室,已被网上预订</p>
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
          <span>已成功入住{{formData.houseType}} {{201}}室</span>
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
        Yes: false,
        isOk: true,
        checkPay: 2,
        // 入住订单绑定的数据
        formData: {},
        Data:{
          endtime:'',
          merchantid:"",//商户ID
          hoy:[
            {
              merchantid:"",//商户ID
              price:"",  //价格
              ytd :"",//日期
            }
          ],
          price:"",  //价格
          ytd :"",//日期
        },
        formData1: {
           hop: [
          {
            name: '小明',
            card: '2018',
            mobile: '110',
          }
        ]
        },


      }
    },
    methods: {
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
        this.centerDialogVisible = true
      },
      handleOk() {
        this.isOk = false;
      },
      handleClose() {
        this.centerDialogVisible = false
      }
    },
    created() {
      console.log(this.$route.query);
      this.formData = this.$route.query
      console.log(this.formData);
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
