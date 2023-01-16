<template>
    <div class="component-create">
        <el-scrollbar>
            <draggable :list="template" @end="moveEnd" :move="moving" handle=".move" item-key="template"
                       animation="300">
                <template #item="{ element }">
                    <component :is="element.cname" :model="element" @removeItem="removeItem"/>
                </template>
            </draggable>

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
import store from "../../../store";
import {mapState} from "vuex";

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

    computed: {
        ...mapState('questionnaire', ['template'])
    },

    created() {
        this.setIndex(this.template);
    },

    watch:{
        template: {
            handler(n) {
                localStorage.setItem('template', JSON.stringify(n));
            },
            deep: true,
        },

    },

    methods: {
        removeItem(data) {
            store.commit('questionnaire/REMOVE_ITEM', data);
        },
        moveEnd(data) {
            this.setIndex(this.template);
        },

        setIndex(list) {
            let len = list.length;
            for (let i = 0; i < len; i++) {
                list[i].sequence = i;
            }
        },

        moving(e) {
            return e.relatedContext.sequence !== 0
        },
    },
}

</script>

<style scoped>
.component-create {
    width: 700px;
    margin: 0 10px;
    box-sizing: border-box;
    height: calc(100vh - 50px);
    overflow: auto;
    background-color: white;
}

:deep(.el-scrollbar__thumb) {
    max-width: 2px;
}
</style>