<template>
    <component-create-frame :model="model">
        <el-input type="textarea" :autosize="true"></el-input>
    </component-create-frame>
</template>

<script setup>
import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";
import TextInput from "../other/cmp/TextInput.vue";
let props = defineProps(['model'])

</script>

<style scoped>

</style>