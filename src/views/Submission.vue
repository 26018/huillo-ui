<template>
    <el-scrollbar>
        <el-table :data="tableData.data" :height="'95vh'"
                  :highlight-current-row="true" @row-click="showDetail"
                  :stripe="false">
            <el-table-column prop="name" label="收集标题" width="180"/>
            <el-table-column prop="address" sortable label="状态" width="180"/>
            <el-table-column prop="name" label="提交次数" width="180"/>
            <el-table-column prop="date" label="截止日期" width="180"/>
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
import {reactive, ref, watch} from "vue";

let tableData = reactive({
    data: [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: '进行中',
        }
    ]
})
for (let i = 1; i < 10; i++) {
    let data = tableData.data[0];
    let copyData = JSON.parse(JSON.stringify(data));
    copyData.name = data.name + ":" + i;
    copyData.address = i % 2 == 0 ? "已结束" : "进行中";
    copyData.date = data.date + ":" + i;
    tableData.data.push(copyData);
}
const handleDelete = (index, row) => {
    console.log(index, row)
}
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

</style>