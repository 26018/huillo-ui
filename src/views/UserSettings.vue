<template>
    <div style="padding: 16px;box-sizing: border-box;">
        <div class="title">账号状态</div>
        <div class="content flex">
            <el-button type="success">正常</el-button>
            <el-button style="margin-left: auto" type="danger">退出</el-button>
        </div>
        <div class="title">修改密码</div>
        <div class="content flex">
            <div>
                <el-input placeholder="旧密码" v-model="newPassword" show-password type="password"/>
                <el-input placeholder="新密码" v-model="oldPassword" show-password type="password" style="margin-top: 8px"/>
                <el-button type="primary" @click="user_ChangePassword(newPassword,oldPassword)" style="margin-top: 8px">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from "vue";
import {user_ChangePassword} from "../api/user";

let newPassword = ref("");
let oldPassword = ref("");


</script>

<style scoped>

.title {
    font-size: 24px;
    font-family: siyuan, serif;
}

.content {
    margin-top: 8px;
    margin-bottom: 16px;
    max-width: 300px;
}

.flex {
    display: flex;
}

</style>