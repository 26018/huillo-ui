<template>
    <div v-if="isPcWidth()">
        <slot></slot>
    </div>
</template>

<script setup>

function isPcWidth() {
    return window.screen.width > 600
}

</script>

<style scoped>

</style>