<template>
    <component-create-frame :model="model">
        <el-input v-model="model.preselectedAnswer"/>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
let props = defineProps(['model'])

</script>

<style scoped>

</style>