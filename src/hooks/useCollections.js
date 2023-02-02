import {reactive, ref, watch} from "vue";
import {navTo} from "../api/util";
import {questionnaire_list, questionnaire_share} from "../api/questionnaire";

export default function () {

    let search = ref("");
    let questionnaireShareInfo = ref({});
    let shareView = reactive({data: false});
    let closeView = reactive({data: false});
    let deleteView = reactive({data: false});
    let tableData = ref([]);

    // 点击按钮的方法
    const analysis = (data) => {
        navTo('collections/analysis/' + data.id)
    };
    const share = (data, viewControl) => {
        viewControl.data = true;
        questionnaire_share(data.id).then(res => {
            questionnaireShareInfo.value = res.data.data;
            console.log(questionnaireShareInfo.value)
        })
        shareView.value = true;
    }
    const close = (data, viewControl) => {
        viewControl.data = true;

    };
    const remove = (data, viewControl) => {
        viewControl.data = true;
    };

    const showDetail = (row, column, event) => {
        if (column.label === '' || column.label === undefined) {
            return;
        }
        navTo('collections/detail/' + row.id)
    }
    return {
        search, tableData, showDetail, questionnaireShareInfo,
        shareView, closeView, deleteView,
        close, share, analysis, remove
    }

};