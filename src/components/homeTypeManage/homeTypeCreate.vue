<template>
  <div class="houseTypeCreate">
    <el-card class="box-card  carditem">
      <div
        slot="header"
        class="header clearfix"
      >
        <span class="title">新建房型</span>
      </div>
      <!-- 右表格 -->
      <el-form  class="rightForm" :model='formRightData' label-width="100px" label-position='left'>
        <el-form-item label="无烟信息" prop="smokeInfo">
            <el-input class="detailInfo"  placeholder='该房型有无烟房，可无烟处理'></el-input>
        </el-form-item>
        <el-form-item label="最多入住" prop="maxPeople">
            <el-input class="detailInfo"  placeholder='请输入人数'></el-input>
             人
        </el-form-item>
        <el-form-item label="描述" prop="describe">
            <el-input class="describeInfo" type="textarea" :rows="5" v-model="formRightData.describe" placeholder='大床1.8米'></el-input>
        </el-form-item>
      </el-form>
      <!-- 左表格 -->
      <el-form  class="leftForm" :model='formLeftData' label-width="100px" label-position='left'>

        <el-form-item label="房间面积" prop="houseArea">
            <el-input class="detailInfo"  placeholder='请输入房间面积'></el-input>
        </el-form-item>
        <el-form-item  label="房间房型" prop="houseType" >
           <el-input class="detailInfo"  placeholder='请输入房间房型'></el-input>
        </el-form-item>
        <!--新添房间数量-->
        <el-form-item label="房间数量" prop="houseNum">
          <el-input class="detailInfo"  placeholder='请输入房间数量'></el-input>
        </el-form-item>
        <el-form-item label="床宽" prop="bedWidth">
          <el-input class="detailInfo" placeholder='请输入床宽'> </el-input>
        </el-form-item>
        <!--新加床数-->
        <el-form-item label="床数" prop="bedWidth">
          <el-input class="detailInfo" placeholder='请输入床的数量'> </el-input>
        </el-form-item>
        <!-- 添加 单价 -->
        <el-form-item label="价格" prop="price">
          <el-input class="detailInfo"  placeholder='请输入价格'></el-input>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "houseTypeCreate",
  components: {},
  data() {
    return {
      formRightData: {
        smokeInfo: "",
        maxPeople: "",
        breakfast: "",
        internet: "",
        describe: ""
      },
      formLeftData: {
        price:"",
        houseArea: "",
        houseType: "",
        floor: "",
        bedWidth: "",
        bathroom: "",
        window: "",
        houseNum:'',

      }
    };
  },
  methods: {},
  created(){

  }
};
</script>

<style scoped lang='scss'>
  .houseTypeCreate{
    .carditem {
      margin-bottom: 10px;
    }
    .title {
      padding-left: 6px;
      border-left: 3px solid #75b8fc;
    }
    .header {
      font-weight: 700;
    }
    .rightForm {
      float: right;
      width: 45%;
      .detailInfo {
        width: 60%;
      }
      .describeInfo{
        /*padding: 20px;*/
        width:60%;
      }
    }
    .leftForm {
      float: left;
      margin-left: 1%;
      margin-bottom: 30px;
      width: 48%;
      border-right:1px dashed rgb(204, 197, 197);
      .detailInfo {
        width: 60%;
      }
    }

    /deep/ .el-form-item__label{
      font-weight: 600;
    }
    /deep/ input.el-input__inner{
      padding-left: 20px;
      background-color: #eff5ff;
    }
    /deep/ textarea.el-textarea__inner{
      background-color: #eff5ff;
    }
    .el-form-item{
      margin-bottom: 10px;

    }
    .el-input-inner {
      padding-left: 10px;

    }
  }

</style>
<style>
.el-form-item{
    margin-bottom: 10px;

}
.el-input-inner {
    padding-left: 10px;

}

</style>
