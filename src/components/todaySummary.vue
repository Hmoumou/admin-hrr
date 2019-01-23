<template>
    <div>
        <el-card class="box-card today carditem">
            <div slot="header" class="header clearfix">
                <span class="title">今日汇总</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleMuch">查看全部<i class="iconfont icon-arw-top-copy"></i></el-button>
            </div>
            <div v-for="(item,index) in today" :key="index" class="text todayitem fw">
                <div class="wrapInner">
                    {{item.type}}
                    <br/>
                    <div class="num">{{item.num}}</div>
                </div>
                <!-- <el-button @click="handle">
                    cjaasddasf
                </el-button> -->
            </div>
        </el-card>
    </div>
</template>

<script>
// import { get } from 'http';
import moment from 'moment'
    export default {
        name:'todaySummary',
        data(){
            return{
                one:0,
                two:0,
                three:0,
                four:0,
                today:[{
                    type:'未处理',
                    num:0
                },{
                    type:'已接单',
                    num:0
                },{
                    type:'已入住',
                    num:0
                },{
                    type:"今日新订",
                    num:0
                }]
            }
        },
        methods:{
            handle(){
                this.getData1()
            },
            handleMuch(){
                this.$router.push('/layout/order')
            },
            getData(){
                let date = moment().format("YYYY-MM-DD")
                // let date = "2019-01-17"
                this.$axios.post('/zftds/hotel/order/selectHotelOrder',{
                    merchantid:this.$store.state.mchid,
                    starttime:date
                }).then(res=>{
                    // console.log(res);  
                    if(res.code==1){
                        res.data.map(item=>{
                            if(item.orderType == 0){
                                this.one = Number(this.one) + 1
                            }else if(item.orderType == 1){
                                this.two = Number(this.two) + 1
                            }else if(item.orderType == 2){
                                this.three = Number(this.three) + 1
                            }else if(item.orderSource == "网络预定"){
                                this.four = Number(this.four) + 1
                            }
                        })
                        this.today[0].num = this.one
                        this.today[1].num = this.two
                        this.today[2].num = this.three
                        this.today[3].num = this.four
                        // console.log(this.one,this.two,this.three);
                    }
                })
            },
            getData1(){
                let date1 = moment().format("YYYY-MM-DD")
                // console.log(date1);
                this.$axios.post("/zftds/hotel/order/selectHotelOrder",{
                    merchantid:this.$store.state.mchid,
                    time:date1,
                    orderSource:'网络预定'
                }).then(res=>{
                    // console.log(res,"res");
                    if(res.code == 1){
                        this.four = res.data.length
                    }
                })
            }

        },
        created(){
            this.getData()
        }


    }
</script>

<style scoped lang='scss'>
     //today
        .today{
            box-sizing: border-box;
            .todayitem{
                overflow: hidden;
                color:#fff;
                width: 22%;
                font-size: 14px;
                padding:5px; 
                line-height: 2;
                border-radius: 4px;
                margin-right: 16px;
                box-sizing: border-box;
                display: inline-block;
                .wrapInner{
                    padding: 0 10px;
                }
                 &:nth-of-type(1) {
                      background: url('../image/home/box1.png')no-repeat;
                      background-size: 100% 100%;
                 }
                 &:nth-of-type(2) {
                      background: url('../image/home/box4.png')no-repeat;
                       background-size: 100% 100%;
                 }
                 &:nth-of-type(3) {
                      background: url('../image/home/box2.png')no-repeat;
                       background-size: 100% 100%;
                 }
                 &:nth-of-type(4) {
                      background: url('../image/home/box3.png')no-repeat;
                      background-size: 100% 100%;
                 }
            }
            .num{
                font-size: 16px;
                margin-right: 5px;
                font-weight: 550;
                float: right;
            }
        }
 .carditem{ margin-bottom: 10px;}
.title{ padding-left: 6px; border-left:3px solid #75b8fc;}
.header{font-weight: 700;}
</style>
<style>
.el-card__header{
    padding: 12px 20px;
}
.el-main{
    padding: 12px;
}
</style>
