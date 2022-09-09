<template>
  <div class="user-view">
    <el-card shadow="never" border="false">
      <!-- 弹窗模块 -->
      <div class="winForm" v-if="isShow">
        <el-dialog :title="operateType === 'add' ? '新增用户': '更新用户'" :visible.sync="isShow">
          <common-form :formLabel="typeFormLabel" :form="operateForm" :inline="true" ref="form"/>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 工具条 查询 -->
      <div class="header">
        <el-button type="primary" @click="addUser">+新增</el-button>
        <common-form :formLabel="formLabel" :form="formKey" :inline="true" ref="form">
          <el-button type="primary" @click="getList(formKey.keyword)">搜索</el-button>
        </common-form>
      </div>
      <!-- 用户列表 -->
      <user-table
              :userList="tableData"
              :userLabel="userLabel"
              :config="config"
              @changePage="changePage"
              @current-change="getList()"
              @edit="ediUser"
              @del="delUser"/>
    </el-card>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import UserTable from "@/views/User/UserTable";
import { getUserList,delUser,updateUser,createUser } from "../../util/data"

export default {
  name: 'UserView',
  components: {
    CommonForm,
    UserTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      // 弹窗标签和数据
      typeFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      // 搜索
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'input'
        }
      ],
      // 关键字
      formKey: {
        keyword: '',
      },
      // 列表标签和数据
      tableData: [],
      userLabel: [
        {prop: 'name', label: '用户名',},
        {prop: 'age', label: '年龄',},
        {prop: 'sexLabel', label: '性别',},
        {prop: 'birth', label: '用户类型', with: 200},
        {prop: 'addr', label: '地址', width: 320},
      ],
      // 分页
      config: {
        page: 1,
        total: 20
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        // 判断类型 调用api进行对应操作
        updateUser(this.operateForm).then(() => {
          this.getList()
        })
      } else {
        createUser(this.operateForm).then(() => {
          this.getList()
        })
      }
      this.isShow = false
  },
  // 添加用户
  addUser() {
    this.isShow = true
    this.operateType = 'add'
    this.operateForm = {
      name: '',
      addr: '',
      age: '',
      birth: '',
      sex: ''
    }
  },
  // 编辑用户
  ediUser(row) {
    this.isShow = true
    this.operateType = 'edit'
    // 数据回显
    this.operateForm = row
  },
  //  删除用户
  delUser(row) {
    this.$confirm('你确定要删除吗？', "提示", {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delUser({id: row.id}).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList();
      })
    })
    .catch(()=>{})
  },
  //  封装列表复用
  getList(name = '') {
    this.config.loading = true
    // 搜索功能：判断name存不存在，存在显示第一页
    name ? (this.config.page = 1) : ''
    // 接收data数据
    getUserList({page: this.config.page, name}).then((res) => {
      // res = 接口响应式  data:res es6结构赋值
      this.tableData = res.data.list.map(users => {
        users.sexLabel = users.sex === 0 ? '女' : '男'
        return users
      })
      // 分页数据
      this.config.total = res.data.count
      this.config.loading = false
    })
  },
  // 下一页
  changePage(page) {
    this.config.page = page;
    this.getList();
  }
}
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.winForm {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
