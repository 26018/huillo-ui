<template>
    <div class="preview">
        <el-scrollbar>
            <component :is="survey.cname" :data="survey"/>
            <div style="width: 98%;box-sizing: border-box" v-for="(t,index) in survey.components">
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
* {
    background-color: white;
}

.preview {
    display: flex;
    min-width: 380px;
    max-width: 380px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

@media screen and (max-width: 900px){
    .preview{
        display: none;
    }
}

:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}


</style>