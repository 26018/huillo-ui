<template>
    <div class="component-create">
        <el-scrollbar class="scrollbar">
            <component :is="questionnaire.cname" :model="questionnaire"/>
            <draggable class="ccv" :list="questionnaire.components" @end="moveEnd" handle=".move" item-key="template"
                       animation="300">
                <template #item="{ element }">
                    <component :is="element.cname" :model="element" @removeItem="removeItem"/>
                </template>
            </draggable>
            <div>
                <div id="copyright">Powered by Lsk</div>
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
import {useSurvey} from "../../../store/survey";

export default {
    components: {
        draggable,
        JhHead,
        JhMulti,
        JhRadio,
        JhUploadFile,
        JhDropdownSelect,
        JhDownloadFile,
        JhDateInput,
        JhTextInput,
        JhLocation,
        JhRate
    },

    created() {
        this.questionnaire = useSurvey();
        this.setIndex(this.questionnaire.components);
    },
    data() {
        return {
            questionnaire: {}
        }
    },

    methods: {
        removeItem(data) {
            for (let i = 0; i < this.questionnaire['components'].length; i++) {
                const component = this.questionnaire['components'][i];
                if (component === data) {
                    this.questionnaire['components'].splice(i, 1);
                }
            }
        },
        moveEnd(data) {
            this.setIndex(this.questionnaire.components);
        },
        setIndex(list) {
            if (list == null) {
                return
            }
            let len = list.length;
            for (let i = 1; i <= len; i++) {
                list[i - 1].sequence = i;
            }
        },
    },
}

</script>

<style scoped>
.component-create {
    max-width: 800px;
    min-width: 600px;
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
}


:deep(.el-scrollbar__thumb) {
    max-width: 2px;
    margin-left: auto;
}

</style>