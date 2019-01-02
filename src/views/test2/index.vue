<template>
    <div class="box">
        <el-card class="box-card carditem clearfix order-item">
        <div  class="header clearfix">
          <el-button style="float: right; padding: 3px 0" type="text">更多搜索选项
            <i class="iconfont icon-arw-top-copy" v-if="!moreSearch"></i>
            <i class="iconfont icon-arrow-up" v-if="moreSearch"></i>
          </el-button>
           <div class="seachBox  clearfix">
                <div class="seek-box">
                    <input type="text" v-model="boxData.username" placeholder="订单号/预定人/预订人手机号">
                    <div class="seek" @click="handleSearch">搜索</div>
                </div>
           </div>
          <span  class="title  mt10 fll">订单筛选</span>
          <!-- <div class="searchBox" :model="searchData">
            <i class="iconfont icon-sousuo"></i>
            <el-input v-model="searchData.text" placeholder="订单号/预订人/预订人手机号" class="input"></el-input>
            <el-button type="primary" class="btn" @click="">搜索</el-button>
          </div> -->
        </div>
        <div class="dialog" v-if='moreSearch'>
           <el-form>
                <el-form-item label="按房型选择">
                    <el-select v-model="typeSearch" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按时间选择" class="clearfix">
                    <el-button type="primary" class="flr">
                        查询
                    </el-button>
                   <el-date-picker
                    v-model="dateSearch"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                    
                </el-form-item>

           </el-form>
        </div>
      </el-card>


    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
