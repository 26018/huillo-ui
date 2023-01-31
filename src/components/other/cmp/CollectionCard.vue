<template>

    <el-card shadow="always" style="border-radius: 8px" class="collection-card">
        <template #header>
            <el-row style="display: flex;align-items: baseline;justify-content: space-around">
                <el-col :span="16" style="font-size: 24px;font-weight: 600;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
                    在线文件收集
                </el-col>
                <el-col :span="8" style="text-align: right;font-weight: 500;font-size: 14px">已结束</el-col>
            </el-row>
        </template>

        <el-row>
            <el-col :span="12">作者:Lsk</el-col>
            <el-col style="text-align: right" :span="12">提交数:12</el-col>
        </el-row>
        <div style="padding: 2px"></div>

        <el-row>
            <el-col :span="12">2022/02/03</el-col>
            <el-col style="text-align: right" :span="12">2022/12/21</el-col>
        </el-row>

        <div style="padding: 2px"></div>
        <div style="padding: 2px"></div>

        <div style="display: flex">
            <div style="cursor: pointer;margin-right: 16px;color: slateblue;font-size: 14px"
                 @click="navTo('/manager/collections/detail/1')">详情
            </div>
            <div style="cursor: pointer;margin-right: 16px;color: green;font-size: 14px">分享收集</div>
            <div style="cursor: pointer;color: red;font-size: 14px">删除收集</div>
        </div>

    </el-card>

</template>

<script setup>
import {navTo} from "../../../api/util";

defineProps(['data'])

</script>

<style scoped>


.collection-card {
    width: 260px;
}

.el-col {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

</style>