<template>
  <div class="mall">
    <!-- 弹窗 -->
    <div class="winForm" v-if="isShow">
      <el-dialog title="更新商品" :visible.sync="isShow">
        <common-form :formLabel="typeFormLabel" :form="operatemallForm" :inline="true" ref="form"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <user-table
            :userList="tableData"
            :userLabel="tableeLabel"
            :config="config"
            @edit="editGoods"
            @del="dellGoods"
            @current-change="getGoods()"
            @changePage="pageGoods"/>
  </div>
</template>

<script>
import {getMallList, delMall,editMall} from '@/util/data';
import UserTable from "@/views/User/UserTable";
import CommonForm from "@/components/CommonForm";

export default {
  name: 'MallView',
  components: {
    UserTable,
    CommonForm
  },
  props: {},
  data () {
    return {
      isShow: false,
      typeFormLabel: [
        {
          model: "name",
          label: "商品名称",
          type: 'input'
        },
        {
          model: "price",
          label: "商品价格"
          ,type: 'input'
        }
      ],
      operatemallForm: {
        name: '',
        price: ''
      },
      tableeLabel:[
        {prop: "name", label: "商品名称",width: 250},
        {prop: "price", label: "商品价格",width: 250},
        {prop: "count", label: "销售数量",width: 250},
        {prop: "total", label: "销售总金额",width: 250},
      ],
      tableData: [],
      config:{
        page:1,
        total:20
      }
    }
  },
  watch: {},
  created () {
    this.getGoods();
  },
  methods: {
    confirm() {
        editMall(this.operatemallForm).then(() => {
          this.getGoods()
        })
      this.isShow = false
    },
    // 获取列表
    getGoods(){
      this.config.loading = true
      getMallList({ page: this.config.page }).then((res) => {
        console.log(res)
        this.tableData = res.data.list
        this.config.total = res.data.count
        this.config.loading = false
      })
    },
    // 编辑
    editGoods(row){
      // this.$message.info("后台数据,无法编辑");
      this.isShow = true
      // 数据回显
      this.operatemallForm = row
    },
    // 翻页
    pageGoods(page){
      this.config.page = page;
      this.getGoods();
    },
    // 删除
    dellGoods(row){
      this.$confirm("此操作将永久删除数据", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delMall({id: row.id}).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getGoods();
        })
      }).catch(()=>{})
    }
  }
}
</script>

<style scoped lang="less">

</style>
