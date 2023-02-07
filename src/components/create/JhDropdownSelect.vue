<template>
    <component-create-frame :model="model">
        <template #extend>
            <el-switch
                v-model="modeVal"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #13ce66"
                active-text="多选"
                inactive-text="单选"
                @change="modeStatusChange"/>
        </template>
        <el-select v-model="model.preselectedAnswer" :multiple="modeVal" clearable :reserve-keyword="false"
                   placeholder="请选择">
            <edit-option-frame v-for="item in model.options" :key="item"
                               @removeItem="removeOption(model.options,model.preselectedAnswer,item);">
                <el-option :key="item" :label="item" :value="item"/>
            </edit-option-frame>
        </el-select>
        <div style="margin-top: 8px;">已添加的选项</div>
        <div>
            <el-input style="margin-top: 4px" v-for="option in model.options" :model-value="option">{{ option }}
            </el-input>
        </div>
        <el-input style="margin-top: 8px" placeholder="回车确认添加" @keyup.enter="addOption" v-model="addValue">
        </el-input>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {ref, watch} from "vue";
import {ElMessage} from "element-plus";
import EditOptionFrame from "../other/frame/EditOptionFrame.vue";
import {removeOption} from "../../api/util";

let props = defineProps(['model'])

let addValue = ref("");

let modeVal = ref(props.model.mode === 'multi');

const addOption = () => {
    if (addValue.value.length === 0) {
        ElMessage.info({
            message: '输入不能为空',
            showClose: true,
        })
        return;
    }
    props.model.options.push(addValue.value);
    ElMessage.success({
        message: '添加成功',
        showClose: true,
    })
    addValue.value = "";
};
const modeStatusChange = () => {
    // 已选择的项置空
    props.model.preselectedAnswer = [];
    addValue.value = "";
    props.model.mode = modeVal.value ? 'multi' : 'radio';
}

</script>

<style scoped>

:deep(.el-select) {
    width: 100%;
}

:deep(.el-select-dropdown__item.hover) {
    background-color: transparent;
}

:deep(.el-switch__core) {

}


</style>