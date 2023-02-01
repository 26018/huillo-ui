<template>
    <component-submit-frame :data="data">
        <el-upload
            class="upload-demo" drag action="" :http-request="uploadFile"
            :on-change="pushFile" :file-list="userFileList" multiple>
            <el-icon class="el-icon--upload">
                <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
                拖拽或 <em>点击上传</em>
            </div>
        </el-upload>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {userFile_upload} from "../../api/UserFile";
import {ElMessage} from "element-plus";
import SparkMD5 from "spark-md5";

let props = defineProps(['data']);
let userFileList = [];
function uploadFile(params) {
    params.userFileList = userFileList;
    userFile_upload(params).then(res => {
        if (res.data.code == 200) {
            // params.input = "上传成功"
            params.optional = true;
            ElMessage.success("上传成功");
            return;
        }
    });
    userFileList = [];
}

function pushFile(file, fileList) {
    userFileList = fileList;
    // TODO 上传Id
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file.raw);
    if (props.data.input == null) {
        props.data.input = [];
    }
    fileReader.onloadend = e => {
        const md5 = SparkMD5.hashBinary(e.target.result);
        props.data.input.push(md5)
    };
}

</script>

<style scoped>

</style>