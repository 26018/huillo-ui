<template>
    <!--查看提交的问卷详情-->
    <div>
        <div style=";display: flex;align-items: center;height: 40px">
            <el-icon style="cursor: pointer" :size="24" @click="navTo(-1)">
                <ArrowLeft />
            </el-icon>
            <div style="font-size: 24px;margin-left: 8px">提交详情</div>
        </div>
        <div style="max-width: 600px;height: calc(100% - 42px);margin:0 auto;overflow: auto;">
            <el-scrollbar>
                <component :is="questionnaire.cname" :data="questionnaire" />
                <div style="width: 100%;box-sizing: border-box" v-for="(t, index) in questionnaire.components">
                    <component :is="t.cname" :data="t" />
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import JhHead from '../../components/submit/JhHead.vue';
import JhTextInput from "../../components/submit/JhTextInput.vue";
import JhTextareaInput from "../../components/submit/JhTextareaInput.vue";
import JhMulti from "../../components/submit/JhMulti.vue";
import JhRadio from "../../components/submit/JhRadio.vue";
import JhRate from '../../components/submit/JhRate.vue';
import JhLocation from '../../components/submit/JhLocation.vue'
import JhDateInput from '../../components/submit/JhDateInput.vue'
import JhDropdownSelect from '../../components/submit/JhDropdownSelect.vue'
import JhDownloadFile from '../../components/submit/JhDownloadFile.vue';
import JhUploadFile from '../../components/submit/JhUploadFile.vue';
import { navTo } from "../../api/util";

export default {
    methods: { navTo },
    props: ['id'],
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
    data() {
        return {
            questionnaire: {},
        };
    },
    created() {
        axios.get('/submission/' + this.$route.params.id).then(res => {
            this.questionnaire = res.data.data
        });
    },

}
</script>

<style scoped>
:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}
</style>