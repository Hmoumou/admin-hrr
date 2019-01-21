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
                        <span class="name fs14 fw">{{item.name}}</span>
                    </div>
                    <span class="summoney fs12 mb5">{{item.countPrice}}</span>
                    <div class="fs14 fw">{{item.houseinfo}}</div>
                </div>
                <div class="auditLeave-btm">
                    <el-button type="primary">已入住</el-button>
                    <el-button>续住</el-button>                         
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
               arr:[]
            }
        },
        methods:{
             getData(){
                // let date = moment().format("YYYY-MM-DD")
                this.$axios.post('/zftds/hotel/order/selectHotelOrder',{
                merchantid:this.$store.state.mchid,
                orderType:2
                }).then(res=>{
                console.log(res);
                this.arr = [...res.data]
                this.arr = this.arr.splice(0,2)
                console.log(this.arr,"arrrrrrr");
                // if(res.code==1){
                // }
                })
            },
            handleMuch(){
                this.$router.push('/layout/order')
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped lang='scss'>
.orderitem{  
    width: 30.8%;
    border: 1px solid #f1f1f1;
    padding: 20px;
    margin-right: 10px;
    display: inline-block;
        span,strong{
        display: block;
    }
}

//auditleave
.auditLeave{
    .auditLeave-top{
        margin-bottom: 10px;
        line-height: 1.5;
    }
    .auditLeave-btm{
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