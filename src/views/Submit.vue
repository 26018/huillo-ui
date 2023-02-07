<template>
       <div class="submit">
           <el-scrollbar>
               <component :is="questionnaire.cname" :data="questionnaire"/>
               <div style="width: 98%;box-sizing: border-box" v-for="(t,index) in questionnaire.components">
                   <component :is="t.cname" :data="t"/>
               </div>
               <div style="display: flex;justify-content: center">
                   <el-button style="margin: 16px auto" @click="submit" type="primary">提交</el-button>
               </div>
           </el-scrollbar>
       </div>
</template>

<script>
import {questionnaire_getById, questionnaire_submit} from "../api/questionnaire";
import JhHead from '../components/submit/JhHead.vue';
import JhTextInput from "../components/submit/JhTextInput.vue";
import JhMulti from "../components/submit/JhMulti.vue";
import JhRadio from "../components/submit/JhRadio.vue";
import JhRate from '../components/submit/JhRate.vue';
import JhLocation from '../components/submit/JhLocation.vue'
import JhDateInput from '../components/submit/JhDateInput.vue'
import JhDropdownSelect from '../components/submit/JhDropdownSelect.vue'
import JhDownloadFile from '../components/submit/JhDownloadFile.vue';
import JhUploadFile from '../components/submit/JhUploadFile.vue';
import {ElMessage} from "element-plus";
import {useUserFile} from "../store/userfile";
import {addJsonAndFile} from "../api/util";

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
    data() {
        return {
            questionnaireId: "",
            questionnaire: {}
        }
    },
    created() {
        this.questionnaireId = this.$route.params.id;
        // TODO 查询问卷
        questionnaire_getById(this.questionnaireId).then(res => {
            this.questionnaire = res.data.data;
            console.log(this.questionnaire);
        });
    },
    methods: {
        submit: function () {
            // // TODO 提交到后台
            let submitDTO = {
                id: Number,
                cname: String,
                optional: Boolean,
                components: []
            }
            submitDTO.id = this.questionnaireId;
            this.questionnaire.components.forEach(cp => {
                let obj = {};
                obj.id = cp.id;
                obj.optional = cp.optional
                obj.cname = cp.cname
                obj.input = cp.input
                submitDTO.components.push(obj);
            })
            let userFile = useUserFile();
            let jsonAndFile = addJsonAndFile(submitDTO, 'submitSurvey', userFile.uploadFileList, 'uploadFiles');
            questionnaire_submit(jsonAndFile).then(res => {
                if (res.data.code === 200) {
                    ElMessage.success("提交成功");
                }
            });
            userFile.uploadFileList = []
        }
    }
}
</script>

<style scoped>
:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}

.submit {
    max-width: 600px;
    margin: 0 auto;
    height: 100vh;
    background-color: transparent;
    border-left: 1px solid gainsboro;
    border-right: 1px solid gainsboro;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>