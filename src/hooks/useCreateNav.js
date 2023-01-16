import {reactive, ref} from "vue";
import {navTo} from "./util";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import {create} from "../api/questionnaire";
export default function () {
    let store = useStore();

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
        let template = localStorage.getItem('template');
        console.log(JSON.parse(template))
        create(JSON.parse(template));
        ElMessage.success({
            message: "发布成功!",
            showClose: true,
        })
    }

    function publishClick() {
        publishAble.value = true;
    }
    let navData = reactive([
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
    ])
    let publishAble = ref(false);
    return {navData, publishAble, publish};
}