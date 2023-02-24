<template>
    <div style="width: 100%;overflow: auto">
        <div class="container">
            <jh-card min-width="180px">
                <div class="card-title">已上传文件</div>
                <div>
                    <span class="number green">{{ uploadFileList.length }}</span>
                    <span>份</span>
                </div>
            </jh-card>

            <jh-card min-width="540px" style="margin: 0 8px">
                <div class="zanyong">
                    <div style="display: flex;flex-direction: column">
                        <div class="card-title">占用存储</div>
                        <div>
                            <span class="number red">{{ fileInfo.totalSize[0] }}</span>
                            <span>{{ fileInfo.totalSize[1] }}</span>
                        </div>
                    </div>
                    <div class="">
                        <div class="card-title">{{ fileInfo.imageSize[0] }}{{ fileInfo.imageSize[1] }}</div>
                        <div class="font-deyihei">图片类型</div>
                    </div>

                    <div class="">
                        <div class="card-title">{{ fileInfo.documentSize[0] }}{{ fileInfo.documentSize [1] }}</div>
                        <div class="font-deyihei">文档类型</div>
                    </div>

                    <div class="">
                        <div class="card-title">{{ fileInfo.otherSize[0] }}{{ fileInfo.otherSize[1] }}</div>
                        <div class="font-deyihei">其他类型</div>
                    </div>
                </div>
            </jh-card>

            <jh-card style="flex: 1;" padding="0">
                <div class="percentage">
                    <div>{{ percentage + "%" }} <span
                        style="user-select: none;font-size: 16px;background-color: transparent;margin-left: 24px;">{{
                            "总额:50MB"
                        }}</span></div>
                </div>
            </jh-card>
        </div>
        <jh-card style="margin-top: 8px">
            <el-table :border="true" :data="uploadFileList" style="width: 100%">
                <el-table-column prop="surveyTitle" label="问卷" width="200"/>
                <el-table-column :show-overflow-tooltip="true" prop="title" label="名称" width="180"/>
                <el-table-column prop="size" label="大小"/>
                <el-table-column prop="md5" width="300" label="md5"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button link @click="fileDownload(scope.row)" type="primary">下载
                        </el-button>
                        <el-button link @click="deleteUserFile(scope.row.id)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </jh-card>

    </div>
</template>

<script setup>
import JhCard from "../components/other/cmp/JhCard.vue";

import {computed, onMounted, ref} from "vue";
import {userFile_delete, userFile_download, userFile_space} from "../api/UserFile";
import {download, transformFileSize} from "../api/util";
import {ElMessage} from "element-plus";

let uploadFileList = ref([])
let percentage = ref("0%")
let percentageStyle = ref("linear-gradient(90deg, #13ce66, #13ce66 " + percentage.value + ", transparent 0)");

onMounted(() => {
    userFile_space().then(res => {
        uploadFileList.value = res.data.data;
    });
});

const fileInfo = computed(() => {
    let total = 0;
    let imageSize = 0;
    let documentSize = 0;
    let otherSize = 0;
    uploadFileList.value.forEach(file => {
        let fileSize = parseInt(file.size);
        total += fileSize;
        // 计算各种类型
        if (exist(file.title, ['.png', '.jpg'])) {
            imageSize += fileSize;
        } else if (exist(file.title, ['.word'])) {
            documentSize += fileSize;
        } else {
            otherSize += fileSize;
        }
    })
    // 计算百分比 50MB
    let all = 50 * 1024 * 1024
    percentage.value = (total / all * 100).toFixed(2);
    let backColor = ""
    if (percentage.value > 80) {
        backColor = 'red'
    } else if (percentage.value > 50) {
        backColor = 'yellow'
    } else {
        backColor = '#13ce66'
    }
    percentageStyle.value = "linear-gradient(90deg, " + backColor + ", " + backColor + " " + percentage.value + "%" + ", transparent 0)";

    return {
        totalSize: transformFileSize(total),
        imageSize: transformFileSize(imageSize),
        documentSize: transformFileSize(documentSize),
        otherSize: transformFileSize(otherSize),
    };
});

function fileDownload(fileObject) {
    userFile_download(fileObject).then(res => {
        if (res.status === 200) {
            ElMessage.success("下载成功")
            download(res.data, null, fileObject.title)
        } else {
            ElMessage.error("下载出错," + res.data.message);
        }
    });
}

function exist(source, arr) {
    let count = 0;
    arr.forEach(a => {
        count++;
        if (source.includes(a)) {
            return true;
        }
    });
    return count === arr.length;
}

function deleteUserFile(id) {
    userFile_delete(id).then(res => {
        if (res.data.code === 200) {
            ElMessage.success("删除成功");
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    });
}

</script>

<style scoped>

.card-title {
    font-size: 20px;
    font-weight: 600;
    font-family: siyuan, sans-serif;
}

.container {
    display: flex;
    overflow: auto;
    box-sizing: border-box;
}

.zanyong {
    display: flex;
    align-items: center;
}

.zanyong > * {
    margin-right: 32px;
    margin-left: 32px;
    box-sizing: border-box;
}

.number {
    font-size: 40px;
    font-weight: 600;
}

.font-deyihei {
    font-family: deyihei, serif;
}

.percentage {
    font-size: 32px;
    font-family: deyihei, sans-serif;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    flex: 1;
    border-radius: 16px;
    background-image: v-bind("percentageStyle")
}

::-webkit-scrollbar {
    display: none;
}

</style>