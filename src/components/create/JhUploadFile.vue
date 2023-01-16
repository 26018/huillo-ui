<template>
    <component-create-frame :model="model">
        <el-upload
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

let props = defineProps(['model'])

</script>

<style scoped>

</style>