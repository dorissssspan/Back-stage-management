<template>
    <div class="commmontags">
        <el-tag
               v-for="(tag,index) in tags"
               :key="tag.name"
               size="small"
               @close="TagClose(tag,index)"
               @click="Tagreplce(tag)"
               :effect = "$route.name === tag.name ? 'dark' : 'plain' "
               :closable="tag.name !== 'home'"
               :default-active="activerouter"
               :router="true"
        >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>

import { mapState,mapMutations } from "vuex";

export default {
  name: 'CommonTags',
  components: {},
  props: {},
  data () {
    return {
        activerouter:''
    }
  },
  computed: {
      ...mapState({
          tags: state => state.menu.tabsList
      })
  },
  watch: {},
  created () {
      this.activerouter = this.$route.url
  },
  mounted () {},
  methods: {
      ...mapMutations({
          close: 'closeTag'
      }),
      // 切换标签
      Tagreplce(tag){
          this.$router.push({ name: tag.name})
      },
      // 删除标签
      TagClose(tag,index){
         const length = this.tags.length - 1
          this.close(tag)
          // 关闭当前标签不等于选中路由标签，则不进行操作
          if(tag.name !== this.$route.name){
              return
          }
          // 关闭当前标签是选中的最右侧标签，则路由往左移动
          if(index === length){
              this.$router.push({ name: this.tags[index - 1].name})
          } else {
          // 路由向右跳转
              this.$router.push({name:this.tags[index].name})
          }
      }
  }
}
</script>

<style scoped lang="less">
    .commmontags{
        padding: 10px;
        .el-tag {
            margin-right:5px;
            cursor: pointer;
        }
    }
</style>
