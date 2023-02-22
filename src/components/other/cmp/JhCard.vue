<template>
    <div>
        <div class="card" :style="{
                width:width,
                height:height,
                minWidth:minWidth,padding:padding,
                borderRadius:borderRadius}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "JhCard",
    props: ['width', 'height', 'minWidth', 'padding', 'borderRadius'],
}
</script>

<style scoped>
.card {
    border: 1px solid gainsboro;
    border-radius: 16px;
    box-sizing: border-box;
    height: 100%;
    padding: 24px;
}
</style>