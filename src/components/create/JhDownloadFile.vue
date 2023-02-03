<template>
    <component-create-frame :model="model">
        <el-upload action="#" :http-request="uploadFile" :on-change="pushFile" :file-list="userFileList" multiple>
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
import axios from "axios";

let props = defineProps(['model'])
let userFileList = [];

onMounted(() => {
    userFileList = []
    props.model.options = [];
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

// function uploadFile() {
//     let formData = new FormData();
//
//     userFileList.forEach(file=>{
//         formData.append("files", file.raw);
//     })
//
//     let json = {id: 257248};
//     let string = JSON.stringify(json);
//     let blob = new Blob([string], {type: "application/json"});
//     formData.append("json", blob)
//
//     axios.post("http://localhost/questionnaire/test/file", formData).then(res => {
//         console.log(res.data)
//     });
// }


function pushFile(file, fileList) {
    userFileList = fileList;
    // TODO 每次文件列表变化时，计算md5值
    props.model.options = [];
    props.model.value = fileList;
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file.raw);
    fileReader.onloadend = e => {
        const md5 = SparkMD5.hashBinary(e.target.result);
        props.model.options.push({
            md5,
            name: file.raw.name,
            size: file.raw.size
        })
    }
}

</script>

<style scoped>
:deep(.el-upload) {
    width: 100%;
}
</style>