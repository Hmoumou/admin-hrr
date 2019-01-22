<template>
    <div>
         <el-card class="box-card auditLeave carditem">
            <div slot="header" class="header clearfix">
                <span class="title">审核离店</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleMuch">查看全部<i class="iconfont icon-arw-top-copy"></i></el-button>
            </div>
            <div v-for="(item,index) in arr" :key="index" class="text orderitem">      
                <div class="auditLeave-top ">
                    <div class="first clearfix">
                            <span class="flr fs14">共<span class="time">{{item.count}}</span>晚</span>
                        <span class="name fs14 fw">{{item.name?item.name:item.hop[0].name}}</span>
                    </div>
                    <span class="summoney fs12 mb5">{{item.countPrice}}</span>
                    <div class="fs14 fw">{{item.houseinfo}}</div>
                </div>
                <div class="auditLeave-btm">
                    <el-button type="primary" @click="handleReadyLeave(item,index)">离店</el-button>
                    <el-button @click="handleGoon(item,index)">续住</el-button> 
                    <el-dialog title="离店办理" :visible.sync="dialogVisible">
                    <div class="mian">
                        <div class="leave-Details">
                        <p class="fw">订单详情</p>
                        <div class="dialog-table">
                            <table class="last-table">
                            <tr>
                                <th>订单编号</th>
                                <td>{{aData.orderNumber}}</td>
                                <th>房间号</th>
                                <td>{{aData.roomnumber}}</td>
                            </tr>
                            <tr>
                                <th>订房人姓名</th>
                                <td>{{aData.name}}</td>
                                <th>联系电话</th>
                                <td>{{aData.moble}}</td>
                            </tr>
                            <tr>
                                <th>预订日期</th>
                                <td>{{aData.starttime}}/{{aData.endtime}}
                                    (共{{aData.count}}晚)</td>
                                <th>实住日期</th>
                                <td>{{aData.starttime}}/{{dateToday}}
                                    (共{{practicalNight}}晚)</td>
                            </tr>
                            <tr>
                                <th>押金金额</th>
                                <td>{{aData.cashPledge}}</td>
                                <th>其它金额</th>
                                <td>
                                <el-input placeholder="请输入消费金额" v-model="moreMoney"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <th>预付总金额</th>
                                <td>{{aData.payCountPrice}}</td>
                                <!-- 需计算实际金额 -->
                                <th>实际金额</th>
                                <td>{{payMoney1}}</td>
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
                                <td>{{aData.cashPledge}}</td>
                                <!-- 自己计算出的应退还的房费 -->
                                <th>应退还房费</th>
                                <td>{{returnMoney}}</td>
                            </tr>
                            <tr>
                                <!--这边也是  -->
                                <!--这边也是  -->
                                <!--这边也是  -->
                                <th>其他消费</th>
                                <td>{{moreMoney}}</td>
                                <th>合计退款</th>
                                <td>RMB {{returnMoneyAll}}</td>
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
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:'auditLeave',
        data(){
            return{
                returnMoneyAll:"",//合计退款
                returnMoney:"",//应退还房费
                payMoney1:"",//支付实际金额（退款需要）
                payMoney:"",//实际入住日期的价格
                moreMoney:0,//消费金额
                practicalNight:"",
                dialogVisible:false,
                dateToday:"",// 得到今天是几月几号
                arr:[],
                aData:{},
                indexs:'',
            }
        },
        methods:{
            getToday(){//得到今天是几月几号
            // console.log('this.searchData[this.dataIndex].starttime', this.searchData[this.dataIndex].starttime)
                var date = new Date()
                let date1 = date.toLocaleDateString()
                let date2 = date1.replace(/\//g,"-")
                this.dateToday = date2
                
            },
            handleReadyLeave(item,index){//点击准备离店
                this.indexs = index
                this.getToday()
                // console.log(item,"iaudaifa");
                this.payMoney1 = item.countPrice
                this.aData = item
                var date3 = new Date(this.dateToday.replace(/-/g,"/")).getTime()//今天的时间戳
                var date4 = new Date(item.starttime).getTime()//开始时间的时间戳
                this.practicalNight = Math.ceil((date3-date4)/1000/60/60/24)
                //以下操作是为了求两个时间段之间的时间集合start
                var timeArr = [];
                var date1 = new Date(item.startTime);
                var date2 = new Date(this.dateToday);
                var dateSpan = (date2.getTime() - date1.getTime()) / 86400000;
                // console.log(dateSpan); 
                // if(dateSpan>0){
                    // timeArr.push(moment(startDate).format("YYYY-MM-DD")); // 利用momentjs生成指定格式的字符串
                for(let i = 0; i < dateSpan; i++) {
                    let startDate = new Date(item.startTime); // 开始时间
                    var nowDate = new Date(startDate.setDate(startDate.getDate()+i)); // setDate设置一个日期天数，getDate得到日期天数。然后返回一个新的日期的unix时间戳。然后利用new Date方法生成新的时间对象。
                    timeArr.push(moment(nowDate).format("YYYY-MM-DD"))
                }
                let timeArr2 = item.hoy
                let sums = 0
                for(let s=0;s<timeArr.length;s++){
                    sums += Number(timeArr2[s].price)
                }
                console.log("实际的钱",sums);
                this.payMoney = sums
                this.payMoney1 = sums + Number(item.cashPledge)
                let nums = 0
                timeArr2.map(item=>{
                    nums += Number(item.price)
                })
                this.returnMoney = Number(nums)-Number(sums)
                this.returnMoneyAll = Number(this.returnMoney) + Number(item.cashPledge) 
                // 处理小数点问题
                var varNumber = this.returnMoney
                if (varNumber.toFixed){
                varNumber = varNumber.toFixed(2);
                }else {//浏览器不支持toFixed()就使用其他方法
                var div = Math.pow(10,2);
                varNumber = Math.round(varNumber * div) / div;
                }
                console.log(varNumber,"一个小惊喜");
                this.returnMoney = varNumber
                var varNumber1 = this.returnMoneyAll
                if (varNumber1.toFixed){
                varNumber1 = varNumber1.toFixed(2);
                }else {//浏览器不支持toFixed()就使用其他方法
                var div = Math.pow(10,2);
                varNumber1 = Math.round(varNumber1 * div) / div;
                }
                console.log(varNumber1,"一个小惊喜");
                this.returnMoneyAll = varNumber1
                this.dialogVisible = true
                // 时间集合end
                // }
                // else{
                //     this.payMoney1 = Number(this.payMoney) + Number(this.moreMoney) + Number(item.cashPledge)
                //     this.returnMoney = Number(item.payCountPrice)-Number(this.payMoney1)
                //     this.returnMoneyAll = Number(this.returnMoney) + Number(item.cashPledge)
                //     this.dialogVisible = true
                // }
                
            },
            handleGoon(item,index) {
                var data = item
                console.log("data",data);
                this.$router.push({
                    path:"/layout/still/still",
                    query:data
                });
                }, //点击续住
            handleLeaveYES(item,index){//确认离店，退押金
                let data = {
                    id:item.id,
                    orderNumber:item.orderNumber,
                    roomnumber:item.roomnumber,
                    hotelid:item.hotelid,
                    orderType:3,
                    roomRefund:this.returnMoney,//应退房费合计金额
                    totalRefund:this.returnMoneyAll,//总退款金额
                }
                this.$axios.post("/zftds/hotel/order/updateHotelOrder",data).then(res=>{
                // console.log(res);
                if(res.code == 1){
                    this.$message.success(res.msg)
                    this.dialogVisible = false
                    if(this.activeIndex == 1){
                        this.getOrder()
                        this.getFirstOrder()
                    }else{
                        this.getOrderByType()
                    }
                }
            })
            }, 
            getData(){
                // let date = moment().format("YYYY-MM-DD")
                this.$axios.post('/zftds/hotel/order/selectHotelOrder',{
                    merchantid:this.$store.state.mchid,
                    orderType:2
                    }).then(res=>{
                    console.log(res);
                    if(res.code==1){
                    this.arr = [...res.data]
                    this.arr = this.arr.splice(0,3)
                    console.log(this.arr,"arrrrrrr");
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            handleMuch(){
                this.$router.push('/layout/order')
            }
        },
        created(){
            this.getData()
        },
        watch: {
            moreMoney(va){
            this.payMoney1 = Number(this.payMoney) + Number(this.moreMoney) + Number(this.arr[indexs].cashPledge)
            this.returnMoneyAll = Number(this.returnMoney) + Number(this.arr[indexs].cashPledge) - Number(this.moreMoney)
            var varNumber = this.returnMoney
                if (varNumber.toFixed){
                varNumber = varNumber.toFixed(2);
                }else {//浏览器不支持toFixed()就使用其他方法
                var div = Math.pow(10,2);
                varNumber = Math.round(varNumber * div) / div;
                }
                console.log(varNumber,"一个小惊喜");
                this.returnMoney = varNumber
                var varNumber1 = this.returnMoneyAll
                if (varNumber1.toFixed){
                varNumber1 = varNumber1.toFixed(2);
                }else {//浏览器不支持toFixed()就使用其他方法
                var div = Math.pow(10,2);
                varNumber1 = Math.round(varNumber1 * div) / div;
                }
                console.log(varNumber1,"一个小惊喜");
                this.returnMoneyAll = varNumber1
            }
        }

    }
</script>

<style scoped lang='scss'>
.orderitem{  
    width: 31.8%;
    border: 1px solid #f1f1f1;
    padding: 20px;
    margin-right: 10px;
    display: inline-block;
        span,strong{
        display: block;
    }
}
//新增
.mian{
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
//auditleave
.auditLeave{
    .auditLeave-top{
        margin-bottom: 10px;
        line-height: 1.5;
    }
    .auditLeave-btm{
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
        margin: 0 auto;
        width: 240px;
        margin-top: 15px;
        span,strong{
            display: block;
        }
    }
    .name{font-weight: 700;}
    .time{
        display: inline-block;
        font-size: 12px;
        color:#409eff;
    } 
    .summoney{
        font-size: 12px;
    }
}
.carditem { margin-bottom: 10px;}
.title    { padding-left: 6px;border-left:3px solid #75b8fc;}
.header   {font-weight: 700;}
</style>