<template>
  <div>
    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">入离时间</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeF" @click="toChangeF">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="okChangeF">完&nbsp;成</el-button>
      </div>
      <!-- 最早入住 -->
      <div v-if="changeF">
        <div  class="mesBox" style="display: inline-block;width: 40%">
          <div class="leftText">最早入住</div>
          <div class="rightText">
            <span >{{formData.mResideTime}}</span>
          </div>
        </div>
      </div>
      <div  v-else>
        <div class="mesBox" >
          <div class="leftText">最早入住</div>
          <div class="rightText">
            <el-time-select
             v-model="formData.mResideTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:45'
              }"
              placeholder="选择时间">
            </el-time-select>
          </div>
        </div>
      </div>
      <!-- 最晚入住 -->
      <div v-if="changeF">
        <div  class="mesBox" style="display: inline-block;width: 40%">
          <div class="leftText">最晚入住</div>
          <div class="rightText">
            <span >{{formData.eResideTime}}</span>
          </div>
        </div>
      </div>
      <div  v-else>
        <div class="mesBox" >
          <div class="leftText">最晚入住</div>
          <div class="rightText">
            <el-time-select
             v-model="formData.eResideTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:45'
              }"
              placeholder="选择时间">
            </el-time-select>
          </div>
        </div>
      </div>
      <!-- 最早离店 -->
      <div v-if="changeF">
        <div  class="mesBox" style="display: inline-block;width: 40%">
          <div class="leftText">最早离店</div>
          <div class="rightText">
            <span >{{formData.mLeaveTime}}</span>
          </div>
        </div>
      </div>
      <div  v-else>
        <div class="mesBox" >
          <div class="leftText">最早离店</div>
          <div class="rightText">
            <el-time-select
             v-model="formData.mLeaveTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:45'
              }"
              placeholder="选择时间">
            </el-time-select>
          </div>
        </div>
      </div>
      <!-- 最晚离店 -->
      <div v-if="changeF">
        <div  class="mesBox" style="display: inline-block;width: 40%">
          <div class="leftText">最晚离店</div>
          <div class="rightText">
            <span >{{formData.eLeaveTime}}</span>
          </div>
        </div>
      </div>
      <div  v-else>
        <div class="mesBox" >
          <div class="leftText">最晚离店</div>
          <div class="rightText">
            <el-time-select
             v-model="formData.eLeaveTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:45'
              }"
              placeholder="选择时间">
            </el-time-select>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">儿童政策</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeS" @click="toChangeS">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="okChangeS">完&nbsp;成</el-button>
      </div>
      <div v-if="changeS" class="mesBox" style="height: auto;">
        <div class="rightText" style="text-indent: 2em" v-text="formData.child"></div>
      </div>
      <div v-else class="mesBox" style="height: auto;"  >
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 50}"
          placeholder="请输入儿童政策"
          v-model="formData.child">
        </el-input>
      </div>
    </el-card>

    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">膳食安排</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeT" @click="toChangeT">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="okChangeT">完&nbsp;成</el-button>
      </div>
      <div  class="mesBox">
        <div class="leftText">早餐</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.breakfast}}</span>
          <el-input v-model="formData.breakfast" v-else placeholder="例：自助:06:00-07:00 18元/位"></el-input>
        </div>
      </div>
      <div  class="mesBox">
        <div class="leftText">午餐</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.lunch}}</span>
          <el-input v-model="formData.lunch" v-else placeholder="例：自助:06:00-07:00 18元/位"></el-input>
        </div>
      </div>
      <div  class="mesBox">
        <div class="leftText">下午茶</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.afternoontea}}</span>
          <el-input v-model="formData.afternoontea" v-else placeholder="例：自助:06:00-07:00 18元/位"></el-input>
        </div>
      </div>
      <div  class="mesBox">
        <div class="leftText">晚餐</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.supper}}</span>
          <el-input v-model="formData.supper" v-else placeholder="例：自助:06:00-07:00 18元/位"></el-input>
        </div>
      </div>
    </el-card>

    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">宠物政策</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeFour" @click="toChangeFour">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="okChangeFour">完&nbsp;成</el-button>
      </div>
      <div v-if="changeFour " class="mesBox" style="height: auto;">
        <div class="rightText" style="text-indent: 2em" v-text="formData.pet"></div>
      </div>
      <div v-else class="mesBox" style="height: auto;"  >
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 50}"
          placeholder="请输入宠物政策"
          v-model="formData.pet">
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "policy",
    data() {
      return {
        formData:{
          merchantid:this.$store.state.mchid,
          mResideTime: "", //最早入住时间',
          eResideTime: "", //最晚入住时间',
          mLeaveTime: "", //最早离店时间',
          eLeaveTime: "", //最晚离店时间',
          child: "", //儿童政策',
          pet: "", //宠物政策',
          breakfast: "", //早餐',
          lunch: "", //午餐',
          afternoontea: "", //下午茶',
          supper: "", //晚餐',
        },
        //入离时间
      
        //四個顯示與否的標識符
        changeF:true,
        changeS:true,
        changeT:true,
        changeFour:true,
      }
    },
    methods:{
      //  以为改一个就要请求一次接口，所以就分开写事件委托了
      //四个修改按钮函数
      toChangeF(){
        this.changeF=false
      },
      toChangeS(){
        this.changeS=false
      },
      toChangeT(){
        this.changeT=false
      },
      toChangeFour(){
        this.changeFour=false
      },

      //保存更改按钮函数
      okChangeF(){
        if(this.formData.mResideTime!=""&&
          this.formData.eResideTime!=""&&
          this.formData.mLeaveTime!=""&&
          this.formData.eLeaveTime!=""){
            this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
            }else{
              this.$message.error(res.msg)
              this.formData.mResideTime=""
              this.formData.eResideTime=""
              this.formData.mLeaveTime=""
              this.formData.eLeaveTime=""
              this.changeF = false
            }
          })
        }else{
          this.$message.warning("请完善信息后提交~")
        }
      },
      okChangeS(){
         if(this.formData.child!=""){
            this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
            }else{
              this.$message.error(res.msg)
              this.formData.child=""
              this.changeS = false
            }
          })
        }else{
          this.$message.warning("请完善信息后提交~")
        }
       
      },
      okChangeT(){
         if(this.formData.breakfast!=""&&
          this.formData.lunch!=""&&
          this.formData.afternoontea!=""&&
          this.formData.supper!=""){
            this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
            }else{
              this.$message.error(res.msg)
              this.formData.breakfast=""
              this.formData.lunch=""
              this.formData.afternoontea=""
              this.formData.supper=""
              this.changeT = false
            }
          })
        }else{
          this.$message.warning("请完善信息后提交~")
        }
      },
      okChangeFour(){
         if(this.formData.pet!=""){
            this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
            }else{
              this.$message.error(res.msg)
              this.formData.pet=""
              this.changeFour = false
            }
          })
        }else{
          this.$message.warning("请完善信息后提交~")
        }
      },
       getData(){//获取数据
        this.$axios.post('/zftds/hotel/house/selectHotelInfo',{
          merchantid:this.$store.state.mchid
        }).then(res=>{
          this.formData = res.data
          // console.log(this.formData,"this.formdata");
          if(this.formData.mResideTime!=""||//入离时间
          this.formData.eResideTime!=""||
          this.formData.mLeaveTime!=""||
          this.formData.eLeaveTime!=""
          ){
            this.changeF = true
          }else{
            this.changeF = false
          }
          if(this.formData.child!=""){//儿童政策
            this.changeS = true
          }else{
            this.changeS = false
          }
           if(this.formData.pet!=""){//宠物政策
            this.changeFour = true
          }else{
            this.changeFour = false
          }
  
          if(this.formData.breakfast!=""||//膳食安排
            this.formData.lunch!=""||
            this.formData.afternoontea!=""||
            this.formData.supper!=""){
            this.changeT = true
          }else{
            this.changeT = false
          }
        })
      },
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang='scss'>
  .active{ border: 1px solid #9dccfa;}
  .title { padding-left: 6px;border-left: 3px solid #75b8fc;}
  .header {font-weight: 600; font-size: 16px}


  /**/
  .okbtn{
    height: 50px;
    line-height: 10px;
    width: 200px;
    border-radius: 25px;
    position: absolute;bottom: 30px;right: 20px;
    background: url('../../image/商户中心+箭头/bgbtn.png')no-repeat;
    background-size: 100% 106%;
    font-size: 18px;
    color: #fff;
    font-weight: 500;
  }
  .mesList{
    padding: 10px 20px;
    margin-bottom: 10px;
    position: relative;
    .mesBox{
      height: 50px;
      line-height: 50px;
      display: block;
      .leftText{
        color: #444;
        font-weight: 600;
        font-size: 14px;
        width: 200px;
        float: left;
      }
      .rightText{
        color: #5c5c5c;
      }
    }
  }

  .el-input{
    width: 400px;
  }


</style>
<style>
/* .el-textarea__inner */
  textarea.el-textarea__inner{
    border: none;
    border-radius: 10px;
    display: inline-block;
    padding: 10px;
    background-color: #f9fbff;
    text-indent: 2em;
    width: 60%;
  }


  .el-main { text-align: left; line-height: 1;}

  .el-button{ border-radius: 20px;  padding: 6px 20px; font-size: 14px;}
  .el-button--text {font-size: 14px; margin-top: 9px;}
  .el-main{

  }
  .el-card__header,.el-card{
    border:none;
  }
  .el-input__inner {
    padding: 18px;
    background: #f9fbff;
    border: none;
  }
</style>

