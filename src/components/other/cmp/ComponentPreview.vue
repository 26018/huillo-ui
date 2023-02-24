<template>
    <div class="preview">
        <el-scrollbar>
            <component :is="survey.cname" :data="survey"/>
            <div v-for="(t,index) in survey.components">
                <component :is="t.cname" :data="t" :key="index"/>
            </div>
            <div style="display: flex;justify-content: center">
                <el-button style="margin: 16px auto" @click="PreviewSubmit" type="primary">提交</el-button>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>

import JhHead from '../../submit/JhHead.vue';
import JhTextInput from "../../submit/JhTextInput.vue";
import JhTextareaInput from "../../submit/JhTextareaInput.vue";
import JhMulti from "../../submit/JhMulti.vue";
import JhRadio from "../../submit/JhRadio.vue";
import JhRate from '../../submit/JhRate.vue';
import JhLocation from '../../submit/JhLocation.vue'
import JhDateInput from '../../submit/JhDateInput.vue'
import JhDropdownSelect from '../../submit/JhDropdownSelect.vue'
import JhDownloadFile from '../../submit/JhDownloadFile.vue';
import JhUploadFile from '../../submit/JhUploadFile.vue';
import {ElMessage} from "element-plus";
import {useSurvey} from "../../../store/survey";

export default {
    components: {
        JhHead,
        JhMulti,
        JhRadio,
        JhDownloadFile,
        JhUploadFile,
        JhDropdownSelect,
        JhTextInput,
        JhTextareaInput,
        JhRate,
        JhLocation,
        JhDateInput
    },

    created() {
        this.survey = useSurvey();
    },
    data() {
        return {
            survey: {},
        }
    },

    methods: {
        PreviewSubmit() {
            ElMessage.info({
                message: "预览窗口，无法提交",
                showClose: true,
            })
        },
    },
}

</script>

<style scoped>

.preview {
    display: flex;
    min-width: 380px;
    max-width: 380px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 8px;
    background-color: white;
}

.component-frame {
    border-bottom: 2px dashed rgba(220 220 220);
    box-sizing: border-box;
    margin: 4px 32px;
    padding: 24px 0;
}

@media screen and (max-width: 900px) {
    .preview {
        display: none;
    }
}

:deep(.el-scrollbar) {
    width: 100%;
}

:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}

:deep(.el-scrollbar__view) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.el-scrollbar__view) > *:last-child {
    margin-top: auto;
}

</style>