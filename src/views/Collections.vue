<template>
    <el-scrollbar>
        <el-table :data="tableData" :show-overflow-tooltip="true" :highlight-current-row="true" @row-click="showDetail" :stripe="false">
            <el-table-column fixed prop="title" label="收集标题" width="180"/>
            <el-table-column prop="status" sortable align="center" label="状态" width="180"/>
            <el-table-column prop="commitCount" sortable align="center" label="提交次数" width="180"/>
            <el-table-column prop="endTime" sortable align="center" label="截止日期" width="180"/>
            <el-table-column align="center">
                <template #header>
                    <el-input v-model="search" style="width: 230px" clearable prefix-icon="Search" placeholder='搜索问卷'/>
                </template>
                <template #default="scope">
                    <div style="display: flex;width: 100%;justify-content: center;z-index: 9999">
                        <el-button type="success" size="small" @click="share(scope.row,shareView)">分享</el-button>
                        <el-button type="primary" size="small" @click="analysis(scope.row)">分析</el-button>
                        <el-button type="warning" size="small" @click="()=>{currentOperateData.value = scope.row,ViewOpen(closeView)}">结束</el-button>
                        <el-button type="danger" size="small" @click="()=>{currentOperateData.value = scope.row,ViewOpen(deleteView)}">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--弹窗-->
        <!--分享问卷-->
        <jh-dialog title="分享问卷" :show="shareView" @close="ViewClose(shareView)">
            <div
                style="display: flex;align-items: center;width: 100%;height: 30px;margin-bottom: 8px;box-shadow: 0 0 0 1px #dcdfe6 inset;padding:4px 8px;border-radius: 4px">
                <a :href="questionnaireShareInfo['link']" target="_blank">{{
                        questionnaireShareInfo['link']
                    }}</a>
                <el-button style="margin-left: auto" type="primary" link size="small">复制</el-button>
            </div>
            <div class="image-container">
                <div style="color: white;align-items: center;justify-content: center;">
                    <p style="font-size: 22px">{{ questionnaireShareInfo.title }}</p>
                    <p>手机扫描二维码填写内容</p>
                </div>
                <el-image style="border-radius: 4px" :src="'data:image/png;base64,'+questionnaireShareInfo.image"/>
            </div>
        </jh-dialog>
        <!--关闭问卷-->
        <jh-dialog title="结束问卷" :show="closeView" @close="ViewClose(closeView)">
            <div>确定要结束此问卷？</div>
            <template #footer>
                <el-button @click="ViewClose(closeView)">取消</el-button>
                <el-button @click="()=>{closeSurvey(currentOperateData.value.id),ViewClose(closeView)}">确定</el-button>
            </template>
        </jh-dialog>
        <!--删除问卷-->
        <jh-dialog title="删除问卷" :show="deleteView" @close="ViewClose(deleteView)">
            <div>确定要删除此问卷？</div>
            <template #footer>
                <el-button @click="ViewClose(deleteView)">取消</el-button>
                <el-button @click="()=>{deleteSurvey(currentOperateData.value.id),ViewClose(deleteView)}">确定</el-button>
            </template>
        </jh-dialog>

    </el-scrollbar>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import {formatDate, ViewClose, ViewOpen} from "../api/util";
import JhDialog from "../components/other/cmp/JhDialog.vue";
import useCollections from "../hooks/useCollections";
import {questionnaire_list, survey_close, survey_delete} from "../api/questionnaire";
import {ElMessage} from "element-plus";

let {
    search, tableData, showDetail, questionnaireShareInfo,
    shareView, closeView, deleteView, share, analysis
} = useCollections();

let currentOperateData = ref({});

function closeSurvey(id) {
    survey_close(id).then(res=>{
        if (res.data.code === 200) {
            ElMessage.success("关闭成功")
            window.location.reload();

        }
    })
}

function deleteSurvey(id) {
    survey_delete(id).then(res=>{
        if (res.data.code === 200) {
            ElMessage.success("删除成功")
            window.location.reload();
        }
    })
}


let copyTable = ref();

onMounted(() => {
    currentOperateData.value = {};
    questionnaire_list().then(res => {
        tableData.value = res.data.data;
        tableData.value.forEach(table => {
            console.log(table)
            // 格式化时间
            if (table.endTime == null) {
                table.endTime = formatDate(new Date());
            } else {
                table.endTime = formatDate(new Date(table.endTime))
            }
        })
        copyTable.value = tableData.value;
    })
})

watch(search, (o, n) => {
    if (o == null || o.length === 0) {
        tableData.value = copyTable.value;
    }
    let searchResult = [];
    copyTable.value.forEach(t=>{
        if (JSON.stringify(t).includes(o)) {
            searchResult.push(t);
        }
    })
    tableData.value = searchResult;
});


</script>

<style scoped>

.image-container {
    background-image: url('../assets/sea.jpg');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
    border-radius: 4px;
    padding: 4px 8px;
    display: flex;
    width: 100%;
    outline: none;
    justify-content: space-between
}

:deep(.el-table__row) {
    cursor: pointer;
}

</style>