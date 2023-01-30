<template>
    <el-scrollbar>
        <el-table :data="tableData" :height="'95vh'"
                  :show-overflow-tooltip="true"
                  :highlight-current-row="true" @row-click="showDetail"
                  :stripe="false">
            <el-table-column fixed prop="title" label="收集标题" width="180"/>
            <el-table-column prop="status" sortable label="状态" width="180"/>
            <el-table-column prop="commitCount" sortable label="提交次数" width="180"/>
            <el-table-column prop="endTime" sortable label="截止日期" width="180"/>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" style="width: 230px" clearable prefix-icon="Search"
                              placeholder='搜索问卷'/>
                </template>
                <template #default="scope">
                    <div style="display: flex;width: 230px;margin-left: auto">
                        <el-button type="success" size="small" @click="share(scope.row)">分享</el-button>
                        <el-button type="primary" size="small" @click="analysis(scope.row)">分析</el-button>
                        <el-button type="warning" size="small" @click="close(scope.row)">结束</el-button>
                        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--弹窗-->
        <!--分享问卷-->
        <jh-dialog title="分享问卷" :show="shareView" @close="shareExit">
            <div>
                <el-image style="border-radius: 4px" :src="'data:image/png;base64,'+questionnaireShareInfo.shareImage"/>
            </div>
            <div style="padding: 4px 2px;
                color: black;font-size: 14px;
                background-color: gainsboro;border-radius: 4px;
                box-sizing: border-box;">
                链接:
                <a target="_blank" :href="questionnaireShareInfo.shareLink">{{questionnaireShareInfo.shareLink}}</a>
            </div>
        </jh-dialog>
        <!--关闭问卷-->
        <jh-dialog title="结束问卷" :show="closeView" @close="closeExit">
            <div>确定要结束此问卷？</div>
            <template #footer>
                <el-button @click="closeExit">取消</el-button>
                <el-button>确定</el-button>
            </template>
        </jh-dialog>
        <!--删除问卷-->
        <jh-dialog title="删除问卷" :show="removeView" @close="removeExit">
            <div>确定要删除此问卷？</div>
            <template #footer>
                <el-button @click="removeExit">取消</el-button>
                <el-button>确定</el-button>
            </template>
        </jh-dialog>

    </el-scrollbar>
</template>

<script setup>

import {onMounted} from "vue";
import {formatDate} from "../api/util";
import JhDialog from "../components/other/cmp/JhDialog.vue";
import useCollections from "../hooks/useCollections";
import {questionnaire_list} from "../api/questionnaire";

let {
    search, tableData, showDetail, questionnaireShareInfo,
    shareView, removeView, closeView,
    shareExit, removeExit, closeExit,
    remove, close, share, analysis
} = useCollections();

onMounted(() => {
    questionnaire_list().then(res => {
        tableData.value = res.data.data;
        console.log(tableData.value)
        tableData.value.forEach(table => {
            // 格式化时间
            if (table.endTime == null) {
                table.endTime = formatDate(new Date());
            } else {
                table.endTime = formatDate(new Date(table.endTime))
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


</script>

<style scoped>
.collections {
    box-sizing: border-box;
    padding: 8px;
    width: calc(100vw - 200px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 10px;
    overflow: auto;
}

:deep(.el-table__row) {
    cursor: pointer;
}

</style>