<template>
<!-- import { setTimeout } from 'timers';
import { setTimeout } from 'timers'; -->
    <div>
      <div>
        <el-card class="box-card carditem clearfix order-item">
          <div slot="header" class="header">
            <span class="title" >修改信息</span>
            <el-button style="float: right; padding: 3px 0;margin-top: 0px;" type="text" @click="handleCancel">取消</el-button>
          </div>
        </el-card>
        <el-card class="box-card mesList">
        <div class="mesBox">
          <div class="leftText">酒店中文名称</div>
          <div class="rightText"><el-input v-model="Data.hotelName" placeholder="请输入酒店中文名称"></el-input></div>
        </div>
        <div class="mesBox">
          <div class="leftText">酒店星级</div>
          <div class="rightText">
            <el-select v-model="Data.star" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="mesBox">
          <div class="leftText">酒店地址</div>
          <div class="rightText"><el-input  v-model="Data.locating" placeholder="请输入酒店酒店地址"></el-input></div>
        </div>
        <div class="mesBox">
          <div class="leftText">附近商圈</div>
          <div class="rightText"><el-input  v-model="Data.business" placeholder="请输入附近商圈"></el-input></div>
        </div>
      </el-card>
        <el-card class="box-card mesList">
          <div class="mesBox">
            <div class="leftText">开业时间</div>
            <div class="rightText">
              <div class="block">
                <el-date-picker
                  v-model="Data.starttime"
                  type="date"
                  placeholder="请选择 年 - 月 - 日 ">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">最新装修时间</div>
            <div class="rightText">
              <div class="block">
                <el-date-picker
                  v-model="Data.decorateTime"
                  type="date"
                  placeholder="请选择 年 - 月 - 日 ">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">客房总数</div>
            <div class="rightText"><el-input v-model="Data.roomNum" placeholder="请输入客房总数"></el-input></div>
          </div>
        </el-card>
        <el-card class="box-card mesList">

          <div class="mesBox">
            <div class="leftText">酒店总机</div>
            <div class="rightText"><el-input v-model="Data.hotelMobile" placeholder="请输入酒店总机"></el-input></div>
          </div>
          <div class="mesBox" style="height: auto;width: 1200px">
            <div class="leftText">酒店介绍</div>
            <div class="rightText" style="width: 970px;margin-bottom: 20px;margin-top: 5px;">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 50}"
                placeholder="请输入酒店介绍"
                v-model="Data.introduce">
              </el-input>
            </div>
          </div>
        </el-card>
        <div class="submitBtn">
            <el-button  type="primary" round size="medium " @click="handleOk">
              完     成
            </el-button>
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "change",
  data() {
    return {
      Data:{},
      message:{
        hotelNmame:"",  //酒店中文名称
        star:"", //星级
        palce:"",  //地点
        allFood:"",  //周边
        startTime:"",//开业
        newTime:"",//新装修时间
        homeNum:"",//客房数
        hotelNum:"",//酒店数
        mesDetail:""//介绍
      },
      options: [
          {
          value: '5',
          label: '五星'
            },
          {
            value: '4',
            label: '四星'
          }, {
            value: '3',
            label: '三星'
          }, {
            value: '2',
            label: '二星'
          }, {
            value: '1',
            label: '一星'
      }],

   }
  },
    methods: {
      toChange(){
        this.$router.push("/layout/sellerCenterChange")
      },
      handleOk(){
        console.log(this.Data);
        this.$axios.post('/zftds/hotel/house/insertHotelInfo',this.Data).then(res=>{
          console.log(res);
          if(res.code == 1){
            this.$message.success(res.msg)
            this.$router.push('/layout/sellerCenter')
          }else{
            this.$message.error(res.msg)
            this.$router.push('/layout/sellerCenter')
          }
        })
        // this.$router.push('/layout/sellerCenter')
      },
      handleCancel(){
        this.$router.push('/layout/sellerCenter')
      }
    },
    created(){
      // console.log(this.$route.query);
      this.Data = this.$route.query
      console.log(this.Data);
    }
	}
</script>


<style scoped lang='scss'>
  .active{ border: 1px solid #9dccfa;}
  .title { padding-left: 6px;border-left: 3px solid #75b8fc;}
  .header {font-weight: 500; font-size: 16px;}
  .order-item {/deep/ .el-card__body {display: none; }}


  /**/
  .mesList{
    padding: 0px 20px; 
    margin-bottom: 10px;
    .mesBox{
      height: 50px;
      line-height: 50px;
      display: block;
      width: 100%;
      margin-bottom: 10px;
      .leftText{
        font-weight: 600;
        font-size: 14px;
        width:200px;
        float: left;
      }
      .rightText{
        width: 60%;
        display:inline-block;
      }
    }
  }
  .submitBtn{
    height: 150px;
    position: relative;
    .el-button{
      width: 200px;
      height: 50px;
      border-radius: 25px;
      position: absolute;
      right: 50px;
      top: 40%;
    }
  }

  .el-card__header,.el-card{
  }
 .el-select{
    width: 100%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  
  /deep/ .el-input__inner { background: #f9fbff;border: none; padding-left: 30px;}
  .el-button--text { margin-top: 9px;}

</style>
<style>
  .el-main { text-align: left; line-height: 1;}
  .el-button{ padding: 6px 20px; font-size: 14px;}
  .el-textarea__inner{width: 60%;background-color: #f9fbff;}
</style>
