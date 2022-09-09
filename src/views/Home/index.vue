<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户信息 -->
      <el-card class="box-card">
        <div class="user">
          <img :src="userImg"/>
          <div class="userinfo">
            <p class="name">{{ username }}</p>
            <p class="access">{{ authority }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-3-23</span></p>
          <p>上次登录地点：<span>珠海</span></p>
        </div>
      </el-card>
      <!-- 购买信息 -->
      <el-card style="margin-top: 20px; height: 400px">
        <el-table :data="tableData">
          <el-table-column v-for="(val,index) in tableLabel" :key="index" :prop="index" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top:20px" :span="16">
      <!-- 订单 -->
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表 -->
      <echart/>
    </el-col>
  </el-row>
</template>

<script>
import { getTableData } from '@/util/data'
import Echart from '@/components/CommonEcharts.vue'

export default {
  name: 'HomeView',
  components: {
    Echart
  },
  data () {
    return {
      userImg: require('@/assets/images/user2.png'),
      tableData: [],
      tableLabel: {
        name: '手机',
        todayBuy: '日购买',
        monthBuy: '月购买',
        totalBuy: '总购买'
      },
      countData: []
    }
  },
  created() {
    getTableData().then((res) => {
      const data = res.data;
      this.tableData = data.tableData;
      this.countData = data.countData;
    });
  },
  computed: {
    username() {
      return this.$store.state.username || "Root";
    },
    authority() {
      return this.$store.state.authority || "管理员";
    },
  },
};
</script>

<style lang="less" scoped>
  .home {
    .user {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      &info {
        .name {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .access {
          color: #999999;
        }
      }
    }
    .login-info {
      p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span {
          color: #666666;
          margin-left: 60px;
        }
      }
    }
    .num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card {
        width: 32%;
        margin-bottom: 20px;
      }
      .icon {
        font-size: 30px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          color: #999999;
        }
      }
    }

  }
</style>
