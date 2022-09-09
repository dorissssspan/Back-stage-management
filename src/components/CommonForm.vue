<template>
    <div class="common-form">
    <el-form ref="formData" label-width="100px" :model="formData" :inline="inline">
        <el-form-item v-for="item in titleLabel" :key="item.label" :label="item.label">
            <el-input
                    v-if="item.type === 'input'"
                    :placeholder="'请输入'+ item.label"
                    v-model="formData[item.model]"
            />
            <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]"/>
            <el-date-picker v-if="item.type === 'date'"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="formData[item.model]"
            />
            <el-select v-if="item.type === 'select'"
                       placeholder="请选择"
                       v-model="formData[item.model]">
                <el-option
                        v-for="item in item.opts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: 'CommmonForm',
  components: {},
  props: {
      formLabel: Array, // 标签数据
      form: Object,   // 表单数据
      inline: Boolean   // 表单样式 false:一行一个item true:flex布局
  },
  data () {
    return {
        formData: this.form,
        titleLabel: this.formLabel
    }
  },
  computed: {},
  watch: {
      formData:{
          // 深度监视，对象内部的属性
          deep: true
      }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>
