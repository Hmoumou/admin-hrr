<template>
  <div class="homeTypeList">
    <!-- list -->
    <el-card class="box-card carditem">
      <div slot="header" class="header clearfix">
        <span class="title">房型管理</span>
        <el-button
          style="float: right; padding: 5px ; width: 150px"
          type="primary"
          round
          @click="showCreateView"
        >新建房型</el-button>
      </div>
      <div class="homeItemList">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <!-- start -->
              <div
               class="homeItem"
                v-for="(item,index) in homeData"
                id="item"
                :key="index"
                :class="{ItemActive : activeIndex == index}"
                @click="handleClick(index)"
              >
                <div class="edit flr">
                  <el-button type="text" class="editBtn" @click="handleChange(index)">修改</el-button>
                  <span class="blue fll fs14 line">|</span>
                  <el-button type="text" class="editBtn" @click="handleDelete(item)">删除</el-button>
                </div>

                <img
                  src="@/image/0001.jpg"
                  style="width: 100px; height:100px;
                    float: left; margin-right: 15px;"
                >
                <div class="homeInfo clearfix">
                  <strong class="fs14">{{item.houseinfo}}</strong>
                  <div class="infoTitleDiv">
                    <span class="infoTitle">面积</span>
                    <span class="infoTitle">床宽</span>
                    <!-- <span class="infoTitle">卫浴</span> -->
                    <span class="infoTitle">最多入住</span>
                  </div>
                  <div class="infoDataDiv">
                    <span class="infoData">{{item.acreage}}</span>
                    <span class="infoData">{{item.bedinfo}}</span>
                    <!-- <span class="infoData">{{item.bath}}</span> -->
                    <span class="infoData">{{item.person}}人</span>
                  </div>
                </div>
              </div>
              <!-- end -->
              <!-- 删除dialog -->
              <el-dialog v-if="isdialog" title="警告" :visible.sync="isdialog" width="30%" center>
                <span>此操作将会彻底删除本种类型的房型，您确定删除吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="isdialog = false">取 消</el-button>
                  <el-button type="primary" @click="ensureDelete(index)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pageBtn">
        <el-button type="primary" @click='handlelast' plain>上一页</el-button>
        <el-button type="primary" @click="handlenext" plain>下一页</el-button>
      </div>
    </el-card>
    <!-- details -->
    <div class="houseTypeDetail" >
      <el-card class="box-card carditem"  >
        <div slot="header" class="header clearfix">
          <!-- {{homeData[activeIndex].homeType}} -->
          <span class="title">
            {{homeData[activeIndex].houseinfo}}
          </span>
        </div>

        <!--轮播图部分开始-->
        <div class="swiper-container">
          <swiper :options="swiperOption1" ref="mySwiper1" >
            <!-- slides -->
            <swiper-slide v-for="(item, index) in photoArr" :key="index">
              <div class="swiper-img-wrap" style="background: #333;text-align: center;padding: 20px 0;">
                <img :src="item" alt="">
              </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
          <div class="thumbs clearfix">
            <div class="thumbs-item-wrap fll" v-for="(item, index) in photoArr" :key="index" :class="{active: slideIndex == index}" @click="handleClickThumbs(index)">
              <img :src="item" alt="" class="thums-item-img">
            </div>
          </div>
        </div>
        <!--轮播图部分结束-->
        <!--<div class="photoBrowse clearfix">-->
          <!--&lt;!&ndash; 左箭头 &ndash;&gt;-->
          <!--<img class="rightArrow" src="@/image/商户中心+箭头/rightArrow.png" @click="handleSlide(-1)">-->
          <!--&lt;!&ndash; 中间的房型图 &ndash;&gt;-->
          <!--<div class="houseTypePhoto clearfix">-->
            <!--<div class="box">-->
              <!--<swiper :options="swiperOption1" ref="mySwiper1" v-show="photoIndex == 0">-->
                <!--<swiper-slide v-for="(item, index) in photoArr" :key="index"><img :src="item" alt="" :key="index"></swiper-slide>-->
                <!--<div class="swiper-pagination"  slot="pagination"></div>-->
              <!--</swiper>-->
              <!--<swiper :options="swiperOption1" ref="mySwiper2" v-show="photoIndex == 1">-->
                <!--<swiper-slide v-for="(item, index) in photoArr2" :key="index"><img :src="item" alt="" :key="index"></swiper-slide>-->
                <!--<div class="swiper-pagination"  slot="pagination"></div>-->
              <!--</swiper>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash; 右箭头 &ndash;&gt;-->
          <!--<img class="leftArrow" src="@/image/商户中心+箭头/leftArrow.png" @click="handleSlide(1)">-->
        <!--</div>-->
        <!--<div class="asideLeft">-->
          <!--&lt;!&ndash; <button class="btn">房型相册</button>-->
          <!--<button class="btn">图文详情</button>&ndash;&gt;-->
          <!--<div class="btn" :class="{active: photoIndex == 0}" @click="photoIndexChange(0)">房型相册</div>-->
          <!--<div class="btn" :class="{active: photoIndex == 1}" @click="photoIndexChange(1)">图文详情</div>-->
        <!--</div>-->

        <div class="textDetail clearfix">
          <div class="item">
            <div class="itemDetail clearfix">
              <span class="itemTitle">房间面积</span>
              <span class="detail">{{homeData[activeIndex].acreage}}</span>
            </div>
            <div class="itemDetail clearfix">
              <span class="itemTitle">房型</span>
              <span class="detail">{{homeData[activeIndex].houseinfo}}</span>
            </div>
            <div class="itemDetail clearfix">
              <span class="itemTitle">房间数量</span>
              <span class="detail">{{homeData[activeIndex].roomsnum}}</span>
            </div>
             <div class="itemDetail clearfix">
              <span class="itemTitle">房间价格</span>
              <span class="detail">{{homeData[activeIndex].price}}/晚</span>
            </div>
          </div>

          <div class="item">
            <div class="itemDetail clearfix">
              <span class="itemTitle">床宽</span>
              <span class="detail">{{homeData[activeIndex].bedinfo}}</span>
            </div>
            <div class="itemDetail clearfix">
              <span class="itemTitle">床数</span>
              <span class="detail">{{homeData[activeIndex].bednum}}</span>
            </div>
             <div class="itemDetail clearfix">
              <span class="itemTitle">无烟信息</span>
              <span class="detail">{{homeData[activeIndex].smoke}}</span>
            </div>
            <div class="itemDetail clearfix">
              <span class="itemTitle">最多入住</span>
              <span class="detail">{{homeData[activeIndex].person}}人</span>
            </div>
          </div>
          <!-- describe  -->
          <div class="item">
            <div class="itemDetail clearfix">
              <span class="itemTitle ">描述</span>
              <span class="detailText ">{{homeData[activeIndex].remark}}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!--设施详情开始-->
      <el-card class="facility-details">
        <div slot="header">
          <span class="title">设施详情</span>
        </div>
        <!-- <p class="facility-desc">请选择该房型包含的设施</p> -->
        <div class="facility-container">
          <dyCheckbox v-model="homeData[activeIndex].facility" :options="checkBoxOptions" :disabled="true" ></dyCheckbox>
        </div>
      </el-card>
      <!--设施详情结束-->
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import dyCheckbox from '@/components/homeTypeManage/dy-checkbox'

export default {
  name: "homeTypeList",
  components: {
    swiper,
    swiperSlide,
    dyCheckbox
  },
  data() {
    const vm = this; // 保存this 值给swiper 使用
    return {
      // details
      total:'',
      slideIndex: 0,
      // 设施详情
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
          text: 'WIFI',
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
        {
          label: '9',
          text: '宽带上网',
          icon: 'icon-shangwangxingwei',
        },
      ],
      swiperOption1:{
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on:{
          slideChange: function(index){
            let realIndex = this.realIndex;
            vm.slideIndex = realIndex;
          },
        },
      },
      photoIndex: 0,
      photoArr:[
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2213670986,2923778817&fm=27&gp=0.jpg',
        'http://placehold.it/423x300/0f0',
        'http://placehold.it/423x300/6700ff',
        'http://placehold.it/423x300/409eff',
        'http://placehold.it/423x300/ff0'
      ],
      data1:{
        merchantid:this.$store.state.mchid,
        page:1,
        rows:6
      },
      photoArr2: [
        'http://placehold.it/423x300/ccc',
        'http://placehold.it/423x300/c10',
        'http://placehold.it/423x300/c11',
        'http://placehold.it/423x300/f20',
        'http://placehold.it/423x300/0da',
      ],
      // list
      activeIndex: 0,
      isdialog: false,
      index: "",
      homeData: [
        {
          houseinfo: "豪华大床房1",
          acreage: "33平方米",
          bedinfo: "大床1.8m",
          person: "2",
          smoke:'该房型有无烟房，可无烟处理',//无烟信息，
          remark:'房间禁止小朋友嬉戏打闹，禁止吸烟',
          // 新增
          roomsnum:30,
          price:'998',
          bednum:'1',
          facility: ["1","2","3","4","5","6","7"],
        }
      ],
     
    };
  },
  methods: {
    handlelast(){
      console.log(this.data1.page);
      if(this.data1.page >1){
        this.data1.page = this.data1.page-1
        this.getData()
      }else{
        this.$message('已经是第一页了哦')
      }
    },
    handlenext(){
      console.log(this.data1.page);
      if(this.total-(this.data1.page*this.data1.rows)>0){
       this.data1.page = this.data1.page+1
       console.log(this.data1.page);
       this.getData() 
      }else{
        this.$message('已经是最后一页了哦')
      }
    },
    getData(){
      this.$axios.post(`/zftds/hotel/house/selectHotelHouse`,this.data1).then(res=>{
        console.log(res.data);
        if(res.code == 1){
          this.homeData = res.data.rows.map(item => {
            item.facility = item.facility.split(",");
            return item
          })
          this.handleClick(this.activeIndex)
          this.total = res.data.total
          
        }else if(res.code == 0){
          console.log(res.msg);
        }
      })
    },
    handleClickThumbs(index) {
      console.log(index, index);
      this.$refs.mySwiper1.swiper.slideTo(index + 1)
      this.slideIndex = index;
    },
    showCreateView() {
      // this.$emit("showCreateView");
      this.$router.push('/layout/houseType/create')
    },
    handleChange(index) {
      // console.log('1111',this.homeData[index])
      this.$router.push({
        name:'edit',
        query: {
          id: this.homeData[index].id,
          page:this.data1.page
        }
      })
    },//点击修改
    handleClick(index) { // 点击房型item
      let obj = this.homeData[index]
      let photoArr = [];
      for(let key in obj) {
        if(key.indexOf("img")!=-1){
          if(obj[key]) {
            photoArr.push(obj[key])
          }
        }
      }

      this.activeIndex = index;
      this.photoArr = photoArr
    },
    handleDelete(item) { // 点击删除
    console.log(item.id);
      this.isdialog = true;
      this.index = item.id;
    },
    ensureDelete(index) { // 确认删除
      // console.log(this.index);
      this.$axios.post(`/zftds/hotel/house/deleteHotelHouse`,{id:this.index}).then(res=>{
        console.log(res)
        if(res.code == 0||res.code == 1){
            this.$message(res.msg)
            this.getData()
        }
      })
      this.isdialog = false;
    },
    // details---------------------------------------
    handleSlide (num) {
      let swiper = this.photoIndex == 0 ? this.$refs.mySwiper1.swiper : this.$refs.mySwiper2.swiper
      if(num == 1) {
        swiper.slideNext()
      } else {
        swiper.slidePrev()
      }
    },
    photoIndexChange(index){
      this.photoIndex = index;
    },
  },
  created() {
   this.getData()
  }
};
</script>

<style scoped lang='scss'>
.homeItemList {
}
.homeItem {
  width: 32%;
  border: 1px solid #f1f1f1;
  padding: 15px;
  margin: 5px;
  display: inline-block;
  span,
  strong {
    display: block;
  }
}
.ItemActive {
  background: #f2f7ff;
  border: 1px solid #409eff;
}
.edit {
  .editBtn {
    float: left;
    padding: 0;
  }
  .line {
    color: #dbd8d8;
  }
}

.homeInfo {
  .infoTitleDiv {
    margin-top: 10px;
    padding-right: 10px;
    float: left;
  }
  .infoTitle {
    margin-bottom: 7px;
    font-size: 12px;
    color: #5d5d5d;
  }
  .infoDataDiv {
    margin-top: 10px;
  }
  .infoData {
    margin-bottom: 7px;
    font-size: 12px;
    color: #a3a3a3;
  }
  .auditLeave-top {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .name {
    font-weight: 700;
  }
  .time {
    display: inline-block;
    font-size: 12px;
    color: #409eff;
  }
  .summoney {
    font-size: 12px;
  }
}

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
.pageBtn {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}




// details------------------


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
}


/*轮播图样式*/
.swiper-container {
  /deep/ .swiper-button-prev, .swiper-button-next {
    -webkit-background-size: 10px 20px;
    background-size: 10px 20px;
  }

  .swiper-img-wrap {
    background: #333;
    text-align: center;
    padding: 20px 0;

    img {
      width: 423px;
      height: 300px;
    }
  }
}

.thumbs {
  background: #ebebeb;
  padding: 15px 100px 30px;

  .thumbs-item-wrap {
    width: 20%;
    height: 104px;
    box-sizing: border-box;
    padding: 0 5px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
    }
  }

  .active {
    img {
      border-color: #ff0;
    }
  }
}

.textDetail {
  margin-top: 20px;
  float: left;
  width: 100%;
  .titleText {
    margin-left: 6%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }
  .item {
    height: 100px;
    float: left;
    font-size: 14px;
    margin-bottom: 30px;
    width: 33.333%;
    border-left: 1px dashed #e1e1e1;
    .itemDetail {
      .itemTitle {
        height: 28px;
        float: left;
        width: 75px;
        margin-left: 25px;
        font-weight: 600;
      }
      .detail {
        float: left;
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
