<template>
    <component-create-frame :model="model">
        <el-date-picker v-model="model.preselectedAnswer"></el-date-picker>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";

let props = defineProps(['model'])

</script>

<style scoped>

</style>