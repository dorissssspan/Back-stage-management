<template>
  <header>
    <div class="i-content">
      <!-- 控制左侧路由扩展 -->
      <el-button plain
                 :icon="$store.state.isCollapse === true ? 'el-icon-caret-right':'el-icon-caret-left'"
                 size="mini"
                 @click="AsideShow"/>
    </div>
    <div class="right">
      <!--<el-button class="header-btn" type="primary" @click="screenfullToggle">
        全屏
      </el-button>-->
      <span class="header-btn"
            @click="screenfullToggle"
            title="全屏模式">
          <i class="el-icon-rank"></i>
        </span>
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="userImage">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Screenfull from 'screenfull'

export default {
  name: 'CommonHeader',
  props: {},
  data () {
    return {
      userImg: require('../assets/images/user2.png'),
      isFullscreen: false
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tabsList
    })
  },
  methods: {
    AsideShow () {
      this.$store.commit('CollapseMenu')
    },
    loginOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      //清除tag

      this.$router.replace('/login' )
    },
    // 全屏
    screenfullToggle () {
      if (!Screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持全屏!',
          type: 'warning'
        })
        return false
      }
      Screenfull.toggle()
    }
  },
  watch:{}
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .i-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .right{
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
  .el-dropdown{
    display: flex;
    align-items: center;
  }
  .header-btn {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    .el-icon-rank{
      font-size: 20px;
    }
  }
  .userImage {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
}
</style>
