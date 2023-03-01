<template>
    <div class="realIndex">
        <div style="flex: 1;height: 100%;display: flex;justify-content: center;align-items: center">
            <img src="/src/assets/index.png" alt="">
        </div>
        <div style="width: 40%;height: 100%;display: flex;justify-content: center;align-items: center">
            <div style="height: fit-content;width: 400px;">
                <div class="other">问卷调查</div>
                <div class="other">选择Huillo</div>
                <div class="create" @click="navTo('/survey')">立即创建</div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {navTo} from "../../api/util";
</script>

<style scoped>
.realIndex {
    width: 100%;
    height: calc(100vh - 45px);
    display: flex;
}

.create {
    margin-top: 32px;
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    user-select: none;
    font-family: deyihei, sans-serif;
}

.create:hover {
    transition-duration: .5s;
    color: #13ce66;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 8px;
}

.other {
    user-select: none;
    font-size: 24px;
    margin-top: 4px;
    font-family: siyuan, sans-serif;
    font-weight: 600;
}

img {
    width: 80%;
    user-select: none;
}

</style>