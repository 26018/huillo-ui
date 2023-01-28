<template>
    <el-scrollbar>
        <el-table :data="tableData" :height="'95vh'"
                  :highlight-current-row="true" @row-click="showDetail"
                  :stripe="false">
            <el-table-column prop="title" label="收集标题" width="180"/>
            <el-table-column prop="status" sortable label="状态" width="180"/>
            <el-table-column prop="submitTime" sortable label="提交日期" width="180"/>
            <el-table-column prop="endTime" sortable label="截止日期" width="180"/>
            <el-table-column width="260" align="center">
                <template #header>
                    <el-input v-model="search" clearable prefix-icon="Search" placeholder='搜索提交'/>
                </template>
                <template #default="scope">
                    <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {submission_commitList} from "../api/submission";
import {formatDate} from "../hooks/util";

let tableData = ref([]);

onMounted(() => {
    submission_commitList().then(res => {
        tableData.value = res.data.data
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

const showDetail = (row, column, event) => {
    // TODO 拿到data的id
    if (column.label === '' || column.label == undefined) {
        return;
    }
    // navTo('collections/detail/1')
}

let search = ref("");
let keepAliveValue = tableData.data;

// 检测输入值变化
watch(search, (value, oldValue, onCleanup) => {
    tableData.data = keepAliveValue;
    if (value === '') {
        return;
    }
    let newTable = [];
    tableData.data.forEach(v => {
        let s = JSON.stringify(v);
        if (s.includes(value)) {
            newTable.push(v);
        }
    })
    tableData.data = newTable;
});


</script>

<style scoped>
:deep(.el-table__row) {
    cursor: pointer;
}
</style>