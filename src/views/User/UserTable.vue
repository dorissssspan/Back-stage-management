<template>
    <div class="users-table">
        <el-table :data="userList" stripe style="width: 100%">
            <!-- 渲染数据列 -->
            <el-table-column
                    show-overflow-tooltip
                    v-for="(item, index) of tableList"
                    :key="index"
                    :label="item.label"
                    :width="item.width ? item.width : 200"
                    :prop="item.prop">
            </el-table-column>
            <!--操作模块-->
            <el-table-column label="操作" min-width="120px">
                <template slot-scope="scope">
                    <div class="actions">
                        <!-- 编辑-->
                        <i class="el-icon-edit-outline" @click="editOps(scope.row)"></i>
                        <!-- 删除-->
                        <i class="el-icon-delete" @click="delOps(scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 下一页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="configList.total"
                :current-page.sync="configList.page"
                @current-change="onPageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "UserTable",
        props:{
            userList: Array,    // 数据
            userLabel: Array,  // 标题
            config: Object
        },
        data (){
            return {
                configList: this.config,
                tableList: this.userLabel
            }
        },
        methods:{
            editOps(row){
                // 拿到当前数据传给父组件
                this.$emit('edit',row)
            },
            delOps(row){
                this.$emit('del',row)
            },
            onPageChange(page){
                this.$emit('changePage',page)
            }
        }
    }
</script>

<style scoped lang="less">
.users-table{
    height: calc(100vh - 62px);
    width: 100%;
    background-color: white;
    .el-pagination{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .actions{
        display: flex;
        justify-content: space-around;
        font-size: 20px;
        cursor: pointer;
        >:hover{
            color: rgb(64 158 255);
        }
    }
}
</style>
