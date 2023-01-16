<template>
    <component-submit-frame :data="data">
        <div style="display: flex;justify-content: center">
            <el-rate v-model="data.input" :show-score="true" size="large"></el-rate>
        </div>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {provide} from "vue";

let props = defineProps(['data']);


</script>

<style scoped>

</style>