<template>
    <div class="test">
        <imgupload></imgupload>
        <!--<upload></upload>-->
        <!--<Dupload></Dupload>-->
        <div class="box">
            <div class="text">
              iconfont官网，新建项目，添加项目成员，上传图标 点击上传图标至项目   使用：点击fontclass  点击生成代码 在html中引入.css
              <br>
              使用： 如下：
            </div>
            <i class="iconfont icon-duigou4"></i>
        </div>

        <searchBox></searchBox>
    </div>
</template>

<script>
import imgupload from '@/components/imgupload/upload.vue'
import upload from '@/components/imgupload/dy-upload.vue'
import Dupload from '@/components/imgupload/hotel-photo.vue'
import searchBox from '@/components/searchBox/index.vue'
    export default {
        name:'test',
        props:{
            content:{
                type:String,
                default:()=>{return "from child"}
            }
        },
        components:{
            imgupload,
            upload,
            Dupload,
            searchBox

        },
        methods:{
            getData(){

            }
        },
        created(){
            console.log(this.content);
        }
    }
</script>

<style scoped lang="scss">
  .box{
    padding: 50px;
    width: 500px;
    height: 200px;
    border: 1px solid #000;
    .icon-duigou4{
      font-size: 14px;//设置iconfont的size
      color: #6b40fc; //设置iconfont的color
    }
    .text{
      margin-bottom: 20px;
    }

  }

</style>
