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
import {provide} from "vue";

let props = defineProps(['data']);


</script>

<style scoped>

</style>