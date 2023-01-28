<template>
    <el-scrollbar>
        <div style="display: flex;align-items: center;">
            <el-icon style="cursor: pointer;" :size="24" @click="navTo(-1)"><ArrowLeft/></el-icon>
            <div style="font-size: 24px;margin-left: 8px">{{quesTitle}}</div>
            <div style="margin-left: auto;background-color: white;padding: 8px;border-radius: 8px;">
                <el-button type="" @click><el-icon><Share/></el-icon>&nbsp;分享</el-button>
                <el-button type="warning" @click><el-icon><Share/></el-icon>&nbsp;导出</el-button>
                <el-button type="primary" @click><el-icon><Edit/></el-icon>&nbsp;编辑</el-button>
                <el-button type="danger" @click><el-icon><Delete/></el-icon>&nbsp;删除</el-button>
                <el-button type="info" @click><el-icon><CloseBold/></el-icon>&nbsp;结束</el-button>
            </div>
        </div>
        <el-card style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>提交人数：{{ tableData.length }}</div>
                <div>创建时间：{{ quesStartTime }}</div>
                <div>截止时间：{{ quesEndTime }}</div>
                <div>收集用时：8天5小时</div>
            </div>
        </el-card>
        <el-card style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>收集到 {{ quesFilesCount }} 份文件</div>
                <el-button type="primary">全部下载</el-button>
            </div>
        </el-card>
        <el-card style="margin-top: 8px">
            <el-table style="width: 100%" height="460" :data="tableData"
                      :highlight-current-row="true" :stripe="true">
                <el-table-column prop="username" fixed label="提交人" width="180"/>
                <el-table-column prop="commitCount" label="提交次数" width="180"/>
                <el-table-column prop="commitTime" label="提交日期" width="180"/>
                <el-table-column align="right">
                    <template #header>
                        <el-button @click="notifyNoSubmit" style="width: 170px" type="warning">通知未提交</el-button>
                    </template>
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="CommittedDetail(1)">查看</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">回绝</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-scrollbar>
</template>

<script setup>
import {formatDate, navTo} from "../hooks/util";
import {questionnaire_detail} from "../api/questionnaire";
import {onMounted,  ref} from "vue";

let props = defineProps(['id']);
let tableData = ref([]);
let quesStartTime = ref("");
let quesEndTime = ref("");
let quesFilesCount = ref("");
let quesTitle = ref("");
onMounted(() => {
    questionnaire_detail(props.id).then(res => {
        console.log(res.data.data)
        let {endTime,title, startTime, filesCount, submitterDetailList} = res.data.data;
        quesTitle.value = title;
        quesFilesCount.value = filesCount;
        tableData.value = submitterDetailList;
        quesStartTime.value = formatDate(new Date(startTime));
        quesEndTime.value = formatDate(new Date(endTime));
    });
});

const CommittedDetail = (id) => {
    navTo('/manager/collections/committed/detail/' + id)
};

const handleEdit = (index, row) => {
    console.log(index, row)
}
const handleDelete = (index, row) => {
    console.log(index, row)
}

const notifyNoSubmit = () => {
    // 通知提醒未提交的人
};

</script>

<style scoped>

</style>