<template>
    <component-submit-frame :data="data">
        <div v-for="file in data.options">
            <div>{{ file }}</div>
        </div>
        <el-button style="width: 100%" type="primary">下载全部文件</el-button>
    </component-submit-frame>
</template>

<script setup>

import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {onMounted} from "vue";

let props = defineProps(['data']);
onMounted(()=>{
    props.data.optional = true;
    if (props.data.options != null) {
        props.data.options = JSON.parse(props.data.options)
    }
})

</script>

<style scoped>

</style>