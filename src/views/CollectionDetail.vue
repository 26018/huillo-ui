<template>
    <el-scrollbar>
        <div style="display: flex;align-items: center;">
            <el-icon style="cursor: pointer;" :size="24" @click="navTo(-1)">
                <ArrowLeft/>
            </el-icon>
            <div style="display: flex;font-size: 24px;margin-left: 8px">{{ collectionDetail.title.value }}</div>
            <div style="display: flex;margin-left: auto;background-color: white;padding: 8px;border-radius: 8px;">
                <el-button type="" @click="openView(collectionDetail.shareView)">
                    <el-icon>
                        <Share/>
                    </el-icon>&nbsp;分享
                </el-button>
                <el-button type="warning" @click="openView(collectionDetail.exportView)">
                    <el-icon>
                        <Share/>
                    </el-icon>&nbsp;导出
                </el-button>
                <el-button type="primary" @click="openView(collectionDetail.editView)">
                    <el-icon>
                        <Edit/>
                    </el-icon>&nbsp;编辑
                </el-button>
                <el-button type="info" @click="openView(collectionDetail.finishView)">
                    <el-icon>
                        <CloseBold/>
                    </el-icon>&nbsp;结束
                </el-button>
                <el-button type="danger" @click="openView(collectionDetail.deletedView)">
                    <el-icon>
                        <Delete/>
                    </el-icon>&nbsp;删除
                </el-button>
            </div>
        </div>
        <el-card style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>提交人数：{{ collectionDetail.tableData.value.length }}</div>
                <div>创建时间：{{ collectionDetail.startTime.value }}</div>
                <div>截止时间：{{ collectionDetail.endTime.value }}</div>
                <div>收集用时：8天5小时</div>
            </div>
        </el-card>
        <el-card style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>收集到 {{ collectionDetail.filesCount }} 份文件</div>
                <el-button type="primary">全部下载</el-button>
            </div>
        </el-card>
        <el-card style="margin-top: 8px">
            <el-table style="width: 100%"  :data="collectionDetail.tableData.value" :highlight-current-row="true" :stripe="true">
                <el-table-column prop="username" fixed label="提交人" width="180"/>
                <el-table-column prop="commitCount" label="提交次数" width="180"/>
                <el-table-column prop="commitTime" label="提交日期" width="180"/>
                <el-table-column align="right">
                    <template #header>
                        <el-button @click="openView(collectionDetail.notSubmitNotifyView)" style="width: 170px" type="warning">通知未提交</el-button>
                    </template>
                    <template #default="scope">
                       <div style="display: flex;">
                           <el-button style="margin-left: auto" type="primary" size="small" @click="">查看</el-button>
                           <el-button size="small" @click="">回绝</el-button>
                           <el-button type="danger" size="small" @click="">删除</el-button>
                       </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!--通知未提交窗口-->
        <jh-dialog :show="collectionDetail.notSubmitNotifyView.data"
                   @close="closeView(collectionDetail.notSubmitNotifyView);">
            <div style="width: 800px;height: 400px">
                <el-card style="margin-top: 8px">
                    <el-table style="width: 100%" :data="collectionDetail.tableData.value" :highlight-current-row="true"
                              :stripe="true">
                        <el-table-column prop="username" fixed label="提交人" width="180"/>
                    </el-table>
                </el-card>
            </div>
        </jh-dialog>
        <!--分享-->
        <jh-dialog :show="collectionDetail.shareView.data" @close="closeView(collectionDetail.shareView)">

            <template #footer>
                <el-button @click="closeView(collectionDetail.shareView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>
        <!--结束-->
        <jh-dialog :show="collectionDetail.finishView.data" @close="closeView(collectionDetail.finishView)">
            <h2>结束</h2>
            <template #footer>
                <el-button @click="closeView(collectionDetail.finishView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>
        <!--删除-->
        <jh-dialog :show="collectionDetail.deletedView.data" @close="closeView(collectionDetail.deletedView)">
            <h2>删除</h2>
            <template #footer>
                <el-button @click="closeView(collectionDetail.deletedView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>


    </el-scrollbar>
</template>

<script setup>
import {closeView, formatDate, navTo, openView} from "../api/util";
import JhDialog from "../components/other/cmp/JhDialog.vue";
import useCollectionDetail from "../hooks/useCollectionDetail";
import {onMounted} from "vue";
import {questionnaire_detail} from "../api/questionnaire";

let collectionDetail = useCollectionDetail();

let props = defineProps(['id']);

onMounted(() => {
    questionnaire_detail(props.id).then(res => {
        console.log(res.data.data)
        let {endTime, title, startTime, filesCount, submitterDetailList} = res.data.data;
        collectionDetail.title.value = title;
        collectionDetail.filesCount.value = filesCount;
        collectionDetail.tableData.value = submitterDetailList;
        collectionDetail.startTime.value = formatDate(new Date(startTime));
        collectionDetail.endTime.value = formatDate(new Date(endTime));
    });
})

</script>

<style scoped>

</style>