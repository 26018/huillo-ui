<template>
    <div style="width: 400px;box-sizing: border-box;overflow: auto">
        <el-scrollbar>
            <div style="width: 98%;box-sizing: border-box" v-for="(t,index) in template">
                <component :is="t.cname" :data="t"/>
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
import {mapState} from "vuex";
import {ElMessage} from "element-plus";

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
    computed: {
        ...mapState('questionnaire', ['template'])
    },

    created() {
        // TODO 调换顺序之后，index不会变化
        // let len = this.template.length;
        // for (let i = 0; i < len; i++) {
        //     this.template[i].index = i;
        // }
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

:deep(.el-scrollbar__thumb) {
    max-width: 2px;
}
</style>