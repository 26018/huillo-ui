<template>
    <el-input v-model="data" :autosize="{minRows:2}" :type="type" placeholder="请输入描述 (选填)" clearable :style="{fontSize:size}"/>
</template>

<script setup>

defineProps(['data', 'size', 'type']);

</script>

<style scoped>
:deep(.el-input__wrapper) {
    border: 0;
    padding: 0;
    box-shadow: 0 0 0 0;
    border-radius: 0;
    outline: none;
}

:deep(.el-input__inner) {
    height: auto;
}

:deep(.el-input__wrapper.is-focus) {
    border: 0;
    box-shadow: 0 0 0 0;
    outline: none;
}

:deep(.el-input__wrapper):hover {
    border: 0;
    box-shadow: 0 0 0 0;
    outline: none;
}

</style>