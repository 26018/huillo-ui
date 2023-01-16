<template>
    <component-create-frame :model="model">
        <el-checkbox-group style="width: 100%;" v-model="model.preselectedAnswer">
            <edit-option-frame @removeItem="removeOption(model.options,model.input,option)"
                               v-for="(option,index) in model.options">
                <el-checkbox :key="index" :label="option">
                    <el-input v-model="model.options[index]"/>
                </el-checkbox>
            </edit-option-frame>
        </el-checkbox-group>
        <el-button style="margin-top: 8px" @click="addOption(model.options)">新增选项</el-button>
    </component-create-frame>

</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import EditOptionFrame from '../other/frame/EditOptionFrame.vue'
import {addOption, removeOption} from "../../hooks/util";


let props = defineProps(['model']);

</script>

<style scoped>

</style>