<template>
  <div class="box">
      <!-- 后加房价日历start -->
      <div class="main-wrap">
        <div class="house-title">
          <div class="center-wrap">
              七日化房间管理
          </div>
        </div>
        <table class="main-table">
          <tbody>
            <tr class="first-row">
              <td class="cell-spe">
                <div class="date-text">日期</div>
                <div class="housetype-text">房型</div>
                <!-- <i class="line"></i> -->
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
              <td 
                  v-for="(it,index) in item.arr"
                  @click="handleClick(it, index)"
                  :class="getClass(it)"
                  class="item-num"
                  :key='index'> <!--房态日历单元格-->
                <span class="item-num-inner" v-if="it.isPre" >
                    {{it.roomsnum==0?'满': it.roomsnum}}
                </span>
                <div v-else class="fs12 disable">
                  <div>
                    暂不
                  </div>
                  <div>
                    可订
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
  </div>
</template>

<script>
  import {DatePicker} from 'iview'
  import bigBox from '@/components/bigBox.vue'
  import moment from 'moment'

  export default {
    name: '',
    components: {
      DatePicker,
      bigBox
    },
    data() {
      return {
        row: "", // 房态日历点击第几行
        col: "", // 房态日历点击第几列
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
          activityprice:'',
          id:'1'
        }
      }
    },
    methods: {
        getPrice(){
        let url = '/zftds/hotel/house/selectHotelCalendar';
        return new Promise((resolve, reject) => {
          this.$axios.post(url,
            {merchantid:this.$store.state.mchid })
            .then(res=>{
              resolve(res.data)
              // console.log('rereresrers',res);
            }).catch(err => {
              reject(err)
          })
        })
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
      handleClick(item, index) {
          // 单元格点击事件===房态点击
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
        // console.log(this.youHaveIndex)
        // console.log(this.youHaveIndex1)
        this.EditPriceData.price = item.price
        this.EditPriceData.hotelid = item.id
        this.EditPriceData.ytd = item.date.formatStr
        this.col1 = item.col;
        this.row1 = item.row
      },
      getDate () {
        let unix = this.currentDate.getTime();
        let minDate = new Date(unix); // 重新生成新的日期对象，避免相互影响

        this.dateData.weekDate = [];
        for(let i = 0; i < 7; i++){ // 获得15天的号数和星期几
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
        // const loading = this.$loading({
        //   lock: true,
        //   text: '正在读取数据',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        this.getDate(); // 每次去请求新的数据的时候，去更换当前的时间对象。生成新的7天日期数据。保证下方date对象是最新的。
        this.$axios.post('/zftds/hotel/house/selectHotelHouseS',{merchantid:this.$store.state.mchid}).then(res=>{
        //   loading.close();
          if(res.code == 1){
            this.houseType = res.data;
            console.log(this.houseType);
            this.getPrice().then(priceArr => {
              // 1. 先截取7天的有效数据
              let filterArr = priceArr.filter(item => {
                // console.log('你要的item',item.id);
                let itemDateStr = moment(item.addtime).format("YYYY-MM-DD"); // 生成 2018-12-02这样的时间字符串
                let nowDateStr = moment(this.currentDate).format("YYYY-MM-DD"); // 注释同上
                let itemParseUnix = Date.parse(itemDateStr); // 生成以日为标准的unix时间戳既不考虑时分秒毫秒
                let nowParseUnix = Date.parse(nowDateStr);
                let reduceDays = itemParseUnix - nowParseUnix; // unix相减做比较
                let iDays = reduceDays / (24*3600*1000);
                if(iDays>=0&&iDays<7) { // 如果在7天内，就保留，如果不在，就删除
                  return 1 // 真值
                } else {
                  return 0 // 代替false来用，转换为false
                }
              });
              // 2. 数组去重操作。保留最新的操作项。思路: mysql数据库id自增，可以考虑id作为最新修改的依据。去重
              /*
              情况1：有重复项
              ①hotelid决定表格行
              ②ytd相同(决定这一行的哪一列)
              ③上述两个同样的情况下，即为操作的同一天的数据，这是对比id的大小即可得到最新的数据
              情况2： 没有重复项
              直接推入新数组
              * */
              let secondFilter = [];
              filterArr.forEach((i, idx, filArr) => {
                console.log('i',i)
                let resultItem = secondFilter.find(item => { // 查找二次过滤的数组里，同行同列的项目
                  return i.hotelid == item.hotelid && i.ytd == item.ytd;
                });
                if(!resultItem) { // 如果没有找到，则没有重复项，直接推入
                  secondFilter.push(i);
                } else { // 找到有重复的项目，则取id最大的（最新的修改）
                  if(i.id > resultItem.id) { // 后边的比前边推进去的要大，则替换
                    let index = secondFilter.findIndex(item => item.id == resultItem.id); // 找到重复项的索引
                    secondFilter.splice(index, 1, i); // 将最大的那项替换掉
                  }
                }
              });

              this.houseData2.houseType = res.data.map((item, row) => {
                let arr = [];
                for(let i=0; i < 7; i++) {
                  let activeItem = secondFilter.find(it => this.dateData.weekDate[i].formatStr == it.ytd && item.id == it.hotelid);
                  // 每次生成项目的时候，去二次过滤的数组里查找，同行同列的项目。因为没有重复的，找到的就是有效值。
                  let activityprice = activeItem && activeItem.activityprice? activeItem.activityprice: "";
                  // 如果找到了，就返回，找不到给空的字符串让上方渲染的值可以通过或运算符运算
                  arr.push({
                    activityprice,//活动价格
                    price: item.price, // 价格
                    roomsnum: item.roomsnum, // 房间数
                    id: item.id, // 房型分类id
                    isPre: true, // 是否可以预定变量
                    date: this.dateData.weekDate[i],
                    row, // 第几行的数据
                    col: i,
                    formatStr: this.dateData.weekDate[i].formatStr
                  })
                }
                return {
                  arr,
                  ...item
                }
              })

            })
          }
        })
      }
    },
    created(){
      this.getHouseType()
      // this.getPrice()
    },
    watch:{
      formatTime(val){
        console.log(val);
      }
    }
  }
</script>
<style lang="scss" scoped>
 @import './index.scss';
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
    .main-table td{
        padding: 0;
        height: 48px;

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
    // .el-dialog__body {
    //   height: 110px;
    // }
    //   .el-dialog__footer {
    //     height: 90px;
    //   }
    .el-icon-close {
      display: none;
    }
  }

</style>
