<template>
    <div
        id="sharelink"
        style="
        display: flex;align-items: center;max-width: 300px;
        width: 100%;height: 30px;margin-bottom: 8px;
        box-shadow: 0 0 0 1px #dcdfe6 inset;padding:8px;
        border-radius: 4px;">
        <a :href="link" target="_blank">{{ link }}</a>
        <el-button class="btn" style="margin-left: auto;padding-left: 8px"
                   type="primary" link size="small"
                   data-clipboard-target="#sharelink"
        >复制
        </el-button>
    </div>
    <div class="image-container">
        <div style="color: white;align-items: center;justify-content: center;">
            <p style="font-size: 22px">{{ title }}</p>
            <p>手机扫描二维码填写内容</p>
        </div>
        <el-image style="border-radius: 4px" :src="'data:image/png;base64,'+base64"/>
    </div>
</template>

<script setup>

import ClipboardJS from "clipboard";
import {ElMessage} from "element-plus";
import {onUnmounted} from "vue";

let props = defineProps(['title', 'link', 'base64']);

let clipboard = new ClipboardJS('.btn');
clipboard.on('success', function (e) {
    ElMessage.success({message: "复制成功", showClose: true})
    e.clearSelection();
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

onUnmounted(()=>{
    clipboard.destroy();
})

</script>

<style scoped>
.image-container {
    background-image: url('/src/assets/sea.jpg');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
    border-radius: 4px;
    padding: 4px 8px;
    display: flex;
    width: 100%;
    outline: none;
    justify-content: space-between
}

:deep(.el-table__row) {
    cursor: pointer;
}

a {
    text-decoration: none;

}

</style>