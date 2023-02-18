<template>
    <component-create-frame :model="model">
        <el-upload action="#" :on-change="pushFile" :auto-upload="false" :file-list="userfile.downloadFileList"
                   multiple>
            <el-button style="width: 100%" type="primary">点击上传文件</el-button>
        </el-upload>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";

import SparkMD5 from "spark-md5";
import {onMounted} from "vue";
import {useUserFile} from "../../store/userfile";
import { fi } from "element-plus/es/locale";

let props = defineProps(['model'])

let userfile = useUserFile();

onMounted(() => {
    // 因为浏览器每次刷新都会丢失上传的文件数据，所以清空downloadFileList
    userfile.downloadFileList = []
    props.model.options = [];
})

function pushFile(file, fileList) {
    userfile.downloadFileList = fileList;
    // 每次文件列表变化时，计算md5值
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file.raw);
    fileReader.onloadend = e => {
        const md5 = SparkMD5.hashBinary(e.target.result);
        console.log('add',file.raw.name)
        props.model.options.push({
            md5, name: file.raw.name, size: file.raw.size
        })
    }
}

</script>

<style scoped>
:deep(.el-upload) {
    width: 100%;
}
</style>