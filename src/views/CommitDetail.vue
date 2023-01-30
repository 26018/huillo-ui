<template>

    <!--查看提交的问卷详情-->

<div>
    <div style="display: flex;align-items: center;border: 0px solid red">
        <el-icon style="cursor: pointer" :size="24" @click="navTo(-1)">
            <ArrowLeft/>
        </el-icon>
        <div style="font-size: 24px;margin-left: 8px">提交详情</div>
    </div>
</div>


</template>

<script setup>
import {navTo} from "../api/util";

</script>

<style scoped>

</style>