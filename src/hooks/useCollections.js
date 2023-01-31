import {reactive, ref, watch} from "vue";
import {navTo} from "../api/util";
import {questionnaire_list, questionnaire_share} from "../api/questionnaire";

export default function () {

    let search = ref("");
    let questionnaireShareInfo = ref({});
    let shareView = ref(false);
    let closeView = ref(false);
    let removeView = ref(false);
    let tableData = ref([]);

    // 点击按钮的方法
    const analysis = (data) => {
        navTo('collections/analysis/' + data.id)
    };
    const share = (data) => {
        questionnaire_share(data.id).then(res => {
            questionnaireShareInfo.value = res.data.data;
            console.log(questionnaireShareInfo.value)
        })
        shareView.value = true;
    }

    const close = (data) => {
        closeView.value = true;
    };

    const remove = (data) => {
        removeView.value = true;
    };

// 关闭方法

    const shareExit = () => {
        shareView.value = false;
    }

    const closeExit = () => {
        closeView.value = false;
    }

    const removeExit = () => {
        removeView.value = false;
    };

    // let keepAliveValue = tableData;
// 检测搜索值变化
    watch(search, (value, oldValue, onCleanup) => {
        // tableData = keepAliveValue;
        // if (value === '') {
        //     return;
        // }
        // let newTable = [];
        // tableData.forEach(v => {
        //     let s = JSON.stringify(v);
        //     if (s.includes(value)) {
        //         newTable.push(v);
        //     }
        // })
        // tableData = newTable;
    });

    const showDetail = (row, column, event) => {
        if (column.label === '' || column.label == undefined) {
            return;
        }
        navTo('collections/detail/' + row.id)
    }
    return {
        search, tableData, showDetail, questionnaireShareInfo,
        shareView, removeView, closeView,
        shareExit, removeExit, closeExit,
        remove, close, share, analysis
    }

};