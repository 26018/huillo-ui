<template>
    <component-submit-frame :data="data">

            <el-date-picker v-model="data.input"></el-date-picker>

    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {provide} from "vue";
let props = defineProps(['data']);

</script>

<style scoped>

</style>