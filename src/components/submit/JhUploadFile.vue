<template>
    <component-submit-frame :data="data">
        <el-upload
            class="upload-demo" drag action="" :auto-upload="false"
            :on-change="pushFile" :file-list="userFile.uploadFileList" multiple>
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
import SparkMD5 from "spark-md5";
import {useUserFile} from "../../store/userfile";
import {onMounted} from "vue";

let props = defineProps(['data']);
let userFile = useUserFile();

onMounted(()=>{
    userFile.uploadFileList = [];
})

function pushFile(file, fileList) {
    userFile.uploadFileList = fileList;
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