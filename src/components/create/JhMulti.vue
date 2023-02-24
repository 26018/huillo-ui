<template>
    <component-create-frame :model="model">
        <el-checkbox-group style="width: 100%;" v-model="model.preselectedAnswer">
            <edit-option-frame @removeItem="removeOption(model.options,model.input,option)"
                               v-for="(option,index) in model.options">
                <el-checkbox :key="index" :label="option">
                    <text-input v-model="model.options[index]" original="true"></text-input>
                </el-checkbox>
            </edit-option-frame>
        </el-checkbox-group>
        <el-button style="margin-top: 8px" @click="addOption(model.options)">新增选项</el-button>
    </component-create-frame>

</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import EditOptionFrame from '../other/frame/EditOptionFrame.vue'
import {addOption, removeOption} from "../../api/util";
import TextInput from "../other/cmp/TextInput.vue";


let props = defineProps(['model']);

</script>

<style scoped>

.el-checkbox-group :deep(.el-checkbox) {
    width: 100%;
}

:deep(.el-checkbox__label) {
    width: 100%;
}
</style>