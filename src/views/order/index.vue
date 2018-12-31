<template>
  <div class="order">
    <div class="orderScreen clearfix">
      <el-card class="box-card carditem clearfix order-item">
        <div slot="header" class="header clearfix">
          <el-button style="float: right; padding: 3px 0" type="text">更多搜索选项
            <i class="iconfont icon-arw-top-copy"></i>
          </el-button>
          <span class="title">订单筛选</span>
          <!-- <div class="searchBox" :model="searchData">
            <i class="iconfont icon-sousuo"></i>
            <el-input v-model="searchData.text" placeholder="订单号/预订人/预订人手机号" class="input"></el-input>
            <el-button type="primary" class="btn" @click="">搜索</el-button>
          </div> -->
           <div class="seachBox  clearfix">
                <div class="seek-box">
                    <input type="text" v-model="boxData.username" placeholder="订单号/预定人/预订人手机号">
                    <div class="seek" @click="handleSearch">搜索</div>
                </div>
           </div>

        </div>
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
                    <div slot="header" class="header"><span class="title">订单详情</span> </div>

                    <div class="table" >
                        <table class="table1">
                            <tr>
                                <th>订单编号</th>
                                <td class="blue">{{searchData[dataIndex].totalMoney}}</td>
                                 <th>订单状态</th>
                                <td class="blue fw fs16">{{searchData[dataIndex].type}}</td>
                            </tr>
                        </table>
                         <table class="table2">
                            <tr class="bg">
                                <th>预订人姓名</th>
                                <td >{{searchData[dataIndex].username}}</td>
                                 <th>预订房型</th>
                                <td class="blue fw fs16">{{searchData[dataIndex].houseType}}</td>
                            </tr>
                            <tr>
                                <th>预订人电话</th>
                                <td>{{searchData[dataIndex].userPhonenum}}</td>
                                <th>房间价格</th>
                                <td>{{searchData[dataIndex].price}}</td>
                            </tr>
                            <tr class="bg">
                                <th>预订日期</th>
                                <td class="blue">{{searchData[dataIndex].orderDate}} <span>共<span class="blue">1</span>晚</span></td>
                                <th>最晚抵店时间</th>
                                <td>{{searchData[dataIndex].endTime}}</td>
                            </tr>
                        </table>
                        <table class="desc">
                            <tr>
                                <th>备注</th>
                                <td>{{searchData[dataIndex].desc}}</td>
                            </tr>
                        </table>
                         <table class="table3">
                            <tr class="bg">
                                <th>支付方式</th>
                                <td >{{searchData[dataIndex].payType}}</td>
                                 <th>订单来源</th>
                                <td>{{searchData[dataIndex].source}}</td>
                            </tr>
                             <tr>
                                <th>押金金额</th>
                                <td class="blue">RMB {{searchData[dataIndex].totalMoney}}</td>
                                <th>房价*天数</th>
                                <td class="blue fw fs14">RMB {{searchData[dataIndex].discounts}}</td>
                            </tr>
                            <tr class="bg">
                                <th>合计金额</th>
                                <td class="blue fw fs14">RMB {{searchData[dataIndex].discounts}}</td>
                                <th>优惠价格</th>
                                <td class="blue fw fs14">RMB {{searchData[dataIndex].discounts}}</td>
                            </tr>
                        </table>
                        <!-- 未处理订单 -->
                        <div class="untreated clearfix" v-if="isUntreated">
                            <el-button class="flr" type="primary"  @click="dialogFormVisible = true">拒绝订单</el-button>
                            <el-button class="fll" type="primary" @click="handleUntreated">接受订单</el-button>
                            <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible">
                                <el-input v-model='searchData[dataIndex].loseCause'></el-input>
                                <div slot="footer" class="dialog-footer">
                                    <el-button  @click="dialogFormVisible = false">取 消</el-button>
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
                                        <el-input v-model='searchData[dataIndex].roomId' placeholder="请输入房间号"></el-input>
                                    </td>
                                </tr>
                            </table>
                            <div class="btn-roomsid" style="width:98px;margin:0 auto;">
                                <el-button type="primary" style="width:98px"  @click="handleRoomId">
                                    确定
                                </el-button>
                            </div>
                        </div>
                        <!-- 已入住订单 -->
                        <div class="insert clearfix" v-if="isInsert">
                            <el-button class="flr" type="primary" style="width:98px" @click="handleGoon">续 住</el-button>
                            <el-button class="fll" type="primary" style="width:98px" @click="dialogVisible = true">离 店</el-button>
                            <el-dialog title="确认离店" :visible.sync="dialogVisible">
                                <div slot="footer" class="dialog-footer">
                                    <el-button  @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="handleLeaveYES">确 定</el-button>
                                </div>
                            </el-dialog>
                        </div>
                        <!-- 失效订单 -->
                        <div class="disabledOrder" v-if="isLose">
                            <table class="table4">
                                <tr>
                                    <th>失效原因</th>
                                    <td >{{searchData[dataIndex].loseCause}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </el-card>
          </div>
          <div class="orderDetail-left clearfix" >
              <div class="searchTitle clearfix">
                <span class="span flr">共{{searchData.length}}条消息 </span>
                <span class="span">查询 "{{boxData.username}}"</span>
              </div>
            <el-scrollbar class="scollbar">
                <div class="searchContent clearfix" v-for="(item, index) in searchData" :key="index">
                  <el-card class='clearfix  parts' :class="{active: dataIndex == index}" @click.native="activeData(index)">
                      <div class="type clearfix part">
                          <span class="flr overTime">{{item.overTime}}</span>
                          <el-button type='primary' class="none">失效</el-button>
                          <span class="blue">{{item.orderId}}</span>
                      </div>
                      <div class="roomType part">
                          <span class="flr fs14">共 <span class="blue">1</span> 间</span>
                          <strong class="fw fs14">豪华大床房</strong>
                      </div>
                      <div class="user mb5 fs14">{{item.username}}</div>
                      <div class="totalMoney part fs14">{{item.totalMoney}}</div>
                      <div class="startTime clearfix fs14">
                          <div class="flr fw fs14">共 <span class="blue">1</span> 晚</div>
                          <span class="blue">{{item.startTime}}</span> 至
                          <span class="blue">{{item.endTime}}</span>
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
export default {
  name: "order",
  data() {
    return {
        dialogVisible:false,//离店弹框
        dialogFormVisible:false,//拒绝订单弹框
        isUntreated:false,//是否未处理
        isAccepted:false,//是否已接单
        isInsert:false,//是否已入住
        isLeave:false,//是否已离店
        isLose:false,//是否已失效
        isClick:true,
        activeIndex:'1',
        dataIndex: 0,
        boxData:{
            username:'梁朝伟'
        },
        searchData: [
          {
            //   start
            discounts:'666',//优惠价格
            userPhonenum:'110',
            source:'网络订单',
            loseCause:'商家拒绝，拒绝原因“禁止携带宠物。”',
            type:'失效订单',
            houseType:'豪华大床房',         
            price:'299',
            desc:'请打扫人员提前打扫房间，我有洁癖。',
            payType:'支付宝',
            // end
            text: "梁朝伟111",
            orderDetails:[1,2,3,4],
            orderId:'12345324664',
            overTime:'06-29 12:32',
            username:'周润发',
            totalMoney:'150 0000 0000',
            startTime:'2018-07-04',
            endTime:'2018-07-05',
            roomId:'101'
          },
          {
              //   start
            discounts:'888',
            userPhonenum:'120',
            source:'网络订单',
            loseCause:'商家拒绝，拒绝原因“禁止携带宠物。”',
            type:'失效订单',
            houseType:'豪华大床房',         
            price:'399',
            desc:'请打扫人员提前打扫房间，我有洁癖。',
            payType:'支付宝',
            // end
            text: "梁朝伟222",
            orderDetails:[1,2,3,4],
            orderId:'12345324664',
            overTime:'06-29 12:32',
            username:'梁朝伟',
            totalMoney:'150 0000 0000',
            startTime:'2018-07-04',
            endTime:'2018-07-05',
            roomId:'102'
          },
          {
              //   start
            discounts:'222',
            userPhonenum:'119',
            source:'网络订单',
            loseCause:'商家拒绝，拒绝原因“禁止携带宠物。”',
            type:'失效订单',
            houseType:'豪华大床房',         
            price:'100',
            desc:'请打扫人员提前打扫房间，我有洁癖。',
            payType:'支付宝',
            // end
            text: "梁朝伟",
            orderDetails:[1,2,3,4],
            orderId:'12345324664',
            overTime:'06-29 12:32',
            username:'小马哥',
            totalMoney:'150 0000 0000',
            startTime:'2018-07-04',
            endTime:'2018-07-05',
            roomId:'103'
          },
          {
              //   start
            discounts:'99999',
            userPhonenum:'99999',
            source:'网络订单',
            loseCause:'商家拒绝，拒绝原因“禁止携带宠物。”',
            type:'已入住',
            houseType:'豪华大床房',         
            price:'100',
            desc:'请打扫人员提前打扫房间，我有洁癖。',
            payType:'支付宝',
            // end
            text: "周杰伦",
            orderDetails:[1,2,3,4],
            orderId:'999999',
            overTime:'06-29 12:32',
            username:'周杰伦',
            totalMoney:'2018',
            startTime:'2018-07-04',
            endTime:'2018-07-05',
            roomId:'104'
          }
        ]
    };
  },
  methods: {
    handleRoomId(){},//分配房间号
    handleLeaveYES(){},//确认离店，退押金
    handleGoon(){},//点击续住
    // 点击接受订单
    handleUntreated(){
        console.log('okok')
        // this.$axios.post('').then(res=>{
        //     console.log(res)
        // })
    },
    // 点击拒绝订单
    handleRefase(){
        // this.$axios.post("").then(res=>{
        //     comsole.log(res)
        // })
        this.dialogFormVisible = false
        console.log('我拒绝')
    },
    handleSearch() {},
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.dataIndex = 0;
        this.activeIndex = key
        console.log('index',this.activeIndex);
    },
    handleSearch(e){
      if(this.isClick){
          this.isClick = false
          console.log(e);
          console.log('111111');
          setTimeout(()=>{
              this.isClick = true
          },4000)
      }
    },
    activeData(index) {
      this.dataIndex = index;
    }
  },
  watch:{
    activeIndex(val){
        if(val == 1){
            this.isUntreated = false,//是否未处理
            this.isAccepted = false,//是否已接单
            this.isInsert = false,//是否已入住
            this.isLeave = false,//是否已离店
            this.isLose = false
        } else if(val == 2){
            this.isInsert = false,//是否已入住
            this.isLose = false,//是否已失效
            this.isAccepted = false,//是否已接单
            this.isLeave = false,//是否已离店
          this.isUntreated = true
        }else if(val == 3){
            this.isUntreated = false,//是否未处理
            this.isInsert = false,//是否已入住
            this.isLose = false,//是否已失效
            this.isLeave = false,//是否已离店
            this.isAccepted = true;
        }else if(val == 4){
            this.isUntreated = false,//是否未处理
            this.isAccepted = false,//是否已接单
            this.isLose = false,//是否已失效
            this.isLeave = false,//是否已离店
            this.isInsert = true
        }else if(val == 5){
            this.isUntreated = false,//是否未处理
            this.isAccepted = false,//是否已接单
            this.isInsert = false,//是否已入住
            this.isLose = false
            this.isLeave = true
        }else if(val == 6){
            this.isUntreated = false,//是否未处理
            this.isAccepted = false,//是否已接单
            this.isInsert = false,//是否已入住
            this.isLeave = false,//是否已离店
            this.isLose = true
        console.log(this.isLose)
        }
    }
  }
  }
</script>

<style scoped lang='scss'>
// 新增样式
.untreated{//未处理订单
    margin: 0 auto;
    width: 240px;
    margin-top: 40px;
}
/deep/ input.el-input__inner{
    padding-left:20px;
}
// 已接单
.need{
    background: #eff5ff;
}
//已入住
.insert{
    margin: 0 auto;
    width: 240px;
    margin-top: 40px;
}
.active{ border: 1px solid #9dccfa;}
.parts{
    margin-bottom: 15px;
    background: #edf3ff;
    border-radius: 0px;
}
.order {
    box-sizing: border-box;
    // overflow-x: hidden;
    //顶部查询框样式
  .orderScreen{
     position: relative;
     border: 0.1px solid #fff;
    .carditem {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        }
    .seachBox{
        margin-top: 5px;
        margin-left: 48%;
        display: inline-block;
        width: 316px;
    }
    .seek-box {
        display: inline-block;
        width: 316px;
        font-size: 12px;
        box-sizing: border-box;
        line-height: 36px;
        input {
            box-sizing: border-box;
            height:36px;
            width: 260px;
            padding-left: 50px;
            outline: none;
            color: #666;
            background: url("../../image/评价管理/图标切图_03_11.png") no-repeat 10px center;
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
        .seek:active{
            background: #409eff;
        }
    }
  }
}
//下面订单详情样式
.orderDetails{
     margin-top: 60px;
     .orderDetail-left{
         padding-right: 12px;
         width:35%;
         height: 100vh;
         overflow-y: hidden;
        .scollbar{
            height: 100%;
        }

         .part{ margin-bottom: 10px; }
         .searchTitle{margin-bottom: 15px;}
         .span{ font-size: 12px; color:#c1c1c1;}
         .overTime{ font-size: 12px; line-height: 28px  }
         .totalMoney{color:#c6c9d0; line-height: 1.2;}
     }
     .orderDetail-right{
         width: 60%;
        /deep/ .el-card__header,.el-card{
            border: none;
        }
        .table{
            table{
                margin-bottom: 15px;
                text-align: center;
                border: 1px solid  #f7faff;
                width: 100%;
                th{ height: 45px; width:22%; background: #f7faff; font-size: 14px; }
                td{ height: 45px; width:33%;font-size: 12px }
            }
            .desc{height: 60px; width:100%;
                th{ height: 60px; width:22%; background: #f7faff; }
                td{ width:78%; height: 60px; font-size: 14px ; color:#b9b9b9;}
                 }
            .table4 {
                th{ height: 45px; width:22%; background: #f7faff; }
                td{ width:78%; height: 45px; font-size: 14px ; color:#b9b9b9; }  }
        }
     }
    }

.title { padding-left: 6px;border-left: 3px solid #75b8fc;}
.header {font-weight: 700;}
.order-item {/deep/ .el-card__body {display: none; }}

</style>
<style>
.el-main { text-align: left; line-height: 1;}
.el-input__inner { padding: 0;background: #f9fbff;border: none;height: 36px;line-height: 36px;}
.el-button{ border-radius: 20px;  padding: 6px 20px; font-size: 14px;}
.el-button--text {font-size: 14px; margin-top: 9px;}
</style>
