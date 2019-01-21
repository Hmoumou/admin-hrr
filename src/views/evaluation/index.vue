<template>
  <div class="appraise">
    <el-card class="top1 carditem box-card">
      <div slot="header" class="header">
        <span class="title">酒店评分</span>
      </div>
      <div class="right">
        <span>{{Datatotol.RATING}}</span>
        共5分
      </div>
      <div class="left">
        <div class="one">
          <div>
            <span>服务</span>
            <Star class="star" :score="Datatotol.SERVE"/>
          </div>
          <div>
            <span>卫生</span>
            <Star class="star" :score="Datatotol.SANITATION"/>
          </div>
        </div>
        <div class="two">
          <div>
            <span>环境</span>
            <Star class="star" :score="Datatotol.ENVIRONMENT"/>
          </div>
          <div>
            <span>配置</span>
            <Star class="star" :score="Datatotol.LOCATION"/>
          </div>
        </div>
        <!-- 153 153  153 #999 15 -->
      </div>
    </el-card>
    <el-card class="top2 carditem box-card">
      <div slot="header" class="header">
        <span class="title">评价详情</span>
      </div>
      <div class="item1">
        <div class="right">
          <div class="more-seek" @click="moreSearch = !moreSearch">
            更多搜索选项
            <i class="el-icon-arrow-right" v-show="!moreSearch"></i>
            <i class="el-icon-arrow-down" v-show="moreSearch"></i>
          </div>
          <div class="seek-box">
            <input type="text" v-model="searchdatas" placeholder="订单号/预定人/预订人手机号">
            <div class="seek" @click="handleSearch">搜索</div>
          </div>
           <!-- <div class="seachBox clearfix">
            <div class="seek-box">
              <input type="text" v-model="searchdatas" placeholder="订单号/预定人/预订人手机号">
              <div class="seek" @click="handleSearch">搜索</div>
            </div>
          </div> -->
        </div>
        <div class="left">
          <label :class="{activegood: !appraise}">
            <input :value="0" name="appraise" v-model="appraise" type="radio">好评
          </label>
          <label :class="{activegood: appraise}">
            <input :value="1" name="appraise" v-model="appraise" type="radio">差评
          </label>
        </div>
      </div>
      <div class="select clearfix" :class="{active: moreSearch}">
        <el-button type="primary" @click="ClickmoreSearch" class="select-btn flr mr10">查询</el-button>
        <span class="fs14 fw mr10">按时间选择</span>
        <el-date-picker
            v-model="inDate"
            class="time-date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <!-- <el-date-picker v-model="selectData.inDate" type="date" class="mr10" placeholder="入住日期"></el-date-picker>
        <el-date-picker v-model="selectData.goDate" type="date" class="mr10" placeholder="离店日期"></el-date-picker> -->
      </div>

      <!-- 当点击好评时显示 -->
      <div class="userItem" v-if="appraise == 0" v-for="(item,index) in userData" :key="index" >
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <div class="item-left">
                <span class="fw fs14">用户&nbsp;&nbsp;{{item.name}}</span>
                <p class="c2 fs12">{{addtime[index]}}</p>
                <p class="c2 fs12">{{hour[index]}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
                <div class="item-right clearfix">
                  <!-- v-for="(item,index1) in star" :key="index1" -->
                    <div class="item-stars clearfix">
                        <!-- <div class="star-top clearfix mb10">
                            <span class="fll fs14 fw title-star">{{item.title}}</span>
                            <Star class="fll" :score="item.stars"/>
                        </div> -->

                          <div class="star-top clearfix mb10">
                            <span class="fll fs14 fw title-star">服务</span>
                            <Star class="fll" :score="item.serve"/>
                        </div>
                         <div class="star-top clearfix mb10">
                            <span class="fll fs14 fw title-star">环境</span>
                            <Star class="fll" :score="item.environment"/>
                        </div>
                         <div class="star-top clearfix mb10">
                            <span class="fll fs14 fw title-star">卫生</span>
                            <Star class="fll" :score="item.sanitation"/>
                        </div>
                         <div class="star-top clearfix mb10">
                            <span class="fll fs14 fw title-star">配置</span>
                            <Star class="fll" :score="item.location"/>
                        </div>

                    </div>
                    <div class="commont fs14 mb10">{{item.appraise}}</div>
                    <div class="houseType fs14 c2 mb10">{{item.hotelname}}</div>

                    <!-- 回复逻辑 --><!-- 新加删除 -->
                    <div class="delete-ask"  v-if="!item.reply&&!item.isShow " >
                      <el-button class="flr" type='danger' @click="DeleteEvaluation(item,index)">
                        删除
                      </el-button>
                      <el-button  style="margin-right:10px;"  class="flr" type='primary' @click="handleReply(index)">
                        回复
                      </el-button>
                    </div>
                    <div class="box-Reply clearfix"  v-if="item.isShow" data-index="index">
                      <textarea v-model='item.reply' name="reply" class="reply"  cols="42" rows="5">
                      </textarea>
                      <el-button @click="handleNo(index)" class="flr">取消</el-button>
                      <el-button @click="handleYes(item,index)" type='primary flr mr10'>回复</el-button>
                    </div>
                    <div class="adminAsk" v-if="item.reply&&!item.isShow">
                      <el-row :gutter="20">
                        <el-col :span="19">
                          <div class="grid-content bg-purple">
                            <span class=" span blue fw fs14">回复</span>
                            <p class="fs14">{{item.reply}}</p>
                          </div>
                        </el-col>
                        <el-col :span="5">
                          <div class="grid-content bg-purple clearfix">
                            <p class="c2 fs14 mb10 flr">{{item.addtime}}</p>
                            <div class="flr fs14">
                              <span class="c3  fw cs" @click="handleEdit(item,index)">编辑</span>
                              <!-- <span class="c2 ">  |  </span>
                              <span class="c4 fw cs" @click="handleDelete(index)">删除</span> -->
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                   
                    
                   
                    <!--<div class="box-Reply clearfix"  v-if="item.isShow" data-index="test">-->
                        <!--<textarea :value='userData.adminAsk' name="adminAsk" class="reply"  cols="42" rows="5">-->
                        <!--</textarea>-->
                        <!--<el-button @click="handleNo1(index)" class="flr">取消</el-button>-->
                        <!--<el-button @click="handleYes1" type='primary flr mr10'>回复</el-button>-->
                    <!--</div>-->
                </div>

            </div>
          </el-col>
        </el-row>
       </div>
      <div class="caping"  v-if="appraise == 1">
        暂无差评哦~,我们会更加努力哒！
      </div>
    </el-card>
  </div>
</template>

<script>
import Star from "@/components/star.vue";
export default {
  data() {
    return {
      searchdatas:"",
      moreSearch: false,
      appraise: 0,
      title: "服务",
      addtime:[],
      hour:[],
      inDate:'',
      userData: [],
      Data:[],
      Datatotol:{},
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
      }
    };
  },
 
  components: {
    Star
  },
  methods: { 
     ClickmoreSearch(){//隐藏框查询
      // console.log(this.inDate)
      let arrs = []
      if(this.inDate){
        this.inDate.map(it=>{
          // console.log(it);
          let dd1 = it.toLocaleDateString()
          let dd2 = dd1.replace(/\//g,"-")
          arrs.push(dd2)
        })
        // console.log(arrs);
        this.selectData.starttime = arrs[0]
        this.selectData.endtime = arrs[1]
        this.getData()
      }
      // this.getOrder()
    },
     handleSearch(e) {
      //点击搜索进行验证
      let reg1 = /^[\u4e00-\u9fa5]{1,}$/; //输入的为汉字
      let reg2 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //手机号验证
      if (reg1.test(this.searchdatas)) {
        // console.log("可以按名字搜索了..");
        this.selectData.name = this.searchdatas
      } else if (reg2.test(this.searchdatas)) {
        this.selectData.moble = this.searchdatas
        // console.log("可以按手机号搜索了..");
      } else {
        this.selectData.orderNumber = this.searchdatas
        // console.log("全部去订单里吧..");
      }
      this.getData()
    },
    DeleteEvaluation(item,index){//点击删除一条评论
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/zftds/hotel/order/deleteHotleEvaluate",{id:item.id}).then(res=>{
            if(res.code == 1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getData()
            }else{
              this.$message.error(res.msg)
            }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getData(){//获取评价数据
      this.$axios.post("/zftds/hotel/order/selectHotleEvaluate",this.selectData).then(res=>{
        console.log(res);
       if(res.code == 1){
          this.Data  = [...res.data]
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
    handleEdit(item,index){
      // console.log('编辑index',index);
      this.userData[index].isShow = true
     
      // console.log(this.userData[index].isShow);
      
      // this.appraise = 0
    },
    handleDelete(index){
      console.log('删除index',index);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功!')
          this.$axios.post("/zftds/hotel/order/deleteHotleEvaluate",{
            id:item.id
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleReply(index){
              // console.log('回复index',index);
              // console.log(index)
              this.userData[index].isShow = true
          },
    handleYes(item,index){//确认回复
    // console.log(item);
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
        this.userData[index].isShow = 0
    },

  },
   created() {
     this.getData()
      // this.userData = this.userData.map(item => {
      //   return {
      //     ...item,
      //     isShow: false
      //   }
      // })
  },
};
</script>

<style scoped lang='scss'>
.appraise {
  border: 0.1px solid #f1f1f1;
  position: relative;
}
.time-date{
  border: 1px solid #b3ccff;
}
.top1 {
  border: 0.1px solid #fff;
  position: absolute;
  top: -12px;
  left: -20px;
  right: -20px;
  .right {
    float: right;
    font-size: 14px;
    span {
      color: #518dfd;
      font-size: 38px;
      font-weight: 600;
    }
  }
  .left {
    .one {
      width: 260px;
      display: inline-block;
    }
    .two {
      width: 260px;
      display: inline-block;
    }
    span {
      color: #2b2b2b;
      font-size: 14px;
      float: left;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}

.top2 {
  margin-top: 145px;
  background: #fff;
  h1 { margin-bottom: 26px;}
  .right {
    float: right;
    font-size: 12px;
    .more-seek {
      color: #518dfd;
      float: right;
      width: 120px;
      height: 26px;
      line-height: 26px;
      text-align: center;
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
    }
  }
  .left {
        width: 240px;
    height: 26px;
    line-height: 26px;
    border: 1px solid #518dfd;
    border-top-left-radius: 6% 50%;
    border-top-right-radius: 6% 50%;
    border-bottom-right-radius: 6% 50%;
    border-bottom-left-radius: 6% 50%;
    overflow: hidden;
    label {
      float: left;
      width: 50%;
      height: 26px;
      text-align: center;
      user-select: none;
    }
    input {
      display: none;
    }
    .activegood {
      color: #fff;
      background: #518dfd;
    }
  }
  .select {
    overflow: hidden;
    transition: all ease .5s;
    box-sizing: border-box;
    border-top: 1px solid #b3ccff;
    border-bottom: 1px solid #b3ccff;
    margin: 20px -20px 0px;
    background: #f9fafd;
    padding: 0px 30px 0px;
    box-sizing: border-box;
    height: 0px;
    .select-btn {
      border-radius: 20px;
      width: 120px;
    }
  }
  .select.active {
    height: 58px;
    padding: 10px 30px 10px;
  }
  /deep/ .el-input--prefix .el-input__inner {background: #fff;}
  /deep/ .el-button{ border-radius: 20px;  width: 100px;
                       height: 32px; line-height: 8px;}
  .userItem {
    padding: 10px 0px;
    .item-left {
      text-align: center;
      line-height: 1.8;
      padding: 20px;
    }
    .item-right {
        min-height: 120px;
        box-sizing: border-box;
        background: #f9faff;
        padding: 10px 20px;
    }
    .item-stars {
      float: left;
      width: 100%;
      .star-top{
        display: inline-block;
      }
      .title-star{
          margin-top: 8px;
          margin-right: 10px;
      }
    }
  }
  .adminAsk{
            box-sizing: border-box;
            padding: 10px 20px;
            width: 100%;
            height: 60px;
            background: #f0f5fe;
            .span{ display: block;margin-bottom: 14px;}
            p{ color:#999; }
        }
        .box-Reply{  }
        .reply{ display: block;width: 100%;border: none; background: #fff;margin-bottom: 15px;}
}
// 差评盒子
.caping{
  border-radius: 10px;
  margin-top: 20px;
  padding: 30px;
  background: #b3ccff;
  color: #fff;
  font-size: 16px;
}
.title { padding-left: 6px; border-left: 3px solid #75b8fc;}
.header { font-weight: 700;}
.mr10 { margin-right: 10px;}
.mt10 { margin-top: 10px;}
.mb10 { margin-bottom: 10px;}
.mt5 {margin-top: 5px;}
.c1 { color: #f1f1f1;}
.c2 { color: #999;}
.c3 { color: #6b9cfd;}
.c4 { color: #fd7e92;}
.cs { cursor: pointer;}

</style>
<style>
.el-main {
  text-align: left;
  line-height: 1;
}
.el-card__header{
  padding: 12px 20px;
  border-bottom: 1px solid #ebeef5;
}
.el-date-editor .el-range-separator{
  width:10%;
}
textarea{
  padding:10px;
}
</style>
