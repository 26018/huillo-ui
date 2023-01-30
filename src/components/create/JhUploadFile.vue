<template>
    <component-create-frame :model="model">
        <el-upload disabled @click="cannotTobeClick"
                   class="upload-demo" drag action="" multiple>
            <el-icon class="el-icon--upload">
                <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
                拖拽或 <em>点击上传</em>
            </div>
        </el-upload>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {ElMessage} from "element-plus";

let props = defineProps(['model'])

function cannotTobeClick() {
    ElMessage.info({
        message: "此控件由问卷填写人上传",
        showClose: true,
        duration: 2000,
    });
}
</script>

<style scoped>

</style>