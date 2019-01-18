<template>
  <div>
    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">销售部</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeF" @click="wayToChangeF">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="wayokChangeF">完&nbsp;成</el-button>
      </div>
      <div class="mesBox">
        <div class="leftText">姓名</div>
        <div class="rightText">
          <span v-if="changeF">{{formData.sellName}}</span>
          <el-input v-model="formData.sellName" v-else></el-input>
        </div>
      </div>
     <div class="mesBox">
        <div class="leftText">移动电话</div>
        <div class="rightText">
          <span v-if="changeF">{{formData.sellMobile}}</span>
          <el-input v-model="formData.sellMobile" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">固定电话</div>
        <div class="rightText">
          <span v-if="changeF">{{formData.sellPhone}}</span>
          <el-input v-model="formData.sellPhone" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">邮箱地址</div>
        <div class="rightText">
          <span v-if="changeF">{{formData.sellEmail}}</span>
          <el-input v-model="formData.sellEmail" v-else></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">预定部</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeS" @click="wayToChangeS">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="wayokChangeS">完&nbsp;成</el-button>
      </div>
     <div class="mesBox">
        <div class="leftText">姓名</div>
        <div class="rightText">
          <span v-if="changeS">{{formData.yName}}</span>
          <el-input v-model="formData.yName" v-else></el-input>
        </div>
      </div>
     <div class="mesBox">
        <div class="leftText">移动电话</div>
        <div class="rightText">
          <span v-if="changeS">{{formData.yMobile}}</span>
          <el-input v-model="formData.yMobile" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">固定电话</div>
        <div class="rightText">
          <span v-if="changeS">{{formData.yPhone}}</span>
          <el-input v-model="formData.yPhone" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">邮箱地址</div>
        <div class="rightText">
          <span v-if="changeS">{{formData.yEmail}}</span>
          <el-input v-model="formData.yEmail" v-else></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card carditem clearfix mesList">
      <div slot="header" class="header">
        <span class="title" style="font-size: 16px;padding-left: 12px;">财务结算</span>
        <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" v-if="changeT" @click="wayToChangeT">修改</el-button>
        <el-button class="okbtn" type="text" v-else @click="wayokChangeT">完&nbsp;成</el-button>
      </div>
      <div class="mesBox">
        <div class="leftText">姓名</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.cName}}</span>
          <el-input v-model="formData.cName" v-else></el-input>
        </div>
      </div>
     <div class="mesBox">
        <div class="leftText">移动电话</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.cMobile}}</span>
          <el-input v-model="formData.cMobile" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">固定电话</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.cPhone}}</span>
          <el-input v-model="formData.cPhone" v-else></el-input>
        </div>
      </div>
      <div class="mesBox">
        <div class="leftText">邮箱地址</div>
        <div class="rightText">
          <span v-if="changeT">{{formData.cEmail}}</span>
          <el-input v-model="formData.cEmail" v-else></el-input>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
	export default {
		name: "phoneWay",
    data() {
      return {
        formData:{
          // sellName: "销售", //销售员姓名',
          // sellMobile: "123", //销售员手机号',
          // sellPhone: "123", //销售员固话',
          // sellEmail: "123.com", //销售员邮箱',
          // yName: "预订", //预订员姓名',
          // yMobile: "1234", //预订员手机号',
          // yPhone: "1234", //预订员固话',
          // yEmail: "1234.com", //预订员邮箱',
          // cName: "财务", //财务员姓名',
          // cMobile: "2345", //财务员手机号',
          // cPhone: "2345", //财务员固话',
          // cEmail: "2345.com", //财务员邮箱',
        },
        changeF:true,
        changeS:true,
        changeT:true,
      }
    },
    methods:{
		  //  以为改一个就要请求一次接口，所以就分开写事件委托了
      wayToChangeF(){
        this.changeF=false
      },
      wayToChangeS(){
        this.changeS=false
      },
      wayToChangeT(){
        this.changeT=false
      },
      wayokChangeF(){
        if(this.formData.sellName&&
        this.formData.sellMobile&&
        this.formData.sellPhone&&
        this.formData.sellEmail){
          this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
              // this.changeF = true
            }else{
              this.$message.error(res.msg)
              this.changeF = false
            }
          })
        }else{
          this.$message.warning("请完善信息~")
        }
        // this.changeF=true
      },
      wayokChangeS(){
        if(this.formData.yName&&
        this.formData.yMobile&&
        this.formData.yPhone&&
        this.formData.yEmail){
          this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
              // this.changeF = true
            }else{
              this.$message.error(res.msg)
              this.changeS = false
            }
          })
        }else{
          this.$message.warning("请完善信息~")
        }
      },
      wayokChangeT(){
        if(this.formData.cName&&
        this.formData.cMobile&&
        this.formData.cPhone&&
        this.formData.cEmail){
          this.$axios.post("/zftds/hotel/house/insertHotelInfo",this.formData).then(res=>{
            console.log(res);
            if(res.code==1){
              this.$message.success(res.msg)
              this.getData()
              // this.changeT = true
            }else{
              this.$message.error(res.msg)
              this.changeT = false
            }
          })
        }else{
          this.$message.warning("请完善信息~")
        }
      },
      getData(){//获取数据
        this.$axios.post('/zftds/hotel/house/selectHotelInfo',{
          merchantid:this.$store.state.mchid
        }).then(res=>{
          console.log(res,"RES");
          this.formData = res.data
          console.log(this.formData,"this.formdata");
          if(this.formData.sellName!=""||
          this.formData.sellMobile!=""||
          this.formData.sellPhone!=""||
          this.formData.sellEmail!=""
          ){
            this.changeF = true
          }else{
            this.changeF = false
          }
           if(this.formData.yName||
          this.formData.yMobile||
          this.formData.yPhone||
          this.formData.yEmail
          ){
            this.changeS = true
          }else{
            this.changeS = false
          }
           if(this.formData.cName||
          this.formData.cMobile||
          this.formData.cPhone||
          this.formData.scEmail
          ){
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
  .header {font-weight: 500; font-size: 16px}


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
      .leftText {
        font-weight: 600;
        font-size: 14px;
        width:200px;
        float: left;
      }
      .rightText {
        width: 60%;
        display: inline-block;
      }
    }
  }

  .el-input{
    width: 400px;

  }


</style>
<style>
  .el-main { text-align: left; line-height: 1;}
  .el-button{ border-radius: 20px;  padding: 6px 20px; font-size: 14px;}
  .el-button--text {font-size: 14px; margin-top: 9px;}
  .el-main{

  }
  .el-card__header,.el-card{
  }
  .el-input__inner {
    padding: 18px;
    background: #f9fbff;
    border: none;
  }
</style>
