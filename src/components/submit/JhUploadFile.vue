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
        <div style="font-size: 14px;color: gray">您上传的文件将会以 <span style="color: #13ce66">{{
                fileNameRule
            }}</span> 格式命名
        </div>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import SparkMD5 from "spark-md5";
import {useUserFile} from "../../store/userfile";
import {onMounted, ref, watch} from "vue";

let props = defineProps(['data']);
let userFile = useUserFile();
let fileNameRule = ref("")

watch(props.data, () => {
    fileNameRule.value = '';
    let arr = props.data.mode
    arr.forEach(op => {
        fileNameRule.value += op + " + "
    });
    fileNameRule.value = fileNameRule.value.substring(0, fileNameRule.value.lastIndexOf("+"))
})

onMounted(() => {
    userFile.uploadFileList = [];
    if (props.data.input != null && typeof props.data.input === 'string') {
        props.data.input = JSON.parse(props.data.input.toString());
    }
    if (props.data.input == null) {
        props.data.input = [];
    }
    console.log(props.data.mode)
    if (typeof props.data.mode === 'string') {
        props.data.mode = JSON.parse(props.data.mode);
    }
    props.data.mode.forEach(op => {
        fileNameRule.value += op + " + "
    });
    fileNameRule.value = fileNameRule.value.substring(0, fileNameRule.value.lastIndexOf("+"));
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