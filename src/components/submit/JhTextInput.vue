<template>
    <component-submit-frame :data="data">
        <el-input v-model="data.input"/>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";
import {provide} from "vue";

let props = defineProps(['data']);

function re() {
    console.log("remove")
}
</script>

<style scoped>

</style>