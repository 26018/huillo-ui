<template>
    <div style="display: block">
        <div class="text-read">
            <span class="prefix"><slot name="prefix"></slot></span>
            <div class="pre-clear">{{ text }}<span class="suffix"><slot name="suffix"></slot></span></div>
        </div>
    </div>
</template>

<script setup>

import {onMounted} from "vue";

let props = defineProps(['text', 'fontSize', 'pre']);
onMounted(() => {
    console.log(props.pre)
})

</script>

<style scoped>
.text-read {
    width: 100%;
    display: flex;
    margin: 2px 0;
    padding: 4px;
    font-size: v-bind(fontSize) !important;
}

pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    *word-wrap: break-word;
    *white-space: normal;
    padding: 0;
    margin: 0;
    font-family: siyuan, sans-serif;
    border: 1px solid red;
    width: 100%;
}

.pre-clear {
    width: 100%;
    white-space: v-bind('props.pre?' pre-wrap ':' normal '');
}


</style>