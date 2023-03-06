<template>
    <div class="component-create" id="create">
        <el-scrollbar class="scrollbar">
            <component style="margin-top: 8px" :is="questionnaire.cname" :model="questionnaire"/>
            <draggable class="ccv" :list="questionnaire.components" @end="moveEnd" handle=".move" item-key="template"
                       animation="300">
                <template #item="{ element }">
                    <component :is="element.cname" :model="element" @removeItem="removeItem"/>
                </template>
            </draggable>
            <div>
                <div id="copyright" @click="goToHome">Powered by Lsk</div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import JhHead from '../../create/JhHead.vue';
import JhUploadFile from "../../create/JhUploadFile.vue";
import JhDownloadFile from '../../create/JhDownloadFile.vue'
import JhDropdownSelect from '../../create/JhDropdownSelect.vue'
import JhTextInput from "../../create/JhTextInput.vue";
import JhMulti from "../../create/JhMulti.vue";
import JhRadio from "../../create/JhRadio.vue";
import JhLocation from '../../create/JhLocation.vue'
import JhRate from "../../create/JhRate.vue";
import JhDateInput from '../../create/JhDateInput.vue'
import JhTextareaInput from "../../create/JhTextareaInput.vue";
import {useSurvey} from "../../../store/survey";
import {navTo, refreshComponentIndex} from "../../../api/util";
import TextInput from "./TextInput.vue";
import router from "../../../router";

export default {
    components: {
        TextInput,
        draggable,
        JhHead,
        JhMulti,
        JhRadio,
        JhUploadFile,
        JhDropdownSelect,
        JhDownloadFile,
        JhDateInput,
        JhTextInput,
        JhTextareaInput,
        JhLocation,
        JhRate
    },

    created() {
        this.questionnaire = useSurvey();
        refreshComponentIndex(this.questionnaire['components'])
    },
    data() {
        return {
            questionnaire: {}
        }
    },


    methods: {
        navTo,
        // fromEditPage() {
        //     let edit = localStorage.getItem('edit-template');
        //     if (edit != null) {
        //         return JSON.parse(edit);
        //     }
        //     return null;
        // },
        removeItem(data) {
            for (let i = 0; i < this.questionnaire['components'].length; i++) {
                const component = this.questionnaire['components'][i];
                if (component === data) {
                    this.questionnaire['components'].splice(i, 1);
                }
            }
            refreshComponentIndex(this.questionnaire['components'])
        },
        moveEnd(data) {
            refreshComponentIndex(this.questionnaire['components'])
        },
        goToHome() {
            window.open('https://github.com/26018')
        },
    },
}

</script>

<style scoped>
.component-create {
    max-width: 1000px;
    width: 700px;
    min-width: 400px;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    margin: 0 10px;
    box-sizing: border-box;
    overflow: auto;
    background-color: white;
}

:deep(.el-scrollbar__view) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.el-scrollbar__view>*):last-child {
    margin-top: auto;
}

#copyright {
    height: 30px;
    display: flex;
    align-items: center;
    color: gray;
    font-size: 14px;
    justify-content: center;
}

#copyright:hover {
    color: black;
    user-select: none;
    cursor: pointer;
}


:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}

</style>