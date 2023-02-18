<template>
    <component-submit-frame :data="data">
        <read-only-text style="margin-top: 8px;background-color: rgba(243,246,249);border-radius: 4px;box-sizing: border-box;padding: 4px" size="14px" :data="locatonText"/>
        <el-button style="width: 100%" type="primary" @click="getLocation">点击获取位置</el-button>
    </component-submit-frame>
</template>

<script setup>

import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {ElMessage} from "element-plus";
import {computed, onMounted, reactive} from "vue";
import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";

 
let props = defineProps(['data']);

let userLocation = reactive({
    data: {}
});

const locatonText = computed(()=>{
    if(props.data.preselectedAnswer == null || props.data.preselectedAnswer.length == 0){
        return "暂无位置信息"
    }
    // todo 查询坐标api，将经纬度变为位置信息
    let location  = "武侯区环球中心"
    return '您当前在'+location+"附近"
})

onMounted(()=>{
    console.log(props.data)
    // console.log("props:",props.data)
    // console.log("location:",userLocation.data)
})

function showMap(position) { //.强调coords
    props.data.preselectedAnswer = [position.coords.latitude,position.coords.longitude]
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