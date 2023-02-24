<template>
    <div :style="{fontSize:size,margin:'4px 0',width:'100%',whitespace:'break-spaces',fontFamily:'微软雅黑'}">
        {{ data }}
        <span v-if="required" style="color: red">*</span>
    </div>
</template>

<script setup>
defineProps(['data', 'size', 'required']);
</script>

<style scoped>

</style>