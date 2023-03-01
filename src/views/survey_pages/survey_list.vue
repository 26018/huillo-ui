<template>
    <el-scrollbar>
        <el-table :data="tableData" :show-overflow-tooltip="true" :highlight-current-row="true" @row-click="showDetail"
                  :stripe="false">
            <el-table-column :show-overflow-tooltip="true" fixed prop="title" label="收集标题" width="200"/>
            <el-table-column prop="status" sortable align="center" label="问卷状态" width="180"/>
            <el-table-column prop="commitCount" sortable align="center" label="提交次数" width="180"/>
            <el-table-column prop="endTime" sortable align="center" label="截止日期" width="180"/>
            <el-table-column align="center" min-width="280">
                <template #header>
                    <el-input v-model="search" style="width: 230px" clearable prefix-icon="Search"
                              placeholder='搜索问卷'/>
                </template>
                <template #default="scope">
                    <div style="display: flex;width: 100%;justify-content: center">
                        <el-button type="success" size="small" @click="()=>{
                            currentOperateData.value = scope.row
                            share(scope.row,shareView)
                        }">分享
                        </el-button>
                        <el-button type="primary" size="small" @click="analysis(scope.row)">分析</el-button>
                        <el-button type="warning" size="small"
                                   @click="()=>{currentOperateData.value = scope.row;ViewOpen(closeView)}">结束
                        </el-button>
                        <el-button type="danger" size="small"
                                   @click="()=>{currentOperateData.value = scope.row;ViewOpen(deleteView)}">删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--弹窗-->
        <!--分享问卷-->
        <jh-dialog title="分享问卷" :show="shareView" @close="ViewClose(shareView)">
            <share-card :title="SurveyShareInfo.title" :link="proxy.$local_host+'/surveys/'+currentOperateData.value.id"
                        :base64="SurveyShareInfo.image"></share-card>
        </jh-dialog>
        <!--关闭问卷-->
        <jh-dialog title="结束问卷" :show="closeView" @close="ViewClose(closeView)">
            <div>确定要结束此问卷？</div>
            <template #footer>
                <el-button @click="ViewClose(closeView)">取消</el-button>
                <el-button @click="()=>{closeSurvey(currentOperateData.value.id);ViewClose(closeView)}">确定</el-button>
            </template>
        </jh-dialog>
        <!--删除问卷-->
        <jh-dialog title="删除问卷" :show="deleteView" @close="ViewClose(deleteView)">
            <div>确定要删除此问卷？</div>
            <template #footer>
                <el-button @click="ViewClose(deleteView)">取消</el-button>
                <el-button @click="()=>{deleteSurvey(currentOperateData.value.id);ViewClose(deleteView)}">确定
                </el-button>
            </template>
        </jh-dialog>

    </el-scrollbar>
</template>

<script setup>

import {getCurrentInstance, onMounted, ref, watch} from "vue";
import {ViewClose, ViewOpen} from "../../api/util";
import JhDialog from "../../components/other/cmp/JhDialog.vue";
import useCollections from "../../hooks/useCollections";
import {questionnaire_list, survey_close, survey_delete} from "../../api/questionnaire";
import {ElMessage} from "element-plus";
import ShareCard from "../../components/other/cmp/ShareCard.vue";


let {
    search, tableData, showDetail, SurveyShareInfo,
    shareView, closeView, deleteView, share, analysis
} = useCollections();

let currentOperateData = ref({});
let {proxy} = getCurrentInstance();

function closeSurvey(id) {
    survey_close(id).then(res => {
        if (res.data.code === 200) {
            setTimeout(() => {
                ElMessage.success("关闭成功")
            }, 100)
            window.location.reload();
        }
    })
}

function deleteSurvey(id) {
    survey_delete(id).then(res => {
        if (res.data.code === 200) {
            window.location.reload();
            setTimeout(() => {
                ElMessage.success("删除成功")
            }, 100)
        }
    })
}


let copyTable = ref();

onMounted(() => {
    currentOperateData.value = {};
    questionnaire_list().then(res => {
        tableData.value = res.data.data;
        copyTable.value = tableData.value;
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


</script>

<style scoped>

:deep(.el-table__row) {
    cursor: pointer;
}

</style>