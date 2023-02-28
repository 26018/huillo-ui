<template>
  <component-submit-frame :data="data">
    <div v-for="file in data.options">
      <div style="font-size: 14px;display: flex;align-items: center;justify-content: space-between;margin: 2px 0;">
        <div
          style=" overflow: hidden;white-space: nowrap;max-width: 80%;text-overflow: ellipsis;"> {{ file.name }}
        </div>
        <div> {{ transformFileSize(file.size)[0] + transformFileSize(file.size)[1] }} </div>
      </div>
    </div>

    <el-button
      style="width: 100%;margin-top: 4px;"
      type="primary"
      @click="downloadFiles(data.options)"
      >下载全部文件</el-button
    >
  </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import { onMounted } from "vue";
import { userFile_download } from "../../api/UserFile";
import { ElMessage } from "element-plus";
import { download, transformFileSize } from "../../api/util";

let props = defineProps(["data"]);
onMounted(() => {
  props.data.optional = true;
  if (
    props.data.options != null &&
    typeof props.data.options !== "object" &&
    props.data.options.length > 0
  ) {
    props.data.options = JSON.parse(props.data.options);
  }
});

function downloadFiles(fileList) {
  let downloadFileCount = 0;
  fileList.forEach((file) => {
    userFile_download(file).then((res) => {
      if (res.status === 200) {
        downloadFileCount = downloadFileCount + 1;
        if (downloadFileCount === fileList.length) {
          ElMessage.success("文件全部下载成功");
        }
      }
      download(res.data, null, file.name);
    });
  });
}
</script>

<style scoped>
</style>