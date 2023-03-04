<template>
    <div
        id="sharelink"
        style="
        display: flex;align-items: center;max-width: 400px;
        width: 100%;height: 30px;margin-bottom: 8px;
        box-shadow: 0 0 0 1px #dcdfe6 inset;padding:4px 8px;
        border-radius: 4px;">
        <div @click="navTo(link)" class="shareLink">{{ link }}</div>
        <el-button class="btn" style="margin-left: auto;padding-left: 8px"
                   type="primary" link size="small"
                   data-clipboard-target="#sharelink">复制
        </el-button>
    </div>
    <div class="image-container">
        <div>
            <div style="color: white;align-items: center;justify-content: center;margin-left: 8px">
                <div style="font-size: 22px;max-width: 250px">{{ title }}</div>
                <div style="margin-top: 12px">手机扫描二维码填写内容</div>
            </div>
            <div style="margin: 4px;padding: 8px;background: white;border-radius: 8px">
                <div id="qrcode"></div>
            </div>
        </div>
    </div>

</template>

<script setup>

import ClipboardJS from "clipboard";
import {ElMessage} from "element-plus";
import {onMounted, onUnmounted} from "vue";
import {navTo} from "../../../api/util";
import QRCode from 'qrcodejs2-fix'

let props = defineProps(['title', 'link']);

let clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
    ElMessage.success({message: "复制成功", showClose: true})
    e.clearSelection();
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

let qrcode;

onMounted(() => {
    let size = 100;
    qrcode = new QRCode(document.getElementById('qrcode'), {
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
    })
    qrcode.makeCode(props.link);
})

onUnmounted(() => {
    clipboard.destroy();
    qrcode.clear()
})

</script>

<style scoped>
.image-container {
    background-image: url('/src/assets/image_back.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    padding: 0;
    width: 100%;
    height: 100%;
    max-height: 160px;
    outline: none;
}

.image-container > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

:deep(.el-table__row) {
    cursor: pointer;
}

#sharelink > * {
    /*border: 1px solid red;*/
}

.shareLink {
    text-decoration: none;
    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    cursor: pointer;
}

.shareLink:hover {
    color: dodgerblue;
}

</style>