<template>
    <div class="hotelPhotos">
        <!--  -->
      <el-card class="box-card  carditem">
        <div
          slot="header"
          class="header clearfix"
        >
          <span class="rightTitle flr fw500">*最多上传5张</span>
          <span class="title">酒店外观</span>
        </div>
        <span class="secondTitle blue">*图片上限2MB</span>
        <div class="imageDiv ">
          <upload v-model='photoArr'></upload>
        </div>
      </el-card>
      <!--  -->
      <el-card class="box-card  carditem">
        <div
          slot="header"
          class="header clearfix">
          <span class="rightTitle flr fw500">*最多上传5张</span>
          <span class="title">酒店内景</span>
        </div>
        <span class="secondTitle blue">*图片上限2MB</span>
        <div class="imageDiv ">
          <upload v-model='photoArr1'></upload>
        </div>
      </el-card>
      <!--  -->
      <el-card class="box-card  carditem">
        <div
          slot="header"
          class="header clearfix">
          <span class="rightTitle flr fw500">*最多上传5张</span>
          <span class="title">其他</span>
        </div>
        <span class="secondTitle blue">*图片上限2MB</span>
        <div class="imageDiv">
          <upload v-model='photoArr2'></upload>
        </div>
      </el-card>
      <el-button type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>
</template>

<script>
import upload from '@/components/imgupload/dy-upload.vue'
    export default {
        name:'houtelPhotos',
        data(){
            return{
                photoArr:[],
                photoArr1:[],
                photoArr2:[],
                arr1:{
                  img1:'',
                  img2:'',
                  img3:'',
                  img4:'',
                  img5:'',
                },
                arr2:{
                  img1:'',
                  img2:'',
                  img3:'',
                  img4:'',
                  img5:'',
                },
                arr3:{
                  img1:'',
                  img2:'',
                  img3:'',
                  img4:'',
                  img5:'',
                },
            }
        },
        components:{
            upload,
        },
        methods:{
          handleUpload(){
            console.log(this.photoArr,this.photoArr1,this.photoArr2)
            this.photoArr.map(item=>{
              console.log(item)
            })
          }
        },

    }
</script>

<style scoped lang='scss'>
.hotelPhotos{ 
    // padding: 10px;
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
    .carditem{
        margin-bottom: 15px;
    }
}
 .title{ padding-left: 6px;border-left:3px solid #75b8fc;}
  .header{font-weight: 700;}
</style>
<style>
.el-card__header{
  padding: 12px 20px;
  font-size:16px;
  border-bottom: 1px solid #ebeef5;
}
</style>
