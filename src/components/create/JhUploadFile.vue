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
        <el-select v-model="model.input"
                   :multiple="true"
                   @visible-change="selectFileNameRule"
                   placeholder="选择文件命名格式">
            <el-option
                v-for="item in model.options"
                :key="item"
                :label="item"
                :value="item"
            />
        </el-select>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import {ElMessage} from "element-plus";
import {watch} from "vue";
import {useSurvey} from "../../store/survey";

let props = defineProps(['model'])
const survey = useSurvey();
function selectFileNameRule(val) {
    if (val) {
        props.model.options = [];
        survey['components'].forEach(component => {
            if (component.cname === 'jh-text-input') {
                props.model.options.push(component.title)
            }
        })
        props.model.options.push("原始文件名")
    }
}
function cannotTobeClick() {
    ElMessage.info({
        message: "此控件由问卷填写人上传",
        showClose: true,
        duration: 2000,
    });
}
</script>

<style scoped>

:deep(.el-select) {
    width: 100%;
}
</style>