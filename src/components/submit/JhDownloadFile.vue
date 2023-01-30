<template>
    <component-submit-frame :data="data">
        <div v-for="file in data.value">
            <div>{{ file.name }}</div>
        </div>
        <el-button style="width: 100%" type="primary">下载全部文件</el-button>
    </component-submit-frame>
</template>

<script setup>

import {inject, provide} from "vue";
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

let props = defineProps(['data']);


</script>

<style scoped>

</style>