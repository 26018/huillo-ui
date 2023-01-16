<template>
    <component-create-frame :model="model">
        <read-only-text
            style="background-color: rgba(243,246,249);border-radius: 4px;box-sizing: border-box;padding: 4px"
            :data="'您当前在：'+locationDetail"/>
        <el-button style="width: 100%;margin-top: 4px" type="primary" @click="getLocation">点击获取位置</el-button>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {ElMessage} from "element-plus";
import {provide, reactive, ref} from "vue";
import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";

let props = defineProps(['model'])


let userLocation = reactive({
    data: {}
});

let locationDetail = ref("");

function showMap(position) { //.强调coords
    userLocation.data = position;
    locationDetail.value = userLocation.data.coords.latitude + "\t" + userLocation.data.coords.longitude;
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