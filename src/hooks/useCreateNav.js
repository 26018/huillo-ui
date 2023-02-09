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
            args: '/manager',
            action: navTo
        },

        {
            text: '清空所有缓存',
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

    function clear() {
        ElMessage.success("清除成功!")
    }

    function clearAll() {
        let survey = useSurvey();
        survey.$reset()
        refreshComponentIndex(survey['components']);
        ElMessage.success({
            message: "清除成功!",
            showClose: true,
        })
    }

    function publish() {
        const survey = useSurvey();
        const userfile = useUserFile()
        console.log(survey)
        console.log(userfile)
        publishSurvey(survey, userfile.downloadFileList);
        // 文件上传成功后，将其从列表中移除
        userfile.downloadFileList = []
    }

    function publishSurvey(survey, fileList) {
        let jsonAndFile = addJsonAndFile(survey, 'survey', fileList, 'downloadFiles');
        axios.post("/survey/create", jsonAndFile).then(res => {
            if (res.data.code === 200) {
                ElMessage.success("发布成功");
            }
        });
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