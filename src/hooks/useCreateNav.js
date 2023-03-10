import {reactive, ref} from "vue";
import {addJsonAndFile, navTo, refreshComponentIndex} from "../api/util";
import {ElMessage} from "element-plus";
import {useSurvey} from "../store/survey";
import {useUserFile} from "../store/userfile";
import axios from "axios";
import {group_list} from "../api/group";

export default function () {
    let publishAble = reactive({data: false});
    let selectedGroupList = ref([]);
    let questionnaireEndTime = ref("");
    let groupList = ref([]);
    let navData = [
        {
            text: '我的',
            fontColor: 'black',
            args: '/management',
            action: navTo
        },

        {
            text: '清空问卷',
            fontColor: 'red',
            args: '',
            action: clearAll
        },
        {
            text: '发布',
            fontColor: 'rgb(64,158,255)',
            args: '',
            action: publishClick
        },
    ]

    function clearAll() {
        let survey = useSurvey();
        survey.$reset()
        refreshComponentIndex(survey['components']);
        location.reload()
        ElMessage.success({
            message: "清除成功!",
            showClose: true,
        })
    }

    function publish() {
        let survey = useSurvey();
        let userfile = useUserFile();
        if (survey.endTime == null || survey.endTime.length === 0) {
            ElMessage.error("请选择截止日期")
            return;
        }
        publishSurvey(survey, userfile.downloadFileList).then(res => {
            if (res.data.code === 200) {
                ElMessage.success("发布成功");
                // 文件上传成功后，将其从列表中移除
                userfile.downloadFileList = []
            }
        });
    }

    function publishSurvey(survey, fileList) {

        let jsonAndFile = addJsonAndFile(survey.$state, 'survey', fileList, 'downloadFiles');
        return axios.post("/survey/create", jsonAndFile);
    }


    function publishClick() {
        publishAble.data = true;
        const survey = useSurvey();
        survey.endTime = null;
        survey.selectedGroupList = [];
        survey.anonymous = false;
        group_list().then(res => {
            groupList.value = res.data.data
        });
    }

    return {navData, publishAble, questionnaireEndTime, selectedGroupList, groupList, publish};
}