<template>
    <div :class="original?'original':'text-input'">
        <div class="text-input__prefix">
            <slot name="prefix"></slot>
        </div>
        <el-input autosize type="textarea" v-model="data" :placeholder="placeholder"></el-input>
    </div>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";

let props = defineProps(['modelValue', 'original','color', 'fontSize', 'allowWrap', 'placeholder'])

const emit = defineEmits(['update:modelValue'])
let data = ref("");

watch(data, (n, o) => {
    // 是否允许换行
    if (n && n.includes('\n') && !props['allowWrap']) {
        data.value = o;
    } else {
        emit("update:modelValue", n ? n.trim() : '');
    }
})

onMounted(() => {
    data.value = props.modelValue;
})
</script>

<style scoped>

.text-input, .original {
    display: flex;
    margin: 2px 0;
    padding: 4px;
    height: fit-content;
}

.text-input:hover, .original:hover {
    box-shadow: 0 0 1px 1px dodgerblue;
}

:deep(.el-textarea) {
    height: fit-content;
}

:deep(.el-textarea__inner) {
    border: none;
    outline: none;
    height: fit-content;
    color: v-bind(color);
}

.original :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 0;
    height: fit-content;
    resize: none;
    padding: 0;
    border-radius: 0;
    font-size: v-bind(fontSize);
}

.text-input__prefix {
    padding: 0;
    line-height: 1.5;
    box-sizing: border-box;
    font-size: v-bind(fontSize);
}
:deep(.el-textarea__inner)::-webkit-scrollbar {
    width: 0;
}
</style>