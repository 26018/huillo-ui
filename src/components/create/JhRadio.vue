<template>
    <component-create-frame :model="model">
        <el-radio-group style="width: 100%" v-model="model.preselectedAnswer">
            <edit-option-frame v-for="(option,index) in model.options" @removeItem="removeOption(model.options,model.input,option)">
                <el-radio :label="model.options[index]">
                    <el-input v-model="model.options[index]"/>
                </el-radio>
            </edit-option-frame>
        </el-radio-group>
        <el-button style="margin-top: 8px" @click="addOption(model.options)">新增选项</el-button>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {addOption, removeOption} from "../../hooks/util";
import EditOptionFrame from "../other/frame/EditOptionFrame.vue";

let props = defineProps(['model'])

</script>

<style scoped>

</style>