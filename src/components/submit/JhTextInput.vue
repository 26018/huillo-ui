<template>
    <component-submit-frame :data="data">
        <el-input v-model="data.input"/>
    </component-submit-frame>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

let props = defineProps(['data']);

</script>

<style scoped>

</style>