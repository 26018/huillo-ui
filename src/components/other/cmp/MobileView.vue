<template>
<div v-if="isMobileWidth()">
    <slot></slot>
</div>
</template>

<script setup>
function isMobileWidth() {
    return window.screen.width <= 600
}
</script>

<style scoped>

</style>