<template>
    <component-submit-frame :data="data">
        <el-radio-group style="width: 100%" v-model="data.input">
            <el-radio style="width: 100%" v-for="(option,index) in data.options" :label="option">
                <read-only-text :data="option"/>
            </el-radio>
        </el-radio-group>
    </component-submit-frame>

</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

import ReadOnlyText from "../other/cmp/ReadOnlyText.vue";
import {onMounted} from "vue";

let props = defineProps(['data']);
onMounted(() => {
    if ('string' === typeof props.data.options) {
        props.data.options = JSON.parse(props.data.options);
    }
})

</script>

<style scoped>

</style>