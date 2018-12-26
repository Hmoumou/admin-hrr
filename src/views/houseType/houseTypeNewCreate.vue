<template>
  <div class="houseTypeNewCreate">
    <!--新建房型列表start-->
    <div class="houseTypeCreate">
      <el-card class="box-card  carditem">
        <div
          slot="header"
          class="header clearfix"
        >
          <span class="title">{{this.$route.meta.title == '房型新建'?'房型新建':'房型修改'}}</span>
        </div>
        <!-- 右表格 -->
        <el-form  class="rightForm" :model='formData' label-width="100px" label-position='left'>
          <el-form-item label="无烟信息" prop="smoke">
            <el-input class="detailInfo" v-model="formData.smoke"  placeholder='该房型有无烟房，可无烟处理'></el-input>
          </el-form-item>
          <el-form-item label="最多入住" prop="person">
            <el-input class="detailInfo" v-model="formData.person"   placeholder='请输入人数'></el-input>
            人
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input class="describeInfo" v-model="formData.remark"  type="textarea" :rows="5"  placeholder='大床1.8米'></el-input>
          </el-form-item>
        </el-form>
        <!-- 左表格 -->
        <el-form  class="leftForm" :model='formData' label-width="100px" label-position='left'>
          <el-form-item label="房间面积" prop="acreage">
            <el-input class="detailInfo" v-model="formData.acreage"  placeholder='请输入房间面积'></el-input>
          </el-form-item>
          <el-form-item  label="房间房型" prop="houseinfo" >
             <el-input class="detailInfo"  v-model="formData.houseinfo"  placeholder='请输入房间房型'></el-input>
          </el-form-item>
          <!--新添房间数量-->
          <el-form-item label="房间数量" prop="roomsnum">
            <el-input class="detailInfo" v-model="formData.roomsnum"  placeholder='请输入房间数量'></el-input>
          </el-form-item>
          <el-form-item label="床宽" prop="bedinfo">
            <el-input class="detailInfo" v-model="formData.bedinfo" placeholder='请输入床宽'> </el-input>
          </el-form-item>
          <!--新加床数-->
          <el-form-item label="床数" prop="bednum">
            <el-input class="detailInfo" v-model="formData.bednum" placeholder='请输入床的数量'> </el-input>
          </el-form-item>
          <!-- 添加 单价 -->
          <el-form-item label="价格" prop="price">
            <el-input class="detailInfo"  v-model="formData.price" placeholder='请输入价格'></el-input>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
    <!--新建房型列表end-->

    <!--相册管理-->
    <div class="houseTypePhoto">
      <el-card class="box-card  carditem">
        <div
          slot="header"
          class="header clearfix"
        >
          <span class="rightTitle">*最多上传5张</span>
          <span class="title">房型相册</span>
        </div>
        <span class="secondTitle">*图片尺寸：1920*900</span>
        <div class="imageDiv ">
          <upload  v-model='photoArr'></upload>
        </div>
      </el-card>
    </div>
    <!--相册end-->

    <!--设施详情开始-->
    <el-card class="facility-details">
      <div slot="header">
        <span class="title">设施详情</span>
      </div>
      <p class="facility-desc blue">*请选择该房型包含的设施</p>
      <div class="facility-container">
        <dyCheckbox v-model="formData.facility" :options="checkBoxOptions" :disabled="false" ></dyCheckbox>
      </div>
    </el-card>
    <!--设施详情结束-->

    <div class="btn" v-if="this.$route.meta.title == '房型新建'" @click="createComplete">完成</div>
    <div class="btn" v-else @click="handleisEdit">完成</div>
    <el-button
      class="backBtn clearfix"
      type="text"
      @click="showManageView"
    >
     <img src="@/image/home/leftArrow.png" class="fll" style="width: 40px; height: 40px" />
     <span class="backText fll mt10">返回上一步</span>
    </el-button>
  </div>
</template>

<script>
import dyCheckbox from '@/components/homeTypeManage/dy-checkbox'
import upload from '@/components/imgupload/dy-upload.vue'

export default {
  name: "houseTypeNewCreate",
  components: {
    dyCheckbox,
    upload
  },
  data() {
    return {
      // data start
      formData:{
      // 需要的东西
        acreage:"",
        addtime:" ",
        bedinfo:"",
        bednum:"",
        facility:[],
        houseinfo:"",
        id:6,
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        img4:"",
        merchantid:100023,
        person:"",
        price:"",
        remark:"",
        roomsnum:"",
        smoke:"",
      },
      photoArr:[],

      // data end
      checkBoxOptions: [
        {
          label: '1',
          text: '热水',
          icon: 'icon-xiaoshireshui'
        },
        {
          label: '2',
          text: '电吹风',
          icon: 'icon-chuifengji'
        },
        {
          label: '3',
          text: '淋浴',
          icon: 'icon-linyu'
        },
        {
          label: '4',
          text: '淋浴',
          icon: 'icon-wifi'
        },
        {
          label: '5',
          text: '卫生间',
          icon: 'icon-matong'
        },
        {
          label: '6',
          text: '洗漱用品',
          icon: 'icon-xishuyongpin'
        },
        {
          label: '7',
          text: '窗户',
          icon: 'icon-chuanghu'
        },
        {
          label: '8',
          text: '早餐',
          icon: 'icon-a-breakfast',
          spe: true
        },
      ]
    };
  },
  methods: {
    getdetails(){
      // let facility = [],

    },
    // 得到相册
    getphoto(){
      let obj = this.formData
      let photoArr = [];
      for(let key in obj) {
        if(key.indexOf("img")!=-1){
          if(obj[key]) {
            photoArr.push(obj[key])
          }
        }
      }
      // console.log(photoArr);
      this.photoArr = photoArr
    },
    // 提交修改
    handleisEdit(){
      let  formData1 = this.formData
      if(formData1.merchantid){
        formData1.img1 = this.photoArr[0]
        formData1.img2 = this.photoArr[1]
        formData1.img3 = this.photoArr[2]
        formData1.img4 = this.photoArr[3]
        formData1.img5 = this.photoArr[4]
        formData1.facility = formData1.facility.toString()
        // console.log('修改之后需要提交的数据',formData1);
        this.$axios.post('/zftds/hotel/house/updateHotelHouse',formData1).then(res=>{
          // console.log(res);
          if(res.code == 1){
            this.$message.success(res.msg)
            setTimeout(()=>{
              this.$router.push('/layout/houseType')
            },1000)
          }
        })
      }
    },
    // 提交新建Q
    createComplete() {
      let  formData1 = this.formData
      if(formData1.merchantid){
        formData1.img1 = this.photoArr[0]
        formData1.img2 = this.photoArr[1]
        formData1.img3 = this.photoArr[2]
        formData1.img4 = this.photoArr[3]
        formData1.img5 = this.photoArr[4]
        formData1.facility = formData1.facility.toString()
        this.$axios.post('/zftds/hotel/house/insertHotelHouse',formData1).then(res=>{
          console.log(res);
          if(res.code == 1){
            this.$message.success(res.msg)
            setTimeout(()=>{
              this.$router.push('/layout/houseType')
            },1000)
          }
        })
      }
    },
    showManageView() {
      this.$router.push('/layout/houseType')
    },
    getData() {
      const url = "";
      this.$axios.get("")
      this.getphoto()
    }
  },
  created() {
    if(this.$route.meta.title == "房型修改"){
      // console.log('我想带过来的数据',this.$route.params)
      // this.formData = this.$route.params.abc
      this.getData()
    }else{
      console.log(this.$route.meta.title);
    }
  }
};
</script>


<!--少了detail的样式-->
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
  /*createend*/
  /*photostart*/
  .houseTypePhoto {
    padding: 10px;
    margin-bottom:20px;
    .header {
      font-weight: 700;
    }
    .title {
      padding-left: 6px;
      border-left: 3px solid #75b8fc;
    }
    .rightTitle {
      float: right;
      font-size: 14px;
      color: #409eff;
    }
    .secondTitle {
      font-size: 14px;
      color: #409eff;
      font-weight: 500;
    }
    .imageDiv {
      box-sizing: border-box;
      width: 100%;
      margin-top: 20px;
    }
  }
  /*end*/
.btn {
  float: right;
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 20px 15px 20px 0;
  color: #fff;
  width: 200px;
  height: 54px;
  line-height: 40px;
  border-radius: 20px;
  font-weight: 600;
  background: url("../../image/home/btn1.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.backBtn{
  margin-left: 20px;
  margin-top: 20px;

}
.mt10{ margin-top: 10px; }
.facility-details {
  .title {
    font-weight: 700;
    border-left: 3px solid #75b8fc;
    padding-left: 6px;
  }

  .facility-desc {
    color: #5e94fd;
    font-weight: 500;
  }

  .facility-container {
    margin-top: 36px;
    padding-bottom: 30px;
  }
}
</style>
<style scoped lang='scss'>
  .houseTypeDetail {
    padding: 10px;
  }
  .header {
    font-weight: 700;
  }
  .title {
    padding-left: 6px;
    border-left: 3px solid #75b8fc;
  }
  .asideLeft {
    width: 15%;
    .active{
      border: 1px solid #f1f1f1;
      // background: #f1f1f1;
      background: url('../../image/房型/矩形.png')no-repeat;
      background-size: 100% 100%;
      line-height: 60px;
      color: #fff;
      width: 100%;
      height: 60px;
      text-align: center;
    }
    .btn{
      border: 1px solid #e1ecff;
      background: #f9fbfe;
      line-height: 60px;
      color: #518dfd;
      width: 100%;
      height: 60px;
      text-align: center;
    }
    .btn:active{
      background: url('../../image/房型/矩形.png')no-repeat;
      background-size: 100% 100%;
    }
  }
  .photoBrowse {
    position: relative;
    float: right;
    width: 85%;
    background-color: #f1f5fd;
    height: 300px;
    margin-bottom: 40px;

    .leftArrow {
      position: absolute;
      top: 150px;
      left: 20px;
    }
    ///房型轮播图
    .houseTypePhoto{
      margin: 26px auto;
      width: 80%;
      height: 100%;
      overflow-x: hidden;
      .box{
        width: 1850px;
        img{
          margin-right:20px;
          float: left;
          width: 350px
        }
      }
    }

    .rightArrow {
      position: absolute;
      top: 150px;
      right: 20px;
    }
  }
  .textDetail {
    float: left;
    width: 100%;
    display: flex;
    .titleText {
      margin-left: 6%;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
    .item {
      font-size: 14px;
      margin-left: 5%;
      margin-bottom: 30px;
      width: 24%;
      border-right: 1px dashed #f1f1f1;
      .itemDetail {
        margin-bottom: 10px;
        .itemTitle {
          margin-right: 15px;
          font-weight: 600;
        }
        .detail {
          font-weight: 400;
        }
      }
    }
    .noborder {
      border-right: 0px;
    }
  }
  .describe {
    background-color: #f1f5fd;
    width: 82%;
    float: right;
    padding: 15px 20px 15px 20px;
    margin-bottom: 30px;
    .describeTitle {
      display: block;
      margin-bottom: 15px;
      font-weight: 600;
    }
  }



</style>
<style>
  .el-main{
    text-align: left;
    line-height: 1;
  }
</style>
