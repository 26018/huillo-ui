import {reactive, ref} from "vue";

export default function () {
    let tableData = ref([]);
    let startTime = ref("");
    let endTime = ref("");
    let filesCount = ref("");
    let title = ref("");

    // 分享窗口
    let shareView = reactive({data: false})
    // 导出窗口
    let exportView = reactive({data: false})
    // 编辑窗口
    let editView = reactive({data: false})
    // 删除窗口
    let deletedView = reactive({data: false})
    // 结束窗口
    let finishView = reactive({data: false})
    // 通知未提交
    let notSubmitNotifyView = reactive({data: false})
    return {
        tableData, title, endTime, startTime, filesCount, shareView, exportView, editView, deletedView,
        finishView, notSubmitNotifyView
    };
};