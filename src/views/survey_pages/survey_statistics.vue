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
        <div class="kkg">
            <div style="min-width: 140px;display: flex;flex-direction: column;justify-content: space-evenly;">
                <jh-card style="height: 50%">
                    <div class="flex">
                        <div style="font-size: 18px;margin-bottom: 8px">提交人数</div>
                        <div style="font-size: 40px">{{ questionnaire['submitterList'].length }}</div>
                    </div>
                </jh-card>
                <div style="height: 16px"></div>
                <jh-card style="height: 50%">
                    <div class="flex">
                        <div style="font-size: 18px;margin-bottom: 8px">收集到文件</div>
                        <div>
                            <span style="font-size: 40px"> {{ questionnaire.fileList.length }}</span><span>份</span>
                        </div>
                        <el-button link type="primary" @click="ViewOpen(fileListView)">查看全部</el-button>
                    </div>
                </jh-card>
            </div>

            <jh-card style="flex: 1;min-width: 500px">
                <div v-if="!emptySet" id="data" style="height: 100%;width: 100%"></div>
                <div v-else
                     style="font-size: 18px;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                    暂无统计数据
                </div>
            </jh-card>

            <jh-card min-width="140px">
                <div style="font-size: 18px;margin-bottom: 8px">通知的群组</div>
                <div>
                    <div
                        style="width: 100%;text-align: center;color: cornflowerblue;white-space: nowrap;padding: 8px 0;border-bottom: 2px dashed gainsboro"
                        v-for="group in questionnaire.selectedGroupList">{{
                            group['title']
                        }}
                    </div>
                </div>
                <div style="color: gray;display: flex;align-items: center;height: 100%"
                     v-show="questionnaire['selectedGroupList'] == null || questionnaire['selectedGroupList'].length === 0">
                    未选择通知群组
                </div>
            </jh-card>

            <div style="width: 200px;display: flex;flex-direction: column;justify-content: space-between;">
                <jh-card style="height: 50%">
                    <div style="display: flex;flex-direction: column;justify-content: center">
                        <div style="font-size: 18px;margin-bottom: 8px">开始时间</div>
                        <div style="font-size: 30px;font-weight: 600;color: rgb(0,217,89)"> {{
                                simpleFormatDate(new Date(questionnaire.startTime))
                            }}
                        </div>
                    </div>
                </jh-card>
                <div style="height: 16px"></div>
                <jh-card style="height: 50%">
                    <div style="display: flex;flex-direction: column;justify-content: center">
                        <div style="font-size: 18px;margin-bottom: 8px">截止时间</div>
                        <div style="font-size: 30px;font-weight:600;color: orangered">{{
                                simpleFormatDate(new Date(questionnaire.endTime))
                            }}
                        </div>
                    </div>
                </jh-card>
            </div>
        </div>
        <jh-card style="padding: 8px;">
            <el-table style="width: 100%;"
                      :data="questionnaire.submitterList"
                      :highlight-current-row="true"
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
                                       @click="()=>{ selectCurrentSubmitter(scope.row);ViewOpen(collectionDetail.personalSubmitDetailView)}">
                                查看
                            </el-button>
                            <el-button size="small" @click="">回绝</el-button>
                            <el-button type="danger" size="small" @click="">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </jh-card>

        <!--文件列表窗口-->
        <jh-dialog :title="'文件列表'" :show="fileListView">
            <div>
                <div style="max-width: 1200px;max-height: 350px;overflow: auto">
                    <el-table :border="true" :data="questionnaire.fileList"
                              style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true" :fit="false" prop="name" label="name"
                                         width="180"/>
                        <el-table-column prop="size" label="size" width="180"/>
                        <el-table-column prop="md5" width="300" label="md5"/>
                        <el-table-column label="操作" align="center" width="60">
                            <el-button link type="primary">下载</el-button>
                        </el-table-column>
                    </el-table>
                </div>
                <div style="display: flex;margin-top: 24px;align-items: center">
                    <el-button style="margin-left: auto;" type="primary" @click="downloadFiles(questionnaire.fileList)">
                        全部下载
                    </el-button>
                </div>
            </div>

        </jh-dialog>
        <!--通知未提交窗口-->
        <jh-dialog :title="'邮件通知成员'" :show="collectionDetail.notSubmitNotifyView">
            <div style="max-width: 400px">
                <el-checkbox-group v-model="notifyArray">
                    <el-checkbox v-for="member in questionnaire['notSubmitterList']" :label="member.id">
                        {{ member.username }}
                    </el-checkbox>
                </el-checkbox-group>
                <div v-if="questionnaire['notSubmitterList'].length === 0">暂无未提交成员</div>
            </div>
            <template #footer>
                <div v-show="questionnaire['notSubmitterList'].length !== 0">
                    <el-button @click="ViewClose(collectionDetail.notSubmitNotifyView)">取消</el-button>
                    <el-button>全选</el-button>
                    <el-button>反选</el-button>
                    <el-button type="primary" @click="notifyNotSubmitOkButton">确认通知</el-button>
                </div>
            </template>
        </jh-dialog>
        <!--个人提交详情窗口-->
        <jh-dialog :title="'提交列表'" :show="collectionDetail.personalSubmitDetailView">
            <div style="max-width: 1200px;max-height: 350px;overflow: auto">
                <el-table :border="true" :show-overflow-tooltip="true" :data="currentSubmitter['submitList']"
                          style="width: 100%">
                    <el-table-column :fit="false" prop="id" label="提交id" width="200"/>
                    <el-table-column prop="username" label="用户名" width="180"/>
                    <el-table-column prop="submitTime" width="180" label="提交时间"/>
                    <el-table-column label="操作" align="center" width="60">
                        <template #default="scope">
                            <el-button link type="primary"
                                       @click="navTo('/manager/collections/committed/detail/'+scope.row.id)">查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </DIV>
        </jh-dialog>
        <!--分享-->
        <jh-dialog :show="collectionDetail.shareView" :title="'分享问卷'">
            <share-card title="测试" link="http:fixyou.top/questionnaire/26"
                        :base64="'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQAAAABYmaj5AAAA6klEQVR42u3ULXLEMAwFYJvUV4jJ5moJia/gkPyQzRUkYl+tJjEttEhdo2468zK9wIp96D2NZqTqZb7UW3cq6rHMedNIUmlMHAVqD+Y4yGLR9GHvFJnzjSoHF195VxVlmfnV86o2Isdlv4uK3rqHmhxSDX6VzIJUdBgPThVJajFMNiOV+Tks3dQjVTk7b5ihEi3K9xGqDI5Pl5GKaQl+jUjy3UqfnYVKO40x9FDkTT5/9/ur0HWL1ztSy3ecikZqFyOTqEeSGo8kIlA7b4NX9kbPmVzCoodO5KAqcyxjRmrNPtUaeqT31/hXP+bsRmX82btZAAAAAElFTkSuQmCC'">
            </share-card>
        </jh-dialog>
        <!--结束-->
        <jh-dialog :show="collectionDetail.finishView">
            <h2>结束此问卷？</h2>
            <template #footer>
                <el-button @click="ViewClose(collectionDetail.finishView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>
        <!--删除-->
        <jh-dialog :show="collectionDetail.deletedView">
            <h2>删除此问卷？</h2>
            <template #footer>
                <el-button @click="ViewClose(collectionDetail.deletedView)">取消</el-button>
                <el-button @click="">确定</el-button>
            </template>
        </jh-dialog>

    </el-scrollbar>
</template>

<script setup>
import {download, navTo, simpleFormatDate, ViewClose, ViewOpen} from "../../api/util";
import JhDialog from "../../components/other/cmp/JhDialog.vue";
import useCollectionDetail from "../../hooks/useCollectionDetail";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {questionnaire_detail} from "../../api/questionnaire";
import {group_notifyNotSubmitMember} from "../../api/group";
import {ElMessage} from "element-plus";
import {userFile_download} from "../../api/UserFile";
import JhCard from "../../components/other/cmp/JhCard.vue";
import ShareCard from "../../components/other/cmp/ShareCard.vue";

let fileListView = reactive({data: false})
let collectionDetail = useCollectionDetail();
let props = defineProps(['id']);
let notifyArray = ref([]);
let currentSubmitter = ref({});
let emptySet = ref(false);
let questionnaire = ref({
    title: "",
    fileList: [],
    submitterList: [],
    selectedGroupList: [],
});

onMounted(() => {

    let {proxy} = getCurrentInstance();

    questionnaire_detail(props.id).then(res => {
        if (res.data.code !== 200) {
            ElMessage.error("获取详细信息失败");
            return
        }
        questionnaire.value = res.data.data;

        let myChart = proxy.$echarts.init(document.getElementById('data'));
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: 'line'
            },
            xAxis: {
                type: 'time',
                name: "日期",
                splitLine: {
                    show: true
                },
                min: new Date(questionnaire.value['startTime']), // 起始
                max: new Date(questionnaire.value['endTime']),
                axisLabel: {
                    interale: 0,
                    rotate: -40,
                    formatter: function (value) {//在这里写你需要的时间格式
                        let t_date = new Date(value);
                        return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-');

                    }
                }
            },
            yAxis: {
                type: 'value',
                name: "总次数"
            },
            series: [
                {
                    data: [],
                    type: 'line',
                },
            ],
        };

        let array = questionnaire.value.submitterList;
        let index = 0;
        let dateArray = []
        if (array != null) {
            array.forEach(a => {
                let list = a['submitList'];
                if (list != null) {
                    list.forEach(l => {
                        index++
                        let parseDate = new Date(l.submitTime);
                        dateArray.push(parseDate)
                        option.series[0].data.push([parseDate, index]);
                    })
                }
            })
        }
        let maxTime = Math.max(...dateArray);
        let minTime = Math.min(...dateArray);
        option.xAxis.max = new Date(maxTime);
        option.xAxis.min = new Date(minTime);
        if (dateArray.length === 0) {
            emptySet.value = true;
        }
        myChart.setOption(option);
        window.addEventListener('resize', myChart.resize)
    });
})

function selectCurrentSubmitter(selectedCurrentSubmitter) {
    currentSubmitter.value = selectedCurrentSubmitter;
}

function notifyNotSubmitOkButton() {
    let dto = {
        userIdList: notifyArray.value,
        surveyId: 257248,
        surveyTitle: questionnaire.value.title,
    }
    group_notifyNotSubmitMember(dto).then(res => {
        if (res.data.code === 200) {
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
.kkg {
    display: flex;
    min-width: 800px;
}

.kkg > * {
    margin: 8px;
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

:deep(.el-table .cell) {
    white-space: nowrap;
}


</style>