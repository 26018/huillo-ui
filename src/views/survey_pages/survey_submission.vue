<template>
    <el-scrollbar>
        <el-table :data="tableData" :show-overflow-tooltip="true" :highlight-current-row="true" @row-click="showDetail"
                  :stripe="false">
            <el-table-column prop="title" fixed label="收集标题" width="200"/>
            <el-table-column prop="status" sortable align="center" label="问卷状态" width="180"/>
            <el-table-column prop="submitTime" sortable align="center" label="提交日期" width="180"/>
            <el-table-column prop="endTime" sortable align="center" label="问卷截止日期" width="180"/>
            <el-table-column align="center" min-width="280">
                <template #header>
                    <el-input style="width: 230px;" v-model="search" clearable prefix-icon="Search"
                              placeholder='搜索提交'/>
                </template>
                <template #default="scope">
                    <div style="width: 100%;justify-content: center;display: flex;border: 0px solid red">
                        <el-button type="danger" size="small" @click="deleteSubmit(scope.row.id)">删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {submission_commitList, submission_delete} from "../../api/submission";
import {formatDate, navTo} from "../../api/util";
import {ElMessage} from "element-plus";

let tableData = ref([]);
let copyTable = ref()
let search = ref();

onMounted(() => {
    submission_commitList().then(res => {
        tableData.value = res.data.data
        copyTable.value = tableData.value;
        tableData.value.forEach(table => {
            // 格式化时间
            if (table.endTime == null) {
                table.endTime = formatDate(new Date());
            } else {
                table.endTime = formatDate(new Date(table.endTime))
            }
            if (table.submitTime == null) {
                table.submitTime = formatDate(new Date());
            } else {
                table.submitTime = formatDate(new Date(table.submitTime))
            }
            // 比较时间
            let endTime = Date.parse(table.endTime);
            let now = Date.now();
            if (endTime > now) {
                table.status = "进行中";
            } else {
                table.status = "已截止";
            }
        })
    })
})


watch(search, (o, n) => {
    if (o == null || o.length === 0) {
        tableData.value = copyTable.value;
    }
    let searchResult = [];
    copyTable.value.forEach(t => {
        if (JSON.stringify(t).includes(o)) {
            searchResult.push(t);
        }
    })
    tableData.value = searchResult;
});

const showDetail = (row, column, event) => {
    // TODO 拿到data的id
    if (column.label === '' || column.label === undefined) {
        return;
    }
    navTo('/management/submissions/' + row.id)
}

const deleteSubmit = (id) => {
    submission_delete(id).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("删除成功");
            window.location.reload();
        } else {
            ElMessage.error("删除失败");
        }

    })
}

</script>

<style scoped>
:deep(.el-table__row) {
    cursor: pointer;
}
</style>