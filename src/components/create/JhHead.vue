<template>
    <component-create-frame :model="model"/>
</template>

<script setup>

import ComponentCreateFrame from "../other/frame/ComponentCreateFrame.vue";

let props = defineProps(['model'])

</script>

<style scoped>

.head-input :deep(*) {
    font-size: 32px;
}
</style>