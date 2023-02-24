<template>
    <component-submit-frame :data="data">
        <el-input type="textarea" :autosize="{minRows:2}" v-model="data.input"/>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

let props = defineProps(['data']);

function re() {
    console.log("remove")
}
</script>

<style scoped>
:deep(.el-input__inner) {
    height: fit-content;
}
</style>