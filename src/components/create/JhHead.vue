<template>
    <component-frame :model="model"/>
</template>

<script setup>
import ComponentFrame from "../other/frame/ComponentCreateFrame.vue";

let props = defineProps(['model'])

</script>

<style scoped>

.head-input :deep(*) {
    font-size: 32px;
}

</style>