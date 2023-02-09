<template>
    <div class="index">
        <h3>问卷调查</h3>
        <h3>就用Huillo</h3>
        <div class="create" @click="$router.push('/create')" style="cursor: pointer">立即创建</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.index {
    max-width: 600px;
    margin: 0 auto;
    color: gray;
}

.create {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    text-decoration: underline;
}

.create:hover {
    transition-duration: 1s;
    color: black;
}
</style>