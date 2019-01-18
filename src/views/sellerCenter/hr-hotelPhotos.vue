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
      <el-button type="primary" @click="handleUpload" class="flr btn" style="marginRight:20px;">
        完 成
      </el-button>
    </div>
</template>

<script>
import upload from '@/components/imgupload/dy-upload.vue'
    export default {
        name:'houtelPhotos',
        data(){
            return{
              formData:{},
              photoArr:[],
              photoArr1:[],
              photoArr2:[],
            }
        },
        components:{
            upload,
        },
        methods:{
          handleUpload(){
            console.log(this.photoArr,this.photoArr1,this.photoArr2)
            let data = {
                merchantid:this.$store.state.mchid,
                outerImg1: "", //酒店外观图片',
                outerImg2:"", //酒店外观图片',
                outerImg3:"", //酒店外观图片',
                outerImg4:"", //酒店外观图片',
                outerImg5:"", //酒店外观图片',
                innerImg6:"" , //酒店内景图片',
                innerImg7: "", //酒店内景图片',
                innerImg8: "", //酒店内景图片',
                innerImg9: "", //酒店内景图片',
                innerImg10: "", //酒店内景图片',
                elseImg11:"", //酒店其他图片',
                elseImg12: "", //酒店其他图片',
                elseImg13: "", //酒店其他图片',
                elseImg14: "", //酒店其他图片',
                elseImg15: "" //酒店其他图片',
            }
            //酒店外观
            if(this.photoArr[0]){
              data.outerImg1 = this.photoArr[0]
            }
             if(this.photoArr[1]){
              data.outerImg2 = this.photoArr[1]
            }
             if(this.photoArr[2]){
              data.outerImg3 = this.photoArr[2]
            }
             if(this.photoArr[3]){
              data.outerImg4 = this.photoArr[3]
            }
             if(this.photoArr[4]){
              data.outerImg4 = this.photoArr[4]
            }
            // 酒店内景
             if(this.photoArr1[0]){
              data.innerImg6 = this.photoArr1[0]
            }
             if(this.photoArr1[1]){
              data.innerImg7 = this.photoArr1[1]
            }
             if(this.photoArr1[2]){
              data.innerImg8 = this.photoArr1[2]
            }
             if(this.photoArr1[3]){
              data.innerImg9 = this.photoArr1[3]
            }
             if(this.photoArr1[4]){
              data.innerImg10 = this.photoArr1[4]
            }
            // 其他
             if(this.photoArr2[0]){
              data.elseImg11 = this.photoArr2[0]
            }
             if(this.photoArr2[1]){
              data.elseImg12 = this.photoArr2[1]
            }
             if(this.photoArr2[2]){
              data.elseImg13 = this.photoArr2[2]
            }
             if(this.photoArr2[3]){
              data.elseImg14 = this.photoArr2[3]
            }
             if(this.photoArr2[4]){
              data.elseImg15 = this.photoArr2[4]
            }
            console.log(data);
            this.$axios.post("/zftds/hotel/house/insertHotelInfo",data).then(res=>{
              console.log(res);
              if(res.code==1){
                this.$message.success(res.msg)
                this.getData()
              }else{
                this.$message.error(res.msg)
                this.getData()
              }
            })
          },
           getData(){//获取数据
              this.$axios.post('/zftds/hotel/house/selectHotelInfo',{
                merchantid:this.$store.state.mchid
              }).then(res=>{
                this.formData = res.data
                console.log(this.formData,"this.formdata");
                let obj = this.formData
                let photoArr = [];
                let photoArr1 = [];
                let photoArr2 = [];
                for(let key in obj) {
                  if(key.indexOf("outerImg")!=-1){
                    if(obj[key]) {
                      photoArr.push(obj[key])
                    }
                  }else if(key.indexOf("innerImg")!=-1){
                    if(obj[key]) {
                      photoArrs1.push(obj[key])
                    }
                  }else if(key.indexOf("elseImg")!=-1){
                    if(obj[key]) {
                      photoArrs2.push(obj[key])
                    }
                  }
                }
                this.photoArr = photoArr
                this.photoArr1 = photoArr1
                this.photoArr2 = photoArr2
                console.log(this.photoArr,"0000");
                console.log(this.photoArr1,"1111");
                console.log(this.photoArr2,"2222");
              })
            },
        },
        created(){
          this.getData()
        }

    }
</script>

<style scoped lang='scss'>
.hotelPhotos{ 
  .btn{
    font-size: 16px;
    width: 120px;
    height: 40px;
  }
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
