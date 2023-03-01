<template>
    <div class="component-frame">
        <!--操作栏-->
        <div class="operation-frame" v-if="notHeadComponent">
            <el-tag style="margin-right: auto;margin-left: 0" v-if="notHeadComponent">{{ model.tag }}</el-tag>

            <div>
                <slot name="extend"></slot>
            </div>
            <el-checkbox v-model="model.optional">选填</el-checkbox>
            <el-icon class="move">
                <Sort/>
            </el-icon>
            <el-icon @click="$emit('removeItem',model);">
                <CircleClose/>
            </el-icon>

        </div>
        <div v-if="model">
            <!--标题-->
            <text-input color="black" original="true" placeholder="请输入题目"
                        v-model="model.title" :font-size="fontSize_title">
                <template #prefix>
                    <div v-if="model.sequence">{{ componentSequence }}</div>
                </template>
            </text-input>
            <!--描述-->
            <text-input color="gray" original="true" v-model="model.description"
                        :allow-wrap="true" placeholder="请输入描述 (选填)"></text-input>
        </div>
        <!--拓展插槽-->
        <div>
            <slot></slot>
        </div>

    </div>
</template>

<script setup>

import {computed, onMounted} from "vue";
import {removeItem} from "../../../api/util";
import TextInput from "../cmp/TextInput.vue";

let props = defineProps(['model']);

// 是否是头部组件
let notHeadComponent = computed(() => {
    return !props.model || props.model.cname !== 'jh-head';
})

// 标题字体大小
let fontSize_title = computed(() => {
    return notHeadComponent.value ? '18px' : '28px'
})

// 顺序
const componentSequence = computed(() => {
    return notHeadComponent.value ? props.model.sequence + "." : "";
})


</script>

<style scoped>

</style>