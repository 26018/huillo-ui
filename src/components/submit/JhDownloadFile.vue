<template>
    <component-submit-frame :data="data">
        <div>
            <div>秋名山...mp4</div>
            <div>暗号...mp3</div>
            <div>无名之辈...txt</div>
            <div>......</div>
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