<template>
  <div class="box">
    <el-card class="min-card">
      <!-- 后加房价日历start -->
      <div slot="header" class="header clearfix">
        <div class="switchover flr">
          <span class="switch-title" :class="{avtiveBlue:activeIndex == 1}" @click="activeIndex = 1">房态日历</span>
          <span> | </span>
          <span class="switch-title" :class="{avtiveBlue:activeIndex == 0}" @click="activeIndex = 0">价格日历</span>
        </div>
        <span class="title">{{activeIndex == 1?"房态日历":"价格日历"}}</span>

      </div>
      <div class="main-wrap" >
        <div class="house-title" >
          <div class="center-wrap" >
            <span class="btn-default btn-left" @click="handleClickNext(-15)" :class="{active: btnLeftActive}">
              <i class="el-icon-arrow-left icon-btn"></i>
              前15天
            </span>
            <span class="btn-default btn-right active" @click="handleClickNext(15)">
              后15天
              <i class="el-icon-arrow-right icon-btn"></i>
            </span>
            <date-picker
              class="dy-datepicker"
              type="date"
              v-model="currentDate"
              :options="pickerOptions"
              @on-change="pickerChange"
              placeholder="请选择想查看的日期" />
          </div>
        </div>
        <table class="main-table">
          <tbody>
            <tr class="first-row">
              <td class="cell-spe">
                <div class="date-text">日期</div>
                <div class="housetype-text">房型</div>
                <!--<i class="line"></i>-->
              </td>
              <td v-for="(item, index) in dateData.weekDate" :key='index' class="cell-item">
                <div class="cell-top">
                  {{item.num}}
                </div>
                <div class="cell-bottom">
                  {{item.day}}
                </div>
              </td>
            </tr>
            <tr class="row" v-for="(item,idx) in houseData2.houseType"   :key='idx'>
              <td class="row-title" >
                {{item.houseinfo}}
                <!--接口真实数据-->
              </td>
              <td v-if="activeIndex == 1"
                  v-for="(it,index) in item.arr"
                  @click="handleClick(it, index)"
                  :class="getClass(it)"
                  class="item-num"
                  :key='index'>
                <span class="item-num-inner" v-if="it.isPre" >
                    {{it.roomsnum==0?'满': it.roomsnum}}
                </span>
                <div v-else>
                  <div>
                    暂不
                  </div>
                  <div>
                    可订
                  </div>
                </div>
              </td>
              <td v-for="(ite,index) in item.arr"
                  :key="index"
                  v-if="activeIndex == 0"
                  @click="handleClickPrice(ite, index)"
                  class="item-num">
                <div class="item-price" v-if="activeIndex == 0&&!ite.activityprice">
                  {{ite.price}}
                </div>
                <div class="item-price" v-if="activeIndex == 0&&ite.activityprice">
                  {{ite.activityprice}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>

    <el-dialog
      :visible.sync="isShowDialog"
      width="30%"
      center>
      <div class="contents" v-if="isShowDialog">
        <p class="mb5 fw">
          <span>{{houseData2.houseType[row].arr[col].date.formatStr}}</span>
          <span>{{houseData2.houseType[row].houseinfo}}</span>
        </p>
        <p class="clearfix">
          <el-switch
            class="flr mt5"
            v-model="houseData2.houseType[row].arr[col].isPre"
            active-text="开启"
            inactive-text="关闭">
          </el-switch>
          <span class="fll">房间网订渠道</span>
        </p>
      </div>
      <div slot="footer" class="dialog-footer clearfix">
        <div class="btns fs14 flr" @click="isShowDialog = false">确 定</div>
        <div class="leftGoBack fll clearfix">
          <div class="imgleft mr15 fll" @click="isShowDialog = false">
          </div>
          <span class="blue mt15 fll" @click="isShowDialog = false">返 回</span>
        </div>
      </div>
    </el-dialog>

    <!--第二个弹框-->
    <el-dialog
      :visible.sync="isShowDialog1"
      width="30%"
      center>
      <div class="contents" v-if="isShowDialog1">
        <div>
          <p class="mb5 fw">
            <span>{{houseData2.houseType[row1].arr[col1].date.formatStr}}</span>
            <span>{{houseData2.houseType[row1].houseinfo}}</span>
          </p>
        </div>
        <el-form label-width="80px" label-position="left">
          <el-form-item label="当日价格">
            <el-input
              v-model="houseData2.houseType[row1].arr[col1].activityprice"
              placeholder="请输入当天的价格" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer clearfix">
        <div class="btns fs14 flr" @click="handleEditPrice()">确 定</div>
        <div class="leftGoBack fll clearfix">
          <div class="imgleft mr15 fll" @click="isShowDialog1 = false">
          </div>
          <span class="blue mt15 fll" @click="isShowDialog1 = false">返 回</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {DatePicker} from 'iview'
  import bigBox from '@/components/bigBox.vue'

  export default {
    name: '',
    components: {
      DatePicker,
      bigBox
    },
    data() {
      return {
        youHaveIndex:'',//修改价格需要的row
        youHaveIndex1:'',//修改价格需要的col
        row: "", // 房态日历点击第几行
        col: "", // 房态日历点击第几列
        row1: "", // 价格日历点击第几行
        col1: "", // 价格日历点击第几列
        activeIndex:1,
        pickerOptions: { // 日期选择器选项
          disabledDate (date) { // 禁用的日期 返回真值禁用
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        isShowDialog: false, // 是否显示弹框
        isShowDialog1:false,//是否显示弹框二
        btnLeftActive: false, // 前十五天是否可以点击
        currentDate: new Date(), // 当前选择的日期
        date: new Date(), // 今天的日期
        dateData: {
          formatTime: '', // 格式化好的日期
          startMonth: '', // 当前月份
          endMonth: '',  // 结束月份
          weekDate: [] // 十五天的数组
        },
        houseData: {},
        houseData2: { // 用于测试功能的， 后端未给数据
          houseType: [] // 存放后端给的数据以及自己生成的数组
        },
        week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        EditPriceData:{
          merchantid:this.$store.state.mchid,
          price:'',
          hotelid:'',
          ytd:'',
          activityprice:''
        }
      }
    },
    methods: {
      // 修改价格
      // 
      handleEditPrice(){
        console.log(this.houseData2.houseType[this.youHaveIndex].arr[this.youHaveIndex1].activityprice)
        this.EditPriceData.activityprice = this.houseData2.houseType[this.youHaveIndex].arr[this.youHaveIndex1].activityprice
        console.log(this.EditPriceData);
        this.$axios.post('/zftds/hotel/house/insertHotelCalendar',this.EditPriceData).then(res=>{
          console.log(res)
          if(res.code == 1){
            this.$message.success('添加价格成功')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      getPrice(){
        // this.$axios.post('/zftds/hotel/house/selectHotelCalendar',{merchantid:'88888'}).then(res=>{
        //   console.log(res);
        // })
        //  this.$axios.post('/zftds/hotel/house/selectHotelHouseS',{merchantid:this.$store.state.mchid}).then(res=>{
        //   console.log(res);
        // })
      },
      getClass(item) {
        if(item.isPre) { // 是否可以预定
          if(item.roomsnum>0) {  // 没有满
          } else { // 房间已满
            return {
              full: true
            }
          }
        } else {  // 暂不可订
          return {
            disabled: true
          }
        }
      },
      pickerChange (date) {
        console.log(date);
        let newDate = new Date(date);
        this.currentDate = newDate;
        this.getHouseType();
        this.toggleClass(newDate.getTime())
        /*用户选择日期的逻辑在这里写*/
        /*用户选择日期的逻辑在这里写*/
        /*用户选择日期的逻辑在这里写*/
        /*用户选择日期的逻辑在这里写*/
      },
      toggleClass (newDate) { // 切换按钮点击
        if (newDate - this.date.getTime() >= 15 * 86400000) { // 大于15天
          this.btnLeftActive = true
        } else {
          this.btnLeftActive = false
        }
      },
      handleClickNext (num) {
        let newFun = function changeDate() {
          let oldDate = this.currentDate.getDate();        // 获得当前的天数
          this.currentDate.setDate(oldDate + num); // 获得15天后的天数
          let unix = this.currentDate.getTime();
          this.currentDate = new Date(unix); // 重新生成新的date对象，触发iview更新
          this.toggleClass(unix);   // 根据新的时间计算左右按钮的样式
          this.getHouseType(); // 重新获取新的数据
        }.bind(this); // 绑定vue this值

        if(num<0){ // 点击左边的按钮
          if(this.btnLeftActive) {
            newFun()
          }
        } else { // 点击右边的按钮
          newFun()
        }
        /*用户点击后十五天的逻辑在这里写*/
        /*用户点击后十五天的逻辑在这里写*/
      },
      handleClick(item, index) { // 单元格点击事件===房态点击
        // console.log("item",item);
        // console.log("item",index);
        this.col = item.col;
        this.row = item.row;
        this.isShowDialog = true;
        //   // 单元格点击事件在这里写
        //   // 单元格点击事件在这里写
      },
      handleClickPrice(item, index) {
        console.log("item",item);
        console.log("index",index);
        this.youHaveIndex = item.row
        this.youHaveIndex1 = item.col
        console.log(this.youHaveIndex)
        console.log(this.youHaveIndex1)
        this.EditPriceData.price = item.price
        this.EditPriceData.hotelid = item.id
        this.EditPriceData.ytd = item.date.formatStr
        this.col1 = item.col;
        this.row1 = item.row;
        this.isShowDialog1 = true;
      },
      getDate () {
        let unix = this.currentDate.getTime();
        let minDate = new Date(unix); // 重新生成新的日期对象，避免相互影响

        this.dateData.weekDate = [];
        for(let i = 0; i < 15; i++){ // 获得15天的号数和星期几
          this.dateData.weekDate.push({
            day: this.week[minDate.getDay()], // 得到星期几
            num: minDate.getDate(), // 得到第几号
            month: minDate.getMonth() + 1, // 得到星期几
            unix: minDate.getTime(), // 得到Unix时间戳
            year: minDate.getFullYear(), // 得到今天是哪一年
            formatStr: `${minDate.getFullYear()}-${minDate.getMonth() + 1}-${minDate.getDate()}`,
          });
          minDate.setDate(minDate.getDate() + 1) // 递增操作
        }
      },
      getHouseType(){
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.getDate(); // 每次去请求新的数据的时候，去更换当前的时间对象。生成新的15天日期数据。保证下方date对象是最新的。
        this.$axios.post('/zftds/hotel/house/selectHotelHouseS',{merchantid:this.$store.state.mchid}).then(res=>{
          loading.close()
          if(res.code == 1){
            console.log(res)
            // 把大数组转成对象
            this.houseType = res.data;
            console.log(this.houseType);
            this.houseData2.houseType = res.data.map((item, row) => {
              let arr = [];
              for(let i=0; i < 15; i++) {
                arr.push({
                  activityprice:'',//活动价格
                  price: item.price, // 价格
                  roomsnum: item.roomsnum, // 房间数
                  id: item.id, // id
                  isPre: true, // 是否可以预定变量
                  date: this.dateData.weekDate[i],
                  row, // 第几行的数据
                  col: i,
                  formatStr: this.dateData.weekDate[i]
                })
              }
              return {
                arr,
                ...item
              }
            })
          }
        })
      }
    },
    created(){
      this.getHouseType()
    },
    watch:{
      formatTime(val){
        console.log(val);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btns {
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    margin: 0 auto;
    color: #fff;
    width: 40%;
    height: 54px;
    line-height: 40px;
    border-radius: 20px;
    font-weight: 500;
    text-align: center;
    background: url('../../image/home/btn2.png') no-repeat;
    background-size: 100% 100%;
  }

  .contents {
    // height: 100px;
    margin-top: 20px;
    padding: 0 30px 0px 30px;
    font-weight: 500;
    line-height: 2;
    color: #333;
  }

  .leftGoBack {
    width: 90px;
    height: 50px;
    .imgleft {
      cursor: pointer;
      display: inline-block;
      width: 50px;
      height: 50px;
      background: url('../../image/home/leftArrow.png') no-repeat;
      background-size: 100% 100%;
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

  .mr20 {
    margin-right: 20px;
  }

  .mt5 {
    margin-top: 5px;
  }

  .mt15 {
    margin-top: 15px;
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .lh50 {
    line-height: 50px;
  }
</style>
<style scoped lang='scss'>
  @import './index.scss';
</style>
<style lang='scss'>
  .el-card {
    margin-bottom: 10px;
  }

  .el-dialog--center {
    //   color: #2b2b2b;
    //   margin-top: 30vh !important;
    background: url('../../image/bigbox.png') no-repeat center;
    background-size: 100% 101.5%;
    background-position: 0 -5px;
    .el-dialog__body {
      height: 110px;
    }
    //   .el-dialog__footer {
    //     height: 90px;
    //   }
    .el-icon-close {
      display: none;
    }
  }

</style>
