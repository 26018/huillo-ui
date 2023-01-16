<template>
    <component-submit-frame :data="data">
        <el-select
            v-model="data.input" :multiple="data.mode==='multi'" filterable
            default-first-option :reserve-keyword="false"
            placeholder="请选择">
            <el-option v-for="item in data.options" :key="item" :label="item" :value="item"/>
        </el-select>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

let props = defineProps(['data']);

</script>

<style scoped>

:deep(.el-select) {
    width: 100%;
}

:deep(.el-select-dropdown__item.hover) {
    background-color: transparent;
}


</style>