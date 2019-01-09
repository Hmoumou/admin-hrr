<template>
    <div class="box">
        <el-card class="box-card carditem clearfix order-item">
        <div  class="header clearfix">
          <el-button style="float: right; padding: 3px 0" type="text">更多搜索选项
            <i class="iconfont icon-arw-top-copy" v-if="!moreSearch"></i>
            <i class="iconfont icon-arrow-up" v-if="moreSearch"></i>
          </el-button>
           <div class="seachBox  clearfix">
                <div class="seek-box">
                    <input type="text" v-model="boxData.username" placeholder="订单号/预定人/预订人手机号">
                    <div class="seek" @click="handleSearch">搜索</div>
                </div>
           </div>
          <span  class="title  mt10 fll">订单筛选</span>
          <!-- <div class="searchBox" :model="searchData">
            <i class="iconfont icon-sousuo"></i>
            <el-input v-model="searchData.text" placeholder="订单号/预订人/预订人手机号" class="input"></el-input>
            <el-button type="primary" class="btn" @click="">搜索</el-button>
          </div> -->
        </div>
        <div class="dialog" v-if='moreSearch'>
           <el-form>
                <el-form-item label="按房型选择">
                    <el-select v-model="typeSearch" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按时间选择" class="clearfix">
                    <el-button type="primary" class="flr">
                        查询
                    </el-button>
                   <el-date-picker
                    v-model="dateSearch"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                    
                </el-form-item>

           </el-form>
        </div>
      </el-card>


    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                formData:[
                      {
          addtime: "2019-01-04 11:05:30",
          appid: "",
          cashPledge: "500",
          count: "56",
          countPrice: "500",
          endtime: "2019-01-14",
          hop: [],
          hotelid: 1223,
          id: 24,
          lateTime: "",
          merchantid: 100023,
          moble: "1813849436",
          name: "田日翔",
          orderNumber: "20190104110530967",
          orderSource: "",
          orderType: "3",
          otherRefund: "500",
          payCountPrice: "0.01",
          payType: ""
        },
        {
          //   start
          orderinfo: "失效", //订单类型
          discounts: "666", //优惠价格
          userPhonenum: "110",
          username: "123", //入住人姓名
          userid: "12133234124214412", //入住人身份证号
          source: "网络订单",
          loseCause: "商家拒绝，拒绝原因“禁止携带宠物。”",
          type: "失效订单",
          houseType: "豪华大床房",
          price: "299",
          desc: "请打扫人员提前打扫房间，我有洁癖。",
          payType: "支付宝",
          // end
          text: "梁朝伟111",
          orderDetails: [1, 2, 3, 4],
          orderId: "12345324664",
          overTime: "06-29 12:32",
          username: "周润发",
          totalMoney: "150 0000 0000",
          startTime: "2018/07/04",
          endTime: "2018/07/05",
          roomId: "101",
          evaluate: "房间很舒适，好评~" //新加评价
        },
        {
          //   start
          username: "123", //入住人姓名
          userid: "12133234124214412", //入住人身份证号
          orderinfo: "已入住", //订单类型
          discounts: "888",
          userPhonenum: "120",
          source: "网络订单",
          loseCause: "商家拒绝，拒绝原因“禁止携带宠物。”",
          type: "失效订单",
          houseType: "豪华大床房",
          price: "399",
          desc: "请打扫人员提前打扫房间，我有洁癖。",
          payType: "支付宝",
          // end
          text: "梁朝伟222",
          orderDetails: [1, 2, 3, 4],
          orderId: "12345324664",
          overTime: "06-29 12:32",
          username: "梁朝伟",
          totalMoney: "150 0000 0000",
          startTime: "2018-07-04",
          endTime: "2018-07-05",
          roomId: "102",
          evaluate: "房间很舒适，好评~"
        },
        {
          //   start
          username: "123", //入住人姓名
          userid: "12133234124214412", //入住人身份证号
          orderinfo: "已离店 ", //订单类型
          discounts: "222",
          userPhonenum: "119",
          source: "网络订单",
          loseCause: "商家拒绝，拒绝原因“禁止携带宠物。”",
          type: "失效订单",
          houseType: "豪华大床房",
          price: "100",
          desc: "请打扫人员提前打扫房间，我有洁癖。",
          payType: "支付宝",
          // end
          text: "梁朝伟",
          orderDetails: [1, 2, 3, 4],
          orderId: "12345324664",
          overTime: "06-29 12:32",
          username: "小马哥",
          totalMoney: "150 0000 0000",
          startTime: "2018-07-04",
          endTime: "2018-07-05",
          roomId: "103",
          evaluate: "房间很舒适，好评~"
        },
        {
          //   start
          username: "123", //入住人姓名
          userid: "12133234124214412", //入住人身份证号
          orderinfo: "已入住", //订单类型
          discounts: "99999",
          userPhonenum: "99999",
          source: "网络订单",
          loseCause: "商家拒绝，拒绝原因“禁止携带宠物。”",
          type: "已入住",
          houseType: "豪华大床房",
          price: "100",
          desc: "请打扫人员提前打扫房间，我有洁癖。",
          payType: "支付宝",
          // end
          text: "周杰伦",
          orderDetails: [1, 2, 3, 4],
          orderId: "999999",
          overTime: "06-29 12:32",
          username: "周杰伦",
          totalMoney: "2018",
          startTime: "2018-07-04",
          endTime: "2018-07-05",
          roomId: "104",
          evaluate: "房间很舒适，好评~"
        }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
