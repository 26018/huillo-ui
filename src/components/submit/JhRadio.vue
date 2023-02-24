<template>
    <component-submit-frame :data="data">
        <el-radio-group style="width: 100%" v-model="data.input">
            <el-radio v-for="(option,index) in data.options" :label="option">
                <text-read :pre="false" :text="option"/>
            </el-radio>
        </el-radio-group>
    </component-submit-frame>

</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";
import {onMounted} from "vue";
import TextRead from "../other/cmp/TextRead.vue";

let props = defineProps(['data']);
onMounted(() => {
    if ('string' === typeof props.data.options) {
        props.data.options = JSON.parse(props.data.options);
    }
})

</script>

<style scoped>

:deep(.el-radio) {
    align-items: flex-start;
    height: auto;
    width: 100%;
    /*border: 1px solid red;*/
}

:deep(.el-radio__input) {
    /*border: 1px solid red;*/
    padding: 10px 0;
}
:deep(.el-radio__label) {
    white-space: normal;
    /*border: 1px solid rebeccapurple;*/
}


</style>