<template>
    <div>
        <el-card class="box-card carditem">
            <div slot="header" class="header">
                <span class="title ">点评/回答</span>
            </div>
            <p class="subtitle fw fs14">最新点评</p>
            <div  v-for="(item,index) in userData" class="text commentitem" :key='index'>
                <div class="comment-title clearfix">
                    <span class="flr fs12">{{addtime[index]}}</span>
                    <h4>{{item.name}}</h4>
                    <Star :score='item.rating' />
                    <p class="comment">{{item.appraise}}</p>
                    <div class="adminAsk" v-if="!item.isShow&&item.reply">
                        <span class="blue fw fs14">回复</span>
                        <p class="fs14">{{item.reply}}</p>
                    </div>
                    <div class="box-Reply"  ref="huifubox"  v-if="item.isShow">
                        <!-- <p>{{item.adminAsk}}</p> -->
                        <textarea  v-model='item.reply' name="adminAsk" class="reply mb5"  cols="42" rows="5">
                        </textarea>
                        <el-button @click="handleYes(item,index)" type='primary'>提交</el-button>
                        <el-button @click="handleNo(index)">取消</el-button>
                    </div>
                    <el-button  v-if="!item.isShow&&!item.reply" class="flr" type='primary' @click="handleReply(item,index)">
                        回复
                    </el-button>
                    <!-- <div class="delete-ask"  v-if="!item.reply&&!item.isShow " >
                      <el-button class="flr" type='danger' @click="DeleteEvaluation(item,index)">
                        删除
                      </el-button>
                      <el-button  style="margin-right:10px;"  class="flr" type='primary' @click="handleReply(index)">
                        回复
                      </el-button> -->
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Star from '@/components/star.vue'
let commentitems = document.getElementsByClassName('commentitem')

    export default {
        name:'home',
        components:{
            Star
        },
        data(){
            return{
                Datatotol:[],
                Data:[],
                addtime:[],
                hour:[],
                userData:[],
                selectData:{
                     merchantid:this.$store.state.mchid,
                    // inDate: "",
                    // goDate: "",
                    orderNumber:null,
                    name:null,
                    starttime:null,//开始时间
                    endtime:null,//结束时间
                    hotelid:null, //房型ID主键
                    // ssid:null //评论人主键
                },
                haveValue:true,
                isShow:false,
                commentData:[
                    // {
                    //     username:"用户0728",
                    //     starnum:3,
                    //     commentTime:'2018-01-19',
                    //     comment:'店家超好非常满意的一次入住，感谢！',
                    //     adminAsk:'good good study',
                    //     score:"3.6",
                    //     isShow: false
                    // },
                    // {
                    //     username:"用户0729",
                    //     starnum:3,
                    //     commentTime:'2018-01-19',
                    //     comment:'店家超好非常满意的一次入住，感谢！',
                    //     adminAsk:'',
                    //     score:"3.6",
                    //     isShow: false
                    // },
                    // {
                    //     username:"用户07230",
                    //     starnum:3,
                    //     commentTime:'2018-01-19',
                    //     comment:'店家超好非常满意的一次入住，感谢！',
                    //     adminAsk:'',
                    //     score:"3.6",
                    //     isShow:false
                    // }
                ]
            }
        },
        methods:{
            getData(){//获取评价数据
                this.$axios.post("/zftds/hotel/order/selectHotleEvaluate",{
                    merchantid:this.$store.state.mchid
                }).then(res=>{
                    console.log(res,"sssssssssss");
                if(res.code == 1){
                    this.Data = [...res.data]
                    this.Data = this.Data.slice(0,3)
                    // console.log(this.Data,"slfsdnj");
                    this.Datatotol = res.rating
                    // console.log(this.Datatotol,"this.Datatotol");
                    // console.log(this.Data,"this.Data");
                    this.Data.map(item=>{
                    this.addtime.push(item.addtime.substring(0,11))
                    this.hour.push(item.addtime.substring(11))
                    })
                    this.userData = this.Data
                    this.userData.map(item=>{
                    // console.log(this);
                    this.$set(item,"isShow",false )
                    this.$set(item,"isEdit",false )
                    })
                }else{
                    this.$message.error(res.msg)
                    this.selectData = {
                        merchantid:this.$store.state.mchid,
                        // inDate: "",
                        // goDate: "",
                        orderNumber:null,
                        name:null,
                        starttime:null,//开始时间
                        endtime:null,//结束时间
                        hotelid:null, //房型ID主键
                        // ssid:null //评论人主键
                    }
                }
                    // console.log(this.userData,"12123");  
                })
                },
            handleReply(item,index){
                console.log(index)
                this.userData[index].isShow = true
            },
            handleYes(item,index){
                // console.log(this.userData[index].reply);
                  if(this.userData[index].reply){
                        this.$axios.post('/zftds/hotel/order/updateHotleEvaluate',{
                        id:item.id,
                        reply:this.userData[index].reply
                        }).then(res=>{
                        console.log(res);
                        if(res.code == 1){
                            this.$message.success(res.msg)
                            this.getData()
                        }else{
                            this.$message.error(res.msg)
                        }
                        })
                    }else{
                        this.$message.success("请先输入回复内容哦~")
                    }
            },
            handleNo(index){
                this.userData[index].reply = ''
                this.userData[index].isShow = false
            }
        },
        created(){
            this.getData()
        }

    }
</script>

<style scoped lang='scss'>
        .subtitle{
            color:#409eff;
            margin-bottom: 10px;
        }
        .item{
            width: 20px;
            height: 20px;
            background: url('../image/home/star1.png')no-repeat;
            margin:10px 5px 10px 0;
            background-size: 100% 100%;
        }
        .commentitem{
            padding: 10px 20px;
            background: #f9fbff;
            margin-bottom: 10px;
            .comment{margin: 10px 0; font-size: 14px;}
            ul li{float: left;cursor: pointer;}
            ul{list-style: none;}
        }
        .adminAsk{
            box-sizing: border-box;
            padding: 10px 20px;
            background: #f0f5fe;
            width: 100%;
            height: 60px;
            span{
                display: block;
                margin-bottom: 14px;
            }
            p{
                color:#999;
            }
        }
        .box-Reply{
            .reply{
                padding: 10px;
                height: 60px;
                box-sizing: border-box;
            }
            // display: none;
        }
.carditem{ margin-bottom: 10px;}
.title{ padding-left: 6px;border-left:3px solid #75b8fc;}
.header{font-weight: 700;}

</style>
