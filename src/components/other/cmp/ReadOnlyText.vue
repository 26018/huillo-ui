<template>
    <div :style="{fontSize:size,margin:'4px 0',width:'100%',whitespace:'break-spaces',fontFamily:'微软雅黑'}">{{ data }}</div>
</template>

<script setup>
defineProps(['data', 'size']);
</script>

<style scoped>

</style>