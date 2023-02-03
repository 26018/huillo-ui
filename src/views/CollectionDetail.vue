<template>
    <el-scrollbar>
        <div style="display: flex;align-items: center;;height: 50px">
            <el-icon style="cursor: pointer;" :size="24" @click="navTo(-1)">
                <ArrowLeft/>
            </el-icon>
            <div style="display: flex;font-size: 24px;margin-left: 8px">{{ questionnaire.title }}</div>
            <div style="margin-left: auto;">
                <el-button text @click="ViewOpen(collectionDetail.shareView)">
                    <el-icon>
                        <Share/>
                    </el-icon>&nbsp;分享
                </el-button>
                <el-button text type="primary" @click="ViewOpen(collectionDetail.editView)">
                    <el-icon>
                        <Edit/>
                    </el-icon>&nbsp;编辑
                </el-button>
                <el-button text type="info" @click="ViewOpen(collectionDetail.finishView)">
                    <el-icon>
                        <CloseBold/>
                    </el-icon>&nbsp;结束
                </el-button>
                <el-button text type="danger" @click="ViewOpen(collectionDetail.deletedView)">
                    <el-icon>
                        <Delete/>
                    </el-icon>&nbsp;删除
                </el-button>
            </div>
        </div>
        <el-card shadow="never" style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>提交人数：{{ questionnaire['submitterList'].length }}</div>
                <div>创建时间：{{ questionnaire.startTime }}</div>
                <div>截止时间：{{ questionnaire.endTime }}</div>
                <div>收集用时：8天5小时</div>
            </div>
        </el-card>
        <el-card shadow="never" style="margin-top: 8px">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <div>收集到 {{ questionnaire.fileList.length }} 份文件</div>
                <el-button @click="downloadFiles(questionnaire.fileList)" type="primary">全部下载</el-button>
            </div>
        </el-card>
        <el-card shadow="never" style="margin-top: 8px">
            <el-table style="width: 100%" :data="questionnaire.submitterList" :highlight-current-row="true"
                      :stripe="true">
                <el-table-column prop="username" fixed label="提交人" width="180"/>
                <el-table-column prop="submitCount" label="提交次数" width="180"/>
                <el-table-column prop="submitTime" label="提交日期" width="180"/>
                <el-table-column align="right">
                    <template #header>
                        <el-button @click="ViewOpen(collectionDetail.notSubmitNotifyView)" style="width: 170px"
                                   type="warning">通知未提交
                        </el-button>
                    </template>
                    <template #default="scope">
                        <div style="display: flex;">
                            <el-button style="margin-left: auto" type="primary" size="small"
                                       @click="navTo('/manager/collections/committed/detail/'+scope.row.id)">查看
                            </el-button>
                            <el-button size="small" @click="">回绝</el-button>
                            <el-button type="danger" size="small" @click="">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!--通知未提交窗口-->
        <jh-dialog :title="'邮件通知成员'" :show="collectionDetail.notSubmitNotifyView"
                   @close="ViewClose(collectionDetail.notSubmitNotifyView);">
            <div style="max-width: 400px">
                <el-checkbox-group v-model="notifyArray">
                    <el-checkbox v-for="member in questionnaire.notSubmitterList" :label="member.id">
                        {{ member.username }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <template #footer>
                <el-button @click="ViewClose(collectionDetail.notSubmitNotifyView)">取消</el-button>
                <el-button>全选</el-button>
                <el-button>反选</el-button>
                <el-button type="primary" @click="notifyNotSubmitOkButton">确认通知</el-button>
            </template>
        </jh-dialog>

        <!--分享-->
        <jh-dialog :show="collectionDetail.shareView" :title="'分享问卷'"
                   @close="ViewClose(collectionDetail.shareView)">
            <el-image style="border-radius: 4px"
                      :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQAAAABYmaj5AAAA6klEQVR42u3ULXLEMAwFYJvUV4jJ5moJia/gkPyQzRUkYl+tJjEttEhdo2468zK9wIp96D2NZqTqZb7UW3cq6rHMedNIUmlMHAVqD+Y4yGLR9GHvFJnzjSoHF195VxVlmfnV86o2Isdlv4uK3rqHmhxSDX6VzIJUdBgPThVJajFMNiOV+Tks3dQjVTk7b5ihEi3K9xGqDI5Pl5GKaQl+jUjy3UqfnYVKO40x9FDkTT5/9/ur0HWL1ztSy3ecikZqFyOTqEeSGo8kIlA7b4NX9kbPmVzCoodO5KAqcyxjRmrNPtUaeqT31/hXP+bsRmX82btZAAAAAElFTkSuQmCC'"/>
            <div>
                <a href="http:fixyou.top/questionnaire/26">http:fixyou.top/questionnaire/26</a>
            </div>
        </jh-dialog>
        <!--结束-->
        <jh-dialog :show="collectionDetail.finishView" @close="ViewClose(collectionDetail.finishView)">
            <h2>结束</h2>
            <template #footer>
                <el-button @click="ViewClose(collectionDetail.finishView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>
        <!--删除-->
        <jh-dialog :show="collectionDetail.deletedView" @close="ViewClose(collectionDetail.deletedView)">
            <h2>删除</h2>
            <template #footer>
                <el-button @click="ViewClose(collectionDetail.deletedView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>
    </el-scrollbar>
</template>

<script setup>
import {download, formatDate, navTo, ViewClose, ViewOpen} from "../api/util";
import JhDialog from "../components/other/cmp/JhDialog.vue";
import useCollectionDetail from "../hooks/useCollectionDetail";
import {onMounted, ref} from "vue";
import {questionnaire_detail} from "../api/questionnaire";
import {group_notifyNotSubmitMember} from "../api/group";
import {ElMessage} from "element-plus";
import {userFile_download} from "../api/UserFile";

let collectionDetail = useCollectionDetail();
let props = defineProps(['id']);
let notifyArray = ref([]);
let questionnaire = ref({
    title: "",
    fileList: [],
    submitterList: []
});

onMounted(() => {
    questionnaire_detail(props.id).then(res => {
        if (res.data.code !== 200) {
            ElMessage.error("获取详细信息失败");
            return
        }
        questionnaire.value = res.data.data;
    });
})

function notifyNotSubmitOkButton() {
    group_notifyNotSubmitMember(notifyArray.value).then(res => {
        if (res.data.code) {
            ElMessage.success("通知成功");
        }
    })
}

// 下载文件
function downloadFiles(fileList) {
    let downloadFileCount = 0;
    fileList.forEach(file => {
        userFile_download(file).then(res => {
            console.log(res.status)
            if (res.status === 200) {
                downloadFileCount = downloadFileCount + 1;
                if (downloadFileCount === fileList.length) {
                    ElMessage.success("文件全部下载成功")
                }
            }
            download(res.data, null, file.name);
        });
    })
}


</script>

<style scoped>

</style>