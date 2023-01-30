<template>
    <component-create-frame :model="model">
        <el-upload action="#" :http-request="uploadFile" :on-change="pushFile"
                   :file-list="userFileList" multiple>
            <el-button style="width: 100%" type="primary">点击上传文件</el-button>
        </el-upload>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {ElMessage} from "element-plus";
import {userFile_upload} from "../../api/UserFile";
import SparkMD5 from "spark-md5";
import {onMounted} from "vue";

let props = defineProps(['model'])
let userFileList = [];

onMounted(()=>{
    userFileList = []
})

function uploadFile(params) {
    params.userFileList = userFileList;
    userFile_upload(params).then(res => {
        if (res.data.code == 200) {
            ElMessage.success("上传成功");
            return;
        }
    });
    userFileList = [];
}

function pushFile(file, fileList) {
    userFileList = fileList;
    // TODO 每次文件列表变化时，计算md5值
    props.model.options = [];
    props.model.value = fileList;
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file.raw);
    fileReader.onloadend = e => {
        const md5 = SparkMD5.hashBinary(e.target.result);
        props.model.options.push(md5)
    }
}

</script>

<style scoped>

</style>