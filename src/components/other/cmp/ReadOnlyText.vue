<template>
    <pre :style="{fontSize:size,margin:'4px 0',width:'100%',whitespace:'break-spaces',fontFamily:'微软雅黑'}">{{ data }}</pre>
</template>

<script setup>
defineProps(['data', 'size']);
</script>

<style scoped>

</style>