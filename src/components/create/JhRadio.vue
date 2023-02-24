<template>
    <component-create-frame :model="model">
        <el-radio-group style="width: 100%" v-model="model.preselectedAnswer">
            <edit-option-frame v-for="(option,index) in model.options" @removeItem="removeOption(model.options,model.input,option)">
                <el-radio :label="model.options[index]">
                    <text-input original="true" v-model="model.options[index]"></text-input>
                </el-radio>
            </edit-option-frame>
        </el-radio-group>
        <el-button style="margin-top: 8px" @click="addOption(model.options)">新增选项</el-button>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {addOption, removeOption} from "../../api/util";
import EditOptionFrame from "../other/frame/EditOptionFrame.vue";
import TextInput from "../other/cmp/TextInput.vue";

let props = defineProps(['model'])

</script>

<style scoped>
:deep(.el-radio) {
    height: auto;
    width: 100%;
    align-items: flex-start;
}

:deep(.el-radio) > *{
    /*border: 1px solid red;*/
}
:deep(.el-radio__input) {
    padding: 10px 0;
}

:deep(.el-radio__label) {
    width: 100%;
}
</style>