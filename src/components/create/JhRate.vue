<template>
    <component-create-frame :model="model">
        <div style="display: flex;justify-content: center">
            <el-rate v-model="model.preselectedAnswer" :show-score="true" size="large"></el-rate>
        </div>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";

let props = defineProps(['model'])

</script>

<style scoped>

</style>