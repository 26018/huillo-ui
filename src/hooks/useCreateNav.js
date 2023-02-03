import {reactive, ref} from "vue";
import {navTo} from "../api/util";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import { questionnaire_create} from "../api/questionnaire";

export default function () {
    let store = useStore();
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
        {
            text: '清空缓存',
            fontColor: 'red',
            args: '',
            action: clear
        },
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
        store.commit('questionnaire/CLEAR');
        ElMessage.success("清除成功!")
    }

    function clearAll() {
        store.commit('questionnaire/CLEAR_ALL');
        ElMessage.success("清除成功!")
        window.location = ''
    }

    function publish() {
        let template = localStorage.getItem('questionnaire');
        let parsed = JSON.parse(template);
        if (questionnaireEndTime.value.length === 0) {
            ElMessage.error({message: "截止时间不能为空", showClose: true})
            return;
        }
        // 加上截止时间和选择发布的群组
        parsed.endTime = questionnaireEndTime.value;
        parsed.selectedGroupList = selectedGroupList.value;



        questionnaire_create(parsed).then(res => {
            if (res.data.code !== 200) {
                ElMessage.error({message: res.data.message, showClose: true,})
                return;
            }
            ElMessage.success({message: "发布成功!", showClose: true,})
        });
    }
    function publishClick() {
        publishAble.data = true;
    }

    return {navData, publishAble, questionnaireEndTime, selectedGroupList, publish};
}