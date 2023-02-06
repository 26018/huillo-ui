import {reactive, ref} from "vue";
import {addJsonAndFile, navTo, refreshComponentIndex} from "../api/util";
import {ElMessage} from "element-plus";
import {useSurvey} from "../store/survey";
import {useUserFile} from "../store/userfile";
import axios from "axios";

export default function () {
    let publishAble = reactive({data: false});
    let selectedGroupList = ref([]);
    let questionnaireEndTime = ref("");
    let navData = [
        {
            text: '我的',
            fontColor: 'black',
            args: '/manager',
            action: navTo
        },
        // {
        //     text: '清空缓存',
        //     fontColor: 'red',
        //     args: '',
        //     action: clear
        // },
        {
            text: '清空所有缓存',
            fontColor: 'dodgerblue',
            args: '',
            action: clearAll
        },

        {
            text: '发布',
            fontColor: 'green',
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
        uploadFile(survey, userfile.downloadFileList);
        // 文件上传成功后，将其从列表中移除
        userfile.downloadFileList = []
    }

    function uploadFile(survey, fileList) {
        let jsonAndFile = addJsonAndFile(survey, 'survey', fileList, 'downloadFiles');
        axios.post("http://localhost/questionnaire/create", jsonAndFile).then(res => {
            console.log(res.data)
        });
    }


    function publishClick() {
        publishAble.data = true;
    }

    return {navData, publishAble, questionnaireEndTime, selectedGroupList, publish};
}