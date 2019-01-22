<template>
    <div class="pendingorder">
         <el-card class="box-card padingOrder carditem">
                    <div slot="header" class="header clearfix">
                        <span class="title">待处理订单</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="handleMuch">查看全部<i class="iconfont icon-arw-top-copy"></i></el-button>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                 <div v-for="(item,index) in arr" :key="index" class="text orderitem clearfix">
                                    <div class="orderRight flr clearfix">
                                        <span class="fs14">共<span class="time">{{item.count}}</span>晚</span>
                                        <span class= "money fw fs16">RMB {{item.countPrice}}</span>
                                        <div class="btn flr" @click="handleok(item,index)">接受</div>
                                    </div>
                                    <div class="orderLeft fll">
                                        <span class="fs14 mb5">
                                          <span class="time">{{item.starttime}}</span>
                                              至
                                          <span class="time">
                                            {{item.endtime}}
                                          </span>
                                        </span>
                                        <div class="fs14 fw">{{item.houseinfo}}</div>
                                        <span class="fs14">{{item.name}}</span>
                                        <span class="time">查看详情</span>
                                    </div>

                                </div>
                            </div>
                        </el-col>
                        <!-- <el-col :span="12">
                            <div class="grid-content bg-purple">
                            </div>
                        </el-col> -->
                    </el-row>

                </el-card>
    </div>
</template>

<script>
    export default {
        name:'pendingOreder',
        data(){
            return{
                arr:[]
            }
        },
         methods:{
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
            handleMuch(){
                this.$router.push('/layout/order')
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
                    // console.log(this.arr,"arrrrrrrrrr");
                    // if(res.code==1){
                    // }
                })
            }
        },
        created(){
                 this.getData()
        }
    }
</script>

<style scoped lang='scss'>
   //order
        .orderitem{
            width: 48%;
            box-sizing: border-box;
                border: 1px solid #f1f1f1;
                padding: 10px;
                margin-right: 8px;
                display: inline-block;
                 span,strong{
                    display: block;
                }
            }
        .padingOrder{
            line-height: 1.8;
             box-sizing: border-box;
            .orderLeft{
                margin-right: 10px;
                 .time{
                    display: inline-block;
                    font-size: 12px;
                    color:#409eff;
                }

            }
            .orderRight{
                text-align: right;
                line-height: 2;
                span{display: inline-block; }
                .time{
                    font-size: 12px;
                    color:#409eff;
                }
                .money{font-size: 16px; display: block;margin-bottom: 15px;}
            }


        }
        .carditem{ margin-bottom: 10px;}
        .title{ padding-left: 6px;border-left:3px solid #75b8fc;}
        .header{font-weight: 700;}
        .btn{
            cursor: pointer;
            box-sizing: border-box;
            width: 90px;
            height: 40px;
            text-align: center;
            color:#fff;
            font-size: 12px;
            border-radius: 17.5px;
            background: url('../image/home/btn2.png')no-repeat;
            background-size: 100% 100%;
        }

</style>
