import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {group_create} from "../api/group";
import {ViewClose} from "../api/util";

export default function () {

    let groupData = ref([]);

    let showGroupView = reactive({data: false});
    let createGroupTitle = ref("");
    let createGroupMaxMember = ref("");

    const addGroup = () => {
        if (createGroupTitle.value.length === 0) {
            ElMessage.info({
                message: '请输入群组名称',
                showClose: true,
            })
            return;
        }
        group_create({title: createGroupTitle.value, maxMember: createGroupMaxMember.value}).then(res => {
            if (res.data.code === 200) {
                ElMessage.success({
                    message: '创建成功',
                    showClose: true,
                })
                ViewClose(showGroupView);
            } else {
                ElMessage.error({
                    message: '创建失败',
                    showClose: true,
                })
            }
        });
    }


    return {
        groupData,showGroupView,createGroupTitle,createGroupMaxMember,addGroup,
    }
};