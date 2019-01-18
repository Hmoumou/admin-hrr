<template>
  <div class="sellercenter">
    <!--商户中心-->
    <div>
      <el-card class="box-card carditem clearfix order-item">
        <div slot="header" class="header">
          <span class="title">基本信息</span>
          <el-button
            v-if="iSsecond"
            style="float: right; padding: 3px 0;margin-top: 0px;"
            type="text"
            @click="toChange"
          >修改信息</el-button>
        </div>
      </el-card>
      <div class="second" v-if="iSsecond">
        <el-card class="box-card mesList">
           <div class="mesBoxs">
              <div class="leftText">酒店中文名称</div>
              <div class="rightText">{{formData.hotelName}}</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">酒店星级</div>
              <div class="rightText">{{formData.star}}星级酒店</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">酒店地址</div>
              <div class="rightText">{{formData.locating}}</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">附近商圈</div>
              <div class="rightText">{{formData.business}}</div>
           </div>
        </el-card>
        <el-card class="box-card mesList">
            <div class="mesBoxs">
              <div class="leftText">开业时间</div>
              <div class="rightText">{{formData.starttime}}</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">最新装修时间</div>
              <div class="rightText">{{formData.decorateTime}}</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">酒店房间总数</div>
              <div class="rightText">{{formData.roomNum}}</div>
           </div>
           <div class="mesBoxs">
              <div class="leftText">酒店总机</div>
              <div class="rightText">{{formData.hotelMobile}}</div>
           </div>
        </el-card>
        <el-card class="box-card mesList">
          <div class="mesBoxs">
            <div class="leftText">酒店介绍</div>
          </div>
          <div class="mesBoxs" style="height: auto;">
            <div class="rightText" style="text-indent: 2em" v-text="formData.introduce"></div>
          </div>
        </el-card>
      </div>
      <div class="first" v-if="!iSsecond">
        <el-card class="box-card mesList">
          <div class="mesBox">
            <div class="leftText">酒店中文名称</div>
            <div class="rightText">
              <el-input v-model="formData.hotelName" placeholder="请输入酒店中文名称"></el-input>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">酒店星级</div>
            <div class="rightText">
              <el-select v-model="formData.star" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">酒店地址</div>
            <div class="rightText">
              <el-input v-model="formData.locating" placeholder="请输入酒店酒店地址"></el-input>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">附近商圈</div>
            <div class="rightText">
              <el-input v-model="formData.business" placeholder="请输入附近商圈"></el-input>
            </div>
          </div>
        </el-card>
        <el-card class="box-card mesList">
          <div class="mesBox">
            <div class="leftText">开业时间</div>
            <div class="rightText">
              <div class="block">
                <el-date-picker
                  v-model="formData.starttime"
                  type="date"
                  placeholder="请选择 年 - 月 - 日 "
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">最新装修时间</div>
            <div class="rightText">
              <div class="block">
                <el-date-picker
                  v-model="formData.decorateTime"
                  type="date"
                  placeholder="请选择 年 - 月 - 日 "
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="mesBox">
            <div class="leftText">客房总数</div>
            <div class="rightText">
              <el-input v-model="formData.roomNum" placeholder="请输入客房总数"></el-input>
            </div>
          </div>
        </el-card>
        <el-card class="box-card mesList">
          <div class="mesBox">
            <div class="leftText">酒店总机</div>
            <div class="rightText">
              <el-input v-model="formData.hotelMobile" placeholder="请输入酒店总机"></el-input>
            </div>
          </div>
          <div class="mesBox" style="height: auto;width: 1200px">
            <div class="leftText">酒店介绍</div>
            <div class="rightText" style="width: 970px;margin-bottom: 20px;margin-top: 5px;">
              <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 50}"
                placeholder="请输入酒店介绍"
                v-model="formData.introduce"
              ></el-input>
            </div>
          </div>
        </el-card>
        <div class="submitBtn">
          <el-button type="primary" round size="medium " @click="handleOk">完 成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sellerCenter",
  data() {
    return {
      iSsecond: false,
      formData: {
        merchantid: this.$store.state.mchid, //商户id
        hotelName: "", //酒店名称',
        star: "", //酒店星级',
        locating: "", //酒店地址',
        business: "", //附近商圈',
        starttime: "", //开业时间',
        decorateTime: "", //最新装修时间',
        roomNum: "", //房间总数',
        hotelMobile: "", //酒店总机电话',
        introduce: "" //酒店介绍',
      },
      options: [
        {
          value: "5",
          label: "五星"
        },
        {
          value: "4",
          label: "四星"
        },
        {
          value: "3",
          label: "三星"
        },
        {
          value: "2",
          label: "二星"
        },
        {
          value: "1",
          label: "一星"
        }
      ],
    };
  },
  methods: {
    toChange() {
      this.$router.push({
        path:"/layout/sellerCenterChange",
        query: this.formData
      });
      // this.iSsecond = true
    },
    // 时间转化之后提交数据
    handleOk() {
      var d = new Date(this.formData.starttime);
      this.formData.starttime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      var d1 = new Date(this.formData.decorateTime);
      this.formData.decorateTime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      console.log(this.formData);
      this.$axios
        .post("/zftds/hotel/house/insertHotelInfo", this.formData)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("添加酒店基本信息成功");
            this.getData();
            this.iSsecond = true;
          } else {
            this.$message.error("添加酒店基本信息失败");
            this.formData = {
              merchantid: this.$store.state.mchid, //商户id
              hotelName: "", //酒店名称',
              star: "", //酒店星级',
              locating: "", //酒店地址',
              business: "", //附近商圈',
              starttime: "", //开业时间',
              decorateTime: "", //最新装修时间',
              roomNum: "", //房间总数',
              hotelMobile: "", //酒店总机电话',
              introduce: "" //酒店介绍',
            };
          }
        });
      // this.$router.push('/layout/sellerCenter')
    },
    handleCancel() {
      this.$router.push("/layout/sellerCenter");
    },
    getData() {
      this.$axios
        .post("/zftds/hotel/house/selectHotelInfo", {
          merchantid: this.$store.state.mchid
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.iSsecond = true
            this.formData = res.data;
          }
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped lang='scss'>
.active {
  border: 1px solid #9dccfa;
}
.title {
  padding-left: 6px;
  border-left: 3px solid #75b8fc;
}
.header {
  font-weight: 500;
  font-size: 16px;
}
.order-item {
  /deep/ .el-card__body {
    display: none;
  }
}

/**/
.mesList {
  padding: 0px 20px;
  margin-bottom: 10px;
  .mesBoxs {
    height: 50px;
    line-height: 50px;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    .leftText {
      font-weight: 600;
      font-size: 14px;
      width: 200px;
      float: left;
    }
    .rightText {
      width: 60%;
      display: inline-block;
    }
  }
}
.submitBtn {
  height: 150px;
  position: relative;
  .el-button {
    width: 200px;
    height: 50px;
    border-radius: 25px;
    position: absolute;
    right: 50px;
    top: 40%;
  }
}

.el-card__header,
.el-card {
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

/deep/ .el-input__inner {
  background: #f9fbff;
  border: none;
  padding-left: 30px;
}
.el-button--text {
  margin-top: 9px;
}
</style>
<style>
.el-main {
  text-align: left;
  line-height: 1;
}
.el-button {
  padding: 6px 20px;
  font-size: 14px;
}
.el-textarea__inner {
  width: 60%;
  background-color: #f9fbff;
}
</style>
