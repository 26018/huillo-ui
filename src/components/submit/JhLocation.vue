<template>
    <component-submit-frame :data="data">
        <read-only-text style="margin-top: 8px;background-color: rgba(243,246,249);border-radius: 4px;box-sizing: border-box;padding: 4px" :data="'您当前在：四川省成都市武侯区'+'附近'"/>
        <el-button style="width: 100%" type="primary" @click="getLocation">点击获取位置</el-button>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

import {ElMessage} from "element-plus";
import {provide, reactive} from "vue";
import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";

let props = defineProps(['data']);

let userLocation = reactive({
    data: {}
});

function showMap(position) { //.强调coords
    userLocation.data = position;
    console.log(userLocation.data)
}

function error(error) { //.强调code
    let err = error.code;
    switch (err) {
        case 1:
            alert("用户拒绝了位置服务");
            break;
        case 2:
            alert("获取不到位置信息");
            break;
        case 3:
            alert("获取信息超时");
    }
}

function getLocation() {
    let location = navigator.geolocation;
    if (!location) {
        ElMessage.error('浏览器不支持获取位置信息')
        return;
    }
    location.getCurrentPosition(showMap, error);
}

</script>

<style scoped>

</style>