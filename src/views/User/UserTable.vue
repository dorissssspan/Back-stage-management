<template>
    <div class="common-table">
        <el-table :data="articleList" border style="width: 100%">
            <el-table-column prop="stem" label="姓名"> </el-table-column>
            <el-table-column prop="creator" label="年龄"> </el-table-column>
            <el-table-column prop="likeCount" label="性别"> </el-table-column>
            <el-table-column prop="views" label="出生日期"> </el-table-column>
            <el-table-column prop="createdAt" label="地址"> </el-table-column>
            <!--操作模块-->
            <el-table-column label="操作" width="120px">
                <template #default="{ row }">
                    <div class="actions">
                        <!-- 编辑-->
                        <i class="el-icon-edit-outline" @click="editArticle(row.id)"></i>
                        <!-- 删除-->
                        <i class="el-icon-delete" @click="delArticle(row.id)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 下一页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="onPageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Table"
    }
</script>

<style scoped>

</style>
