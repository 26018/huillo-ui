import {reactive, ref, watch} from "vue";
import {navTo} from "../api/util";
// import {questionnaire_list, questionnaire_share} from "../api/questionnaire";

export default function () {

    let search = ref("");
    let SurveyShareInfo = ref({});
    let shareView = reactive({data: false});
    let closeView = reactive({data: false});
    let deleteView = reactive({data: false});
    let tableData = ref([]);

    // 点击按钮的方法
    const analysis = (data) => {
        navTo('/management/surveys/analysis/' + data.id + "?title=" + data.title);
    };

    const showDetail = (row, column, event) => {
        if (column.label === '' || column.label === undefined) {
            return;
        }
        navTo('surveys/' + row.id)
    }
    return {
        search, tableData, SurveyShareInfo,
        shareView, closeView, deleteView,
        analysis, showDetail
    }

};