<template>
    <div class="component-frame">
        <div>
            <text-read :pre="true" :text="data.title" :font-size="fontSize_title">
                <template #prefix>
                    <div>{{ componentSequence }}</div>
                </template>
                <template #suffix>
                    <span v-if="notHeadComponent && !optional" class="suffix">*</span>
                </template>
            </text-read>
        </div>
        <div style="color: gray">
            <text-read :pre="true" v-if="data.description" :text="data.description"></text-read>
        </div>
        <div class="submit-slot">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

import {computed} from "vue";
import TextRead from "../cmp/TextRead.vue";

let props = defineProps(['data']);

// 是否是头部组件
let notHeadComponent = computed(() => {
    return !props.data || props.data.cname !== 'jh-head';
})

let optional = computed(() => {
    return props.data.optional
})

// 标题字体大小
let fontSize_title = computed(() => {
    return notHeadComponent.value ? '18px' : '28px'
})

// 顺序
const componentSequence = computed(() => {
    return notHeadComponent.value ? props.data.sequence + "." : "";
})


</script>

<style scoped>
.suffix{
    color: red;
}
</style>