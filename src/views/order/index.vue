<template>
  <div class="order">
    <div class="orderScreen clearfix">
      <el-card class="box-card carditem clearfix order-item" df>
        <div slot="header" class="header clearfix">
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleMore">
            更多搜索选项
            <i class="iconfont icon-arw-top-copy" :class="{'active-rotate': moreSearch}"></i>
          </el-button>
          <div class="seachBox clearfix">
            <div class="seek-box">
              <input type="text" v-model="boxData.searchdata" placeholder="订单号/预定人/预订人手机号">
              <div class="seek" @click="handleSearch">搜索</div>
            </div>
          </div>
          <span class="title mt10 fll">订单筛选</span>
          <!-- <div class="searchBox" :model="searchData">
            <i class="iconfont icon-sousuo"></i>
            <el-input v-model="searchData.text" placeholder="订单号/预订人/预订人手机号" class="input"></el-input>
            <el-button type="primary" class="btn" @click="">搜索</el-button>
          </div>-->
        </div>

        <transitionBox v-model="moreSearch">
          <div class="dialog">
            <el-form>
              <el-form-item label="按房型选择">
                <el-select v-model="typeSearch" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="按时间选择" class="clearfix">
                <el-button type="primary" class="flr">查询</el-button>
                <!-- <el-date-picker
                 v-model="dateSearch"
                 type="datetime"
                 placeholder="选择日期时间">
                </el-date-picker>-->
                <el-date-picker v-model="dateSearch" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </transitionBox>
      </el-card>
    </div>
    <div class="orderDetails">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="1">全部订单</el-menu-item>
        <el-menu-item index="2">未处理订单</el-menu-item>
        <el-menu-item index="3">已接单订单</el-menu-item>
        <el-menu-item index="4">已入住订单</el-menu-item>
        <el-menu-item index="5">已离店订单</el-menu-item>
        <el-menu-item index="6">失效订单</el-menu-item>
      </el-menu>

      <el-card class="clearfix">
        <div class="orderDetail-right flr">
          <el-card class="box-card carditem">
            <div slot="header" class="header">
              <span class="title">订单详情</span>
            </div>

            <div class="table">
              <table class="mb15">
                <tr>
                  <th>订单编号</th>
                  <td class="blue">{{searchData[dataIndex].orderNumber}}</td>
                  <th>订单状态</th>
                  <td class="blue fw fs16">
                      {{searchData[dataIndex].orderType==0?
                      "未处理":searchData[dataIndex].orderType==1?
                      "已接单":searchData[dataIndex].orderType==2?
                      "已入住":searchData[dataIndex].orderType==3?
                      "已离店":"失效"}}订单</td>
                </tr>
              </table>
              <table class="mb15">
                <tr class="bg">
                  <th>预订人姓名</th>
                  <td>{{searchData[dataIndex].name}}</td>
                  <th>预订房型</th>
                  <td class="blue fw fs16">{{searchData[dataIndex].houseinfo}}</td>
                </tr>
                <tr>
                  <th>预订人电话</th>
                  <td>{{searchData[dataIndex].moble}}</td>
                  <th>房间价格</th>
                  <td>{{searchData[dataIndex].roomPrice}}</td>
                </tr>
                <tr class="bg">
                  <th>预订日期</th>
                  <td>
                    <p
                      class="blue"
                    >{{searchData[dataIndex].starttime}}-{{searchData[dataIndex].endtime}}</p>
                    <span>(共
                      <span class="blue">{{searchData[dataIndex].count}}</span>晚)
                    </span>
                  </td>
                  <th>最晚抵店时间</th>
                  <td>{{searchData[dataIndex].lateTime}}</td>
                </tr>
              </table>

              <table class="mb15">
                <tr class="bg">
                  <th>支付方式</th>
                  <td>{{searchData[dataIndex].payType}}</td>
                  <th>订单来源</th>
                  <td>{{searchData[dataIndex].orderSource}}</td>
                </tr>
                <tr>
                  <th>押金金额</th>
                  <td class="blue">RMB {{searchData[dataIndex].cashPledge}}</td>
                  <th>总计房间价格</th>
                  <td class="blue fw fs14">RMB {{searchData[dataIndex].countPrice}}</td>
                </tr>
                <tr class="bg">
                  <th>合计金额</th>
                  <td class="blue fw fs14">RMB {{searchData[dataIndex].payCountPrice}}</td>
                  <th>优惠价格</th>
                  <td class="blue fw fs14">RMB {{searchData[dataIndex].preferentialPrice}}</td>
                </tr>
              </table>
              <table class="desc mb15">
                <tr>
                  <th>备注</th>
                  <td>{{searchData[dataIndex].remark}}</td>
                </tr>
              </table>
              <!-- 新加入住人 -->
              <table class="mb15 addtable">
                <tr v-for="(item,ind) in searchData[dataIndex].hop" :key="ind">
                  <th>入住人姓名</th>
                  <!-- <td>{{searchData[dataIndex].username}}</td> -->
                  <td>item.name</td>
                  <th>身份证号</th>
                  <!-- <td>{{searchData[dataIndex].userid}}</td> -->
                  <td>item.card</td>
                </tr>
                <tr v-if="iSadd" v-for="(item,ind) in addpeople" :key="ind">
                  <th>入住人姓名</th>
                  <td>
                    <el-input placeholder="请输入入住人姓名" v-model="item.username"></el-input>
                  </td>
                  <th>身份证号</th>
                  <td>
                    <el-input placeholder="入住人身份证号" v-model="item.userid"></el-input>
                  </td>
                </tr>
              </table>
              <!-- 未处理订单 -->
              <div class="untreated clearfix" v-if="isUntreated">
                <el-button class="flr" type="primary" @click="dialogFormVisible = true">拒绝订单</el-button>
                <el-button class="fll" type="primary" @click="handleUntreated">接受订单</el-button>
                <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible">
                  <el-input v-model="searchData[dataIndex].loseCause"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleRefase">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
              <!-- 已接单订单 -->
              <div class="accepted" v-if="isAccepted">
                <table class="table4">
                  <tr>
                    <th>分配房间号</th>
                    <td class="need">
                      <el-input v-model="searchData[dataIndex].roomnumber" placeholder="请输入房间号"></el-input>
                    </td>
                  </tr>
                </table>
                <div class="btn-roomsid" style="width:225px;margin:10px auto;">
                  <el-button
                    type="primary"
                    style="width:108px;display:inline-block"
                    @click="addPeople"
                  >添加入住人</el-button>
                  <el-button
                    type="primary"
                    style="width:98px;display:inline-block"
                    @click="handleRoomId"
                  >确定</el-button>
                </div>
              </div>
              <!-- 已入住订单 -->
              <div class="insert clearfix" v-if="isInsert">
                <el-button class="flr" type="primary" style="width:98px" @click="handleGoon">续 住</el-button>
                <el-button
                  class="fll"
                  type="primary"
                  style="width:98px"
                  @click="dialogVisible = true"
                >离 店</el-button>
                <el-dialog title="离店办理" :visible.sync="dialogVisible">
                  <div class="mian">
                    <div class="leave-Details">
                      <p class="fw">订单详情</p>
                      <div class="dialog-table">
                        <table class="last-table">
                          <tr>
                            <th>订单编号</th>
                            <td>{{searchData[dataIndex].orderNumber}}</td>
                            <th>房间号</th>
                            <td>{{searchData[dataIndex].roomnumber}}</td>
                          </tr>
                          <tr>
                            <th>订房人姓名</th>
                            <td>{{searchData[dataIndex].name}}</td>
                            <th>联系电话</th>
                            <td>{{searchData[dataIndex].moble}}</td>
                          </tr>
                          <tr>
                            <th>预订日期</th>
                            <td>{{searchData[dataIndex].starttime}}-{{searchData[dataIndex].endtime}}
                                (共{{searchData[dataIndex].count}}晚)</td>
                            <th>实住日期</th>
                            <!-- 需计算实住日期 -->
                            <!-- 需计算实住日期 -->
                            <!-- 需计算实住日期 -->
                            <!-- 需计算实住日期 -->
                            <td>{{searchData[dataIndex].starttime}}-{{searchData[dataIndex].endtime}}
                                (共{{searchData[dataIndex].count}}晚)</td>
                          </tr>
                          <tr>
                            <th>押金金额</th>
                            <td>{{searchData[dataIndex].cashPledge}}</td>
                            <th>其他金额</th>
                            <td>
                              <el-input placeholder="请输入消费金额"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <th>{{searchData[dataIndex].payCountPrice}}</th>
                            <td></td>
                            <!-- 需计算实际金额 -->
                            <!-- 需计算实际金额 -->
                            <!-- 需计算实际金额 -->
                            <!-- 需计算实际金额 -->
                            <th>实际金额</th>
                            <td>799.6</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div class="backMoney-Details">
                      <p class="fw">退款详情</p>
                      <div class="dialog-table">
                        <table class="last-table">
                          <tr>
                            <th>押金</th>
                            <td>{{searchData[dataIndex].cashPledge}}</td>
                            <!-- 自己计算出的应退还的房费 -->
                            <!-- 自己计算出的应退还的房费 -->
                            <!-- 自己计算出的应退还的房费 -->
                            <!-- 自己计算出的应退还的房费 -->
                            <th>应退还房费</th>
                            <td>1199.4</td>
                          </tr>
                          <tr>
                            <!--这边也是  -->
                            <!--这边也是  -->
                            <!--这边也是  -->
                            <th>其他消费</th>
                            <td>15</td>
                            <th>合计</th>
                            <td>RMB 1384.4</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleLeaveYES">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
              <!-- 已离店订单 -->
              <div class="isLeave" v-if="isLeave">
                <table class="table4">
                  <tr>
                    <th>订单评价</th>
                    <td>{{searchData[dataIndex].evaluate}}</td>
                  </tr>
                </table>
              </div>
              <!-- 失效订单 -->
              <div class="disabledOrder" v-if="isLose">
                <table class="table4">
                  <tr>
                    <th>失效原因</th>
                    <td>{{searchData[dataIndex].refusal}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-card>
        </div>
        <div class="orderDetail-left clearfix">
          <div class="searchTitle clearfix">
            <span class="span flr">共{{searchData.length}}条消息</span>
            <span v-if="iSseach" class="span">查询 "{{boxData.searchdata}}"</span>
            <span v-if="!iSseach" class="span">订单列表</span>
          </div>
          <el-scrollbar class="scollbar">
            <div class="searchContent clearfix" v-for="(item, index) in searchData" :key="index">
              <el-card
                class="clearfix parts"
                :class="{active: dataIndex == index}"
                @click.native="activeData(index)"
              >
                <div class="type clearfix part">
                    <!-- 最晚到点时间 -->
                  <!-- <span class="flr overTime">{{item.lateTime}}</span> -->
                  <el-button type="primary" class="none"> {{item.orderType==0?
                      "未处理":item.orderType==1?
                      "已接单":item.orderType==2?
                      "已入住":item.orderType==3?
                      "已离店":"失效"}}</el-button>
                  <span class="blue ml5" >{{item.orderNumber}}</span>
                </div>
                <div class="roomType part">
                  <span class="flr fs14">共
                    <span class="blue">{{item.roomamount}}</span> 间
                  </span>
                  <strong class="fw fs14" >
                   {{item.houseinfo}}
                   </strong>
                </div>
                <div class="user mb5 fs14">{{item.name}}</div>
                <div class="totalMoney part fs14">{{item.payCountPrice}}</div>
                <div class="startTime clearfix fs14">
                  <div class="flr fw fs14">共
                    <span class="blue">{{item.count}}</span> 晚
                  </div>
                  <span class="blue">{{item.starttime}}</span> 至
                  <span class="blue">{{item.endtime}}</span>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import transitionBox from "@/components/transitionBox";
export default {
  name: "order",
  components: {
    transitionBox
  },
  data() {
    return {
      iSseach:false,//是否为查询到的订单
      iSadd: false,
      moreSearch: true, //更多搜索选项
      dialogVisible: false, //离店弹框
      dialogFormVisible: false, //拒绝订单弹框
      isUntreated: false, //是否未处理
      isAccepted: false, //是否已接单
      isInsert: false, //是否已入住
      isLeave: false, //是否已离店
      isLose: false, //是否已失效
      isClick: true,
      activeIndex: "1",
      dataIndex: 0,
      //入住人数组
      addpeople: [],
      boxData: {
        // username:'梁朝伟',
        searchdata: ""
      },
      dateSearch: "", //按时间搜索
      typeSearch: "", //按房型搜索
      options: [
        {
          value: "1",
          label: "豪华大床房1"
        },
        {
          value: "2",
          label: "豪华大床房3"
        },
        {
          value: "3",
          label: "豪华大床房4"
        }
      ],
      houseType:[//里面存放获取带的房型信息

      ],
      searchData: [
          //里面存放请求回来的订单
       ]
    };
  },
  methods: {
    // 添加入住人
    addPeople() {
    //   console.log(this.addpeople.length);
      if (this.addpeople.length == 0) {
        this.addpeople.push({
          username: "",
          userid: ""
        });
        this.iSadd = true;
      } else {
        if (
          this.addpeople[this.addpeople.length - 1].username &&
          this.addpeople[this.addpeople.length - 1].userid
        ) {
          this.addpeople.push({
            username: "",
            userid: ""
          });
        } else {
          this.$message.warning("请先完善上一入住人信息哦~");
        }
      }
    },
    handleMore() {
      this.moreSearch = !this.moreSearch;
    }, //点击更多-----搜索
    handleRoomId() {}, //分配房间号
    handleLeaveYES() {}, //确认离店，退押金
    handleGoon() {
      this.$router.push("/layout/still/still");
    }, //点击续住
    // 点击接受订单
    handleUntreated() {
      console.log("okok");
      // this.$axios.post('').then(res=>{
      //     console.log(res)
      // })
    },
    // 点击拒绝订单
    handleRefase() {
      // this.$axios.post("").then(res=>{
      //     comsole.log(res)
      // })
      this.dialogFormVisible = false;
      console.log("我拒绝");
    },
    handleSearch(e) {
      //点击搜索进行验证
      let reg1 = /^[\u4e00-\u9fa5]{1,}$/; //输入的为汉字
      let reg2 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //手机号验证
      if (reg1.test(this.boxData.searchdata)) {
        console.log("可以按名字搜索了..");
      } else if (reg2.test(this.boxData.searchdata)) {
        console.log("可以按手机号搜索了..");
      } else {
        console.log("全部去订单里吧..");
      }
      // 点击限制
      // if(this.isClick){
      //     this.isClick = false
      //     console.log(e);
      //     console.log('111111');
      //     setTimeout(()=>{
      //         this.isClick = true
      //     },4000)
      // }
    },
    getOrder() {
      this.$axios.post("/zftds/hotel/order/selectHotelOrder", {
          merchantid: this.$store.state.mchid
        }).then(res => {
          console.log(res);
          if(res.code == 1){
              this.searchData = [...res.data];
          }else{
              this.$message.warning("暂无订单信息，建议先添加订单哦~")
              setTimeout(()=>{
                  this.$router.push('/layout/check')
              },500)
          }
          
        //   console.log(this.searchData);
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.dataIndex = 0;
      this.activeIndex = key;
      console.log("index", this.activeIndex);
    },
    activeData(index) {
      this.dataIndex = index;
    }
  },
  created() {
    // this.getHouseType()
    this.getOrder();
  },
  watch: {
    activeIndex(val) {
      if (val == 1) {
        (this.isUntreated = false), //是否未处理
          (this.isAccepted = false), //是否已接单
          (this.isInsert = false), //是否已入住
          (this.isLeave = false), //是否已离店
          (this.isLose = false);
      } else if (val == 2) {
        (this.isInsert = false), //是否已入住
          (this.isLose = false), //是否已失效
          (this.isAccepted = false), //是否已接单
          (this.isLeave = false), //是否已离店
          (this.isUntreated = true);
      } else if (val == 3) {
        (this.isUntreated = false), //是否未处理
          (this.isInsert = false), //是否已入住
          (this.isLose = false), //是否已失效
          (this.isLeave = false), //是否已离店
          (this.isAccepted = true);
      } else if (val == 4) {
        (this.isUntreated = false), //是否未处理
          (this.isAccepted = false), //是否已接单
          (this.isLose = false), //是否已失效
          (this.isLeave = false), //是否已离店
          (this.isInsert = true);
      } else if (val == 5) {
        (this.isUntreated = false), //是否未处理
          (this.isAccepted = false), //是否已接单
          (this.isInsert = false), //是否已入住
          (this.isLose = false);
        this.isLeave = true;
      } else if (val == 6) {
        (this.isUntreated = false), //是否未处理
          (this.isAccepted = false), //是否已接单
          (this.isInsert = false), //是否已入住
          (this.isLeave = false), //是否已离店
          (this.isLose = true);
        console.log(this.isLose);
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.icon-arw-top-copy {
  transition: transform ease 0.1s;
  width: 16px;
  height: 16px;
  line-height: 1;
  display: inline-block;
}
.active-rotate {
  transform: rotateZ(-90deg);
}
//新加的添加入住人
.addtable {
  tr:nth-child(even) {
    td:nth-child(even) {
      /deep/ input.el-input__inner {
        background: #fff;
        padding: 10px;
      }
    }
  }
  tr:nth-child(odd) {
    td:nth-child(even) {
      /deep/ input.el-input__inner {
        background: #f7faff;
        padding: 10px;
      }
    }
  }
  // f7faff
}
// 切换订单是的active
/deep/ .el-menu--horizontal > .el-menu-item.is-active {
  // border: none;
  background: url("../../image/办理入住/矩形111.png") no-repeat;
  background-size: 100%;
  color: #fff;
}
/deep/ .el-menu--horizontal > .el-menu-item {
  width: 150px;
  height: 45px;
  line-height: 45px;
  border: 1px solid #f0f5ff;
  background: #f7faff;
  padding: 0 40px;
  // color: #518dfd;
}
// 新增样式
.untreated {
  //未处理订单
  margin: 0 auto;
  width: 240px;
  margin-top: 40px;
}
/deep/ input.el-input__inner {
  padding-left: 20px;
}
// 已接单
.need {
  background: #eff5ff;
  /deep/ .el-input__inner{
      background: #f7faff;
  }
}
//已入住
.insert {
  margin: 0 auto;
  width: 240px;
  margin-top: 40px;
  .dialog-table {
    // border: 1px solid #d6e4ff;
    margin: 10px;
  }
  .last-table {
    border-collapse: collapse;
    tr:nth-child(odd) {
      background: #f7faff;
      margin-bottom: 0;
    }
    /deep/ .el-input__inner {
      background: #fff;
    }
  }
}

.parts {
  border: 1px solid #f1f1f1;
  margin-bottom: 15px;
  border-radius: 0px;
}
.active {
  border: 1px solid #9dccfa;
  background: #edf3ff;
}
.order {
  box-sizing: border-box;
  // overflow-x: hidden;
  //顶部查询框样式
  .orderScreen {
    /deep/ .dy-transition-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: #f9fafd;
      border: 1px solid #dbe7ff;
      z-index: 998;
    }

    /deep/ .el-card {
      overflow: visible;
    }

    /deep/ .el-card__body {
      position: relative;
      padding: 0;
    }
    /deep/ .el-button {
      width: 200px;
      line-height: 1.5;
      font-size: 14px;
    }
    // border: 0.1px solid #fff;
    .dialog {
      /deep/ .el-input__inner {
        padding-left: 25px;
        border: 1px solid #b3ccff;
        background: #fff;
      }
    }
    .carditem {
      /*margin: ;*/
      $rMargin: -11px;
      margin: $rMargin $rMargin 0 $rMargin;
    }
    .seachBox {
      margin-top: 5px;
      float: right;
      margin-right: 20px;
    }
    .seek-box {
      display: inline-block;
      width: 316px;
      font-size: 12px;
      box-sizing: border-box;
      line-height: 36px;
      input {
        box-sizing: border-box;
        height: 36px;
        width: 260px;
        padding-left: 50px;
        outline: none;
        color: #666;
        background: url("../../image/评价管理/图标切图_03_11.png") no-repeat
          10px center;
        background-size: 16px;
        border: 1px solid #b3ccff;
        border-top-left-radius: 18px 50%;
        border-bottom-left-radius: 18px 50%;
        border-right: none;
      }
      .seek {
        display: inline-block;
        float: right;
        width: 56px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        /*margin-top: 1px;*/
        background: #518dfd;
        height: 36px;
        // border: 1px solid #518dfd;
        border-top-right-radius: 18px 50%;
        border-bottom-right-radius: 18px 50%;
        user-select: none;
      }
      .seek:active {
        background: #409eff;
      }
    }
  }
}
//下面订单详情样式
.orderDetails {
  margin-top: 10px;
  .orderDetail-left {
    padding-right: 12px;
    width: 35%;
    height: 100vh;
    overflow-y: hidden;
    .scollbar {
      height: 100%;
    }
    .part {
      margin-bottom: 10px;
    }
    .searchTitle {
      margin-bottom: 15px;
    }
    .span {
      font-size: 12px;
      color: #c1c1c1;
    }
    .overTime {
      font-size: 12px;
      line-height: 28px;
    }
    .totalMoney {
      color: #c6c9d0;
      line-height: 1.2;
    }
  }
  .orderDetail-right {
    width: 60%;
    /deep/ .el-card__header,
    .el-card {
      border: none;
      overflow: auto;
    }
    .table {
      table {
        // margin-bottom: 15px;
        border-collapse: collapse;
        text-align: center;
        border: 1px solid #d6e4ff;
        width: 100%;
        tr:nth-child(odd) {
          th {
            background: #f0f5ff;
          }
          td {
            background: #f7faff;
          }
        }
        th {
          height: 45px;
          width: 21%;
          background: #f7faff;
          font-size: 14px;
        }
        td {
          height: 45px;
          width: 29%;
          font-size: 12px;
        }
      }
      .desc {
        height: 60px;
        width: 100%;
        th {
          height: 60px;
          width: 22%;
          background: #f7faff;
        }
        td {
          width: 78%;
          height: 60px;
          font-size: 14px;
          color: #b9b9b9;
        }
      }
      .table4 {
        th {
          height: 45px;
          width: 22%;
          background: #f7faff;
        }
        td {
          width: 78%;
          height: 45px;
          font-size: 14px;
          color: #b9b9b9;
        }
      }
    }
  }
}

.title {
  padding-left: 6px;
  border-left: 3px solid #75b8fc;
}
.header {
  font-weight: 700;
}
// .order-item {/deep/ .el-card__body {display: none; }}
.mt10 {
  margin-top: 10px;
}
</style>
<style>
.el-main {
  text-align: left;
  line-height: 1;
}
.el-input__inner {
  padding: 0;
  background: #f9fbff;
  border: none;
  height: 36px;
  line-height: 36px;
}
.el-button {
  border-radius: 20px;
  padding: 6px 20px;
  font-size: 14px;
}
.el-button--text {
  font-size: 14px;
  margin-top: 9px;
}
.mb15 {
  margin-bottom: 15px;
}
</style>
