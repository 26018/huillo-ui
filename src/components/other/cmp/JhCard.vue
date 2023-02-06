<template>
<div>

    <div class="card" :style="{
        width:width,
        height:height,
        minWidth:minWidth, }">
        <slot></slot>
    </div>

</div>
</template>

<script>
export default {
    name: "JhCard",
    props: ['width', 'height', 'minWidth'],
}
</script>

<style scoped>
.card {
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    background-color: rgb(245, 245, 247);
    border-radius: 16px;
    box-sizing: border-box;
    height: 100%;
    padding: 24px;
}
</style>