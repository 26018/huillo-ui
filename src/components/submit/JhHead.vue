<template>
    <component-submit-frame :data="data"/>
</template>

<script setup>
import ComponentSubmitFrame from "../other/frame/ComponentSubmitFrame.vue";

let props = defineProps(['data']);

</script>

<style scoped>
.line {
    border: 1px solid red;
}

.title {
    font-size: 30px;
    padding: 0;
    margin: 0;
    outline: none;
    border: 0;
}

</style>