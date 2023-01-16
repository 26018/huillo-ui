<template>
    <component-submit-frame :data="data">
        <el-upload
            class="upload-demo" drag action="" multiple>
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

let props = defineProps(['data']);

</script>

<style scoped>

</style>