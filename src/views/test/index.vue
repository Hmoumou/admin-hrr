<template>
    <div class="test">
        <imgupload></imgupload>
        <!--<upload></upload>-->
        <!--<Dupload></Dupload>-->
        <div class="box">
            <div class="text">
            </div>
            <i class="iconfont icon-duigou4"></i>
        </div>
        <searchBox></searchBox>




        <button class="btn" @click="handleclick">按钮</button>
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
        data(){
            return{
                isok:false
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

            },
            handleclick(){
                console.log('isnotok');
            },
            handleok(){
                console.log('isok');
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
      font-size: 14px;//设置iconfont的size，默认是0所以要设置size它才会出现哦
      color: #6b40fc; //设置iconfont的color
    }
    .text{
      margin-bottom: 20px;
    }
   

  }
   .btn{
        background: #ff0;
        width: 50px;
        height: 50px;
    }

</style>
